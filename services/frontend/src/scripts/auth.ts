import { setup, VNode } from "frets";
import AuthProps from "./models/AuthProps";
import { renderLogin } from "./Login";
import { renderUserMenu } from "./UserMenu";

setup<AuthProps>(new AuthProps(), (f) => {
  f.registerAcceptor((proposal, state) => {
    // TODO
  });
  f.registerView((app): VNode => {
    if (!f.modelProps.isAuthenticated) {
      return renderLogin(app);
    } else {
      return renderUserMenu(app);
    }
  });
}).mountTo("authentication");
