export function SiteFooter() {
  return (
    <footer>
      <div className="wrap footer-grid">
        <div className="footer-intro"><a className="brand footer-brand" href="/"><img src="/images/ttg-mark.png" alt="" /><span><b>Taipei</b> Travel Geek</span></a><p>Independent travel guides for a more curious visit to Taipei.</p></div>
        <div className="footer-links"><p>Explore</p><a href="/category/eat">Eat</a><a href="/category/visit">Visit</a><a href="/category/areas">Areas</a><a href="/category/culture">Culture</a></div>
        <div className="footer-links"><p>Plan</p><a href="/taipei-guide">Guide to Taipei</a><a href="/taipei-public-transport">Getting around</a><a href="/taiwan-easycard">EasyCard</a><a href="/maps">Map</a></div>
        <div className="footer-bottom"><span>© Taipei Travel Geek</span><span><a href="/author">About</a><a href="/privacy-policy">Privacy</a></span></div>
      </div>
    </footer>
  );
}
