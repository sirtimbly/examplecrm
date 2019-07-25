
import { App } from "./app";
import AppProps from "./models/AppProps";

export type SampleScreens = keyof IRouteKeys;

export type IKeyObject = {
  [key in SampleScreens]?: string;
};

export interface IRouteKeys {
  About: SampleScreens;
  Home: SampleScreens;
  Releases: SampleScreens;
  Tests: SampleScreens;
  Login: SampleScreens;
  NewProject: SampleScreens;
  ViewProject: SampleScreens;
}

export const RouteKeys: IKeyObject = {
  Home: "/projects",
  Releases: "/releases",
  Tests: "/tests",
  About: "/about",
  NewProject: "/projects/new",
  ViewProject: "/projects/:id",
};

export function applyRoutesToAppInstance(F: App): void {

  for (const key in RouteKeys) {
    if (RouteKeys.hasOwnProperty(key)) {
      F.registerRouteAction(key, RouteKeys[key], ({key: routeKey, path, data}, present) => {
        console.log("route navigation", routeKey, path, data);
        present({
         activeScreen: routeKey as SampleScreens,
         selectedId: data.id || "",
        });
      });
      // F.registerAction("route_" + key, (e: Event, present) => {
      //   console.log("nav ", key);
      //   F.navToRoute(key);
      //   present({activeScreen: key as SampleScreens});
      // });
    }
  }
}
