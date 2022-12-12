import React from "react";

type HeaderProps = {
  title?: string;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
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
