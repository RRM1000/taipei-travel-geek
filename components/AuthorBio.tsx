import React from "react";

export function AuthorBio() {
  return (
    <div className="author-bio-card">
      <div className="author-avatar">
        <img src="/images/ttg-mark.png" alt="Taipei Travel Geek Editor" />
      </div>
      <div className="author-info">
        <span className="author-kicker">Written by Taipei Travel Geek</span>
        <h4 className="author-name">Independent Taipei Experts</h4>
        <p className="author-desc">
          Field-tested travel advice, neighborhood breakdowns, and local food recommendations updated regularly for curious travelers visiting Taiwan.
        </p>
      </div>
    </div>
  );
}
