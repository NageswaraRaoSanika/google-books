import React from "react";

type HeaderProps = {
  title?: string;
};

const Header = ({ title = "De Books" }: HeaderProps) => (
  <nav
    className="navbar is-info"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <h4 className="navbar-item title is-4">&#9752;&nbsp;{title}</h4>
    </div>
  </nav>
);

export default Header;
