import { setup, VNode } from "frets";
import {
  Stitch,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import AuthProps from "./models/AuthProps";
import { renderLogin } from "./Login";
import { renderUserMenu } from "./UserMenu";
import DataService from "./db";
import { $ } from "../styles/base-styles";

export const client = Stitch.initializeDefaultAppClient(process.env.CLIENT_ID || "example_crm-nzdxc");
export const db: DataService = new DataService(client);
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
