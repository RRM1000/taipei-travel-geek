import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";

const projectRoot = process.cwd();
const dumpPath = path.resolve(projectRoot, "..", "mwp_db", "bitnami_wordpress.sql");
const outputDirectory = path.join(projectRoot, "content");
const posts = [];
const terms = new Map();
const taxonomies = new Map();
const relationships = [];
const featuredImageIds = new Map();
const attachments = new Map();

function decodeMysql(value) {
  if (value === "NULL") return null;
  if (!value.startsWith("'")) return value;

  const raw = value.slice(1, -1);
  const replacements = { "0": "\0", b: "\b", n: "\n", r: "\r", t: "\t", Z: "\x1a" };
  let decoded = "";

  for (let index = 0; index < raw.length; index += 1) {
    if (raw[index] !== "\\" || index === raw.length - 1) {
      decoded += raw[index];
      continue;
    }

    index += 1;
    decoded += replacements[raw[index]] ?? raw[index];
  }

  return decoded;
}

function splitSqlValues(statement) {
  const valuesStart = statement.indexOf("VALUES (");
  if (valuesStart === -1) return [];

  const tuple = statement.slice(valuesStart + 8, -2);
  const values = [];
  let current = "";
  let quoted = false;

  for (let index = 0; index < tuple.length; index += 1) {
    const character = tuple[index];
    const nextCharacter = tuple[index + 1];

    if (character === "\\" && quoted && nextCharacter !== undefined) {
      current += character + nextCharacter;
      index += 1;
      continue;
    }

    if (character === "'") quoted = !quoted;

    if (character === "," && !quoted) {
      values.push(decodeMysql(current));
      current = "";
      continue;
    }

    current += character;
  }

  values.push(decodeMysql(current));
  return values;
}

function cleanContent(html) {
  const cleaned = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<!--\s*\/?wp:[\s\S]*?-->/g, "")
    .replace(/https?:\/\/(?:www\.)?taipeitravelgeek\.com\/wp-content\/uploads\//g, "/media/")
    .replace(/http:\/\/3\.81\.126\.37\/wp-content\/uploads\//g, "/media/")
    .replace(/https?:\/\/(?:www\.)?taipeitravelgeek\.com(?=\/)/g, "")
    .replace(/\/media\/2019\/08\/Peace-Park-2\.jpg/g, "/media/2019/12/228-Peace-Park-2.jpg");

  return cleaned
    .replace(
      /<div[^>]*>\s*<div[^>]*>\s*(?:&nbsp;)?\s*<(?:b|strong)>\s*(?:Jump To:?|Contents:?)\s*<\/(?:b|strong)>\s*<\/div>\s*<ul>([\s\S]*?)<\/ul>\s*<\/div>/gi,
      '<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul>$1</ul></nav></details>',
    )
    .replace(
      /<p[^>]*>\s*<(?:b|strong)>\s*(?:Jump To:?|Contents:?)\s*<\/(?:b|strong)>\s*<\/p>\s*<ul>([\s\S]*?)<\/ul>/gi,
      '<details class="article-toc-block"><summary>On this page</summary><nav aria-label="On this page"><ul>$1</ul></nav></details>',
    );
}

function localMediaUrl(url) {
  const match = url.match(/(?:wp-content\/uploads\/|\/uploads\/)(.+)$/i);
  return match ? `/media/${match[1]}` : null;
}

const source = fs.createReadStream(dumpPath, { encoding: "utf8" });
const lines = readline.createInterface({ input: source, crlfDelay: Infinity });

for await (const line of lines) {
  if (line.startsWith("INSERT INTO `wp_terms` VALUES")) {
    const [id, name, slug] = splitSqlValues(line);
    terms.set(Number(id), { name, slug });
    continue;
  }

  if (line.startsWith("INSERT INTO `wp_term_taxonomy` VALUES")) {
    const [id, termId, taxonomy] = splitSqlValues(line);
    taxonomies.set(Number(id), { termId: Number(termId), taxonomy });
    continue;
  }

  if (line.startsWith("INSERT INTO `wp_term_relationships` VALUES")) {
    const [postId, taxonomyId] = splitSqlValues(line);
    relationships.push({ postId: Number(postId), taxonomyId: Number(taxonomyId) });
    continue;
  }

  if (line.startsWith("INSERT INTO `wp_postmeta` VALUES")) {
    const [, postId, key, value] = splitSqlValues(line);
    if (key === "_thumbnail_id") featuredImageIds.set(Number(postId), Number(value));
    continue;
  }

  if (!line.startsWith("INSERT INTO `wp_posts` VALUES")) continue;

  const fields = splitSqlValues(line);
  const [id, authorId, date, , content, title, excerpt, status, , , , slug, , , modified, , , parentId, guid, , type] = fields;

  if (type === "attachment") {
    const imageUrl = localMediaUrl(guid);
    if (imageUrl) attachments.set(Number(id), imageUrl);
    continue;
  }

  if (status !== "publish" || !["post", "page"].includes(type) || !slug) continue;

  posts.push({
    id: Number(id),
    authorId: Number(authorId),
    date,
    modified,
    slug,
    title,
    excerpt,
    type,
    parentId: Number(parentId),
    content: cleanContent(content),
  });
}

const termsByPost = new Map();
for (const relationship of relationships) {
  const taxonomy = taxonomies.get(relationship.taxonomyId);
  const term = taxonomy && terms.get(taxonomy.termId);
  if (!taxonomy || !term || !["category", "post_tag"].includes(taxonomy.taxonomy)) continue;

  const assignedTerms = termsByPost.get(relationship.postId) ?? { categories: [], tags: [] };
  assignedTerms[taxonomy.taxonomy === "category" ? "categories" : "tags"].push(term);
  termsByPost.set(relationship.postId, assignedTerms);
}

for (const post of posts) {
  const assignedTerms = termsByPost.get(post.id) ?? { categories: [], tags: [] };
  post.categories = assignedTerms.categories;
  post.tags = assignedTerms.tags;
  post.featuredImage = post.content.match(/<img[^>]+src=["']([^"']+)/i)?.[1] ?? attachments.get(featuredImageIds.get(post.id)) ?? null;
}

posts.sort((first, second) => second.date.localeCompare(first.date));
fs.mkdirSync(outputDirectory, { recursive: true });
fs.writeFileSync(path.join(outputDirectory, "posts.json"), `${JSON.stringify(posts, null, 2)}\n`);

const categories = Array.from(termsByPost.values())
  .flatMap((assignedTerms) => assignedTerms.categories)
  .filter((term, index, allTerms) => allTerms.findIndex((item) => item.slug === term.slug) === index)
  .sort((first, second) => first.name.localeCompare(second.name));
fs.writeFileSync(path.join(outputDirectory, "categories.json"), `${JSON.stringify(categories, null, 2)}\n`);

const audit = {
  extractedAt: new Date().toISOString(),
  source: path.basename(dumpPath),
  posts: posts.filter((post) => post.type === "post").length,
  pages: posts.filter((post) => post.type === "page").length,
  categories: categories.length,
  newestPublication: posts[0]?.date ?? null,
  oldestPublication: posts.at(-1)?.date ?? null,
};
fs.writeFileSync(path.join(outputDirectory, "audit.json"), `${JSON.stringify(audit, null, 2)}\n`);
console.log(JSON.stringify(audit, null, 2));
