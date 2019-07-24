import { $, $$ } from "../styles/base-styles";

import { VNode } from "maquette";

import { App } from "./";
import AppProps from "./models/AppProps";
import { RouteKeys, IRouteKeys } from "./navigation";
import { renderAbout } from "./About";
import { Menu } from "./components/Menu";
import { alert } from "./components/Notifications";
import { $grid } from "./components/UiAtoms";

import { Icons } from "./components/Icons";
import { renderHome } from "./Home";
import { renderLogin } from "./Login";
import { createProjectPanel } from "./NewProject";
import { renderReleases } from "./Releases";
import { renderTests } from "./Tests";

const mainViews = {
  [RouteKeys.Home]: renderHome,
  [RouteKeys.About]: renderAbout,
  [RouteKeys.Login]: renderLogin,
  [RouteKeys.NewProject]: createProjectPanel,
  [RouteKeys.Releases]: renderReleases,
  // [RouteKeys.Tests]: renderTests,
  default: renderLogin,
};

export const renderRootView = (f: App ): VNode => {
  console.log("root view", f.modelProps)
  console.log("getRouteLink", f.getRouteLink(f.modelProps.activeScreen))
  let component: (app: App) => VNode;
  if (!f.modelProps.isAuthenticated || f.getRouteLink(f.modelProps.activeScreen) === RouteKeys.Login) {
    component = renderLogin;
  } else {
    component = mainViews[f.getRouteLink(f.modelProps.activeScreen) || "default"] || mainViews.default;
  }
  return $.div.flex.flexCol.h(
    $.div.bgGray_200.p_2.borderB.borderGray_300.shadow.flex.justifyBetween.fontBold.h(
      $.div.h(["DesignSystems.cloud"]),
      $.div.textSm.p_1.h(
        f.modelProps.isAuthenticated ? Icons.user() : Icons.minus(),
        f.modelProps.user ? f.modelProps.user.email : "Not Logged In",
      ),
    ),
    alert(f.modelProps.messages),
    $grid.h(
      $.div.pt_2.h(
          Menu({
              Home: RouteKeys.Home,
              Releases: RouteKeys.Releases,
              Tests: RouteKeys.Tests,
            }, f, false)
      ),
      $.div.flexGrow.px_2.h(
        component(f)
      )
    )
  );
};
