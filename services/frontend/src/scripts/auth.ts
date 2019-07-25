import { setup, VNode } from "frets";


import AuthProps from "./models/AuthProps";
import { renderLogin } from "./Login";
import { $ } from "../styles/base-styles";


const starting = new AuthProps();
starting.user = JSON.parse(window.localStorage.getItem("user")) || undefined;

setup<AuthProps>(starting, (f) => {
  f.registerAcceptor((proposal, state) => {
    // TODO
  });
  f.registerView((app): VNode => {
    if (!f.modelProps.isAuthenticated) {
      return renderLogin(app);
    } else {
      return $.div.h(
        "OK, logged in as ",
        app.modelProps.username,
        $.a.textBlue_700.p_2.h({ href: "/contacts.html" }, "Go To Contacts Page")
      );

    }
  });
}).mountTo("authentication");
