
import { $, $$ } from "../styles/base-styles";
import AppProps, { IUser } from "./models/AppProps";
import { HPanel, VPanel } from "./components/Panels";
import { $input } from "./components/input";

import { IFunFrets } from "frets";
import AuthProps from "./models/AuthProps";


const client = window["stitchClient"] as StitchAppClient;
const credentials = window["stitchCredential"];

export const renderLogin = (f: IFunFrets<AuthProps>) => {
  const username = f.registerField("username", "");
  const password = f.registerField("password", "");
  const login = f.registerAction("login", (e: Event, present) => {
    e.preventDefault();
    console.log("login");
    const credential = credentials(username.value, password.value);

    client.auth.loginWithCredential(credential)
      .then((authedUser) => {
        console.log("user", authedUser);
        const user: IUser = {
          // tslint:disable-next-line:no-string-literal
          email: authedUser.profile["data"].email,
          id: authedUser.id,
        };
        window.localStorage.setItem("user", JSON.stringify(user));
        present({
          isLoading: false,
          isAuthenticated: true,
          user,
        });
      })
      .catch((err) => {
        present({
          isLoading: false,
          networkError: err.message,
        });
      });
    present({
      isLoading: true,
    });
  });

  return $.div.flex.justifyCenter.h(
    VPanel({ title: "Log In To Your Account"},
      $$("form").h({ onsubmit: login },
        $input({
          label: "Email Address",
          field: username,
          type: "email"
        }),
        $input({
          label: "Password",
          field: password,
          type: "password"
        }),
        $.button.btn.bgBlue_500.my_1.h({ onclick: login },
          "Log In"
        ),
      ),
      $.a.block.p_2.textRight.h({
          href: "register",
          target: "_blank",
        },
        "Register"
      )
    )
  );
};
