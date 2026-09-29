// Checks each link find string matches exactly once (in the expected post), then applies all to a test copy.
const fs=require('fs');const [file,out]=process.argv.slice(2);const p=JSON.parse(fs.readFileSync(file,'utf8'));
const R=[
 ["best-areas-and-hotels-to-stay","Worth comparing against a week in a boutique hotel; it usually wins.",
  "Worth comparing against a week in a boutique hotel; it usually wins. For more options, from budget studios by Taipei Main Station to monthly apartments, see our guide to <a href=\"/aparthotels-serviced-apartments-taipei\">aparthotels and serviced apartments in Taipei</a>."],
 ["best-areas-and-hotels-to-stay","A kitchen and a washing machine change how a long trip feels, and the per-night rate usually drops on weekly bookings.</p>",
  "A kitchen and a washing machine change how a long trip feels, and the per-night rate usually drops on weekly bookings. For a month or more, a monthly serviced apartment works out cheaper still; our <a href=\"/aparthotels-serviced-apartments-taipei\">serviced apartments guide</a> compares both kinds.</p>"],
 ["best-places-to-keep-kids-amused","help them inadvertently learn about science and the world around them.</p>",
  "help them inadvertently learn about science and the world around them. Staying a week or more as a family? Our <a href=\"/aparthotels-serviced-apartments-taipei\">guide to serviced apartments in Taipei</a> lists places with a kitchen and room to spread out.</p>"],
];
let ok=true;
for(const [slug,f,r] of R){const hits=[];for(const x of p){const c=x.content.split(f).length-1;if(c)hits.push(x.slug+':'+c);}
 const good=hits.length===1&&hits[0]===slug+':1';ok=ok&&good;console.log(good?'OK ':'BAD',hits.join(','),'|',f.slice(0,60));
 if(good){const x=p.find(y=>y.slug===slug);x.content=x.content.replace(f,()=>r);}}
if(out){fs.writeFileSync(out,JSON.stringify(p,null,2));console.log('applied to',out);}
process.exit(ok?0:1);
