import React from "react";
import Header from "../header/header.component";

type LayoutProps = {
  children: any;
}; /* use `interface` if exporting so that consumers can extend */

// Easiest way to declare a Function Component; return type is inferred.
const Layout = ({ children }: LayoutProps) => (
  <>
    <Header />
    <section className="hero is-info is-fullheight-with-navbar">
      {children}
    </section>
  </>
);

export default Layout;
