const wiseReferralUrl = "https://wise.com/invite/ecac/robertrichardm17";

export function WiseAffiliate() {
  return (
    <section className="sidebar-section sidebar-wise" aria-label="Wise money transfer offer">
      <p className="sidebar-kicker">Money tip</p>
      <div className="sidebar-wise-card">
        <p>
          Skip the bad exchange rates. <strong>Wise</strong> gives you a real mid-market rate and a
          debit card that works at Taiwan ATMs and shops.
        </p>
        <a href={wiseReferralUrl} target="_blank" rel="sponsored noopener noreferrer">
          Get started with Wise <span aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
