import { AppActions } from "../actions/AppActions";
import { App } from "../app";
import { $$ } from "../styles/base-styles";
import AppProps from "./models/AppProps";
import { VPanel } from "./components/Panels";

export const renderAbout = (f: App) => VPanel({ title: "About FRETS" },
  $$("p").textGray_300.borderT.pt_2.h([`See the documentation online at`]),
  $$("a").h({
    href: "https://github.com/sirtimbly/frets",
    target: "_blank",
  }, ["github.com/sirtimbly/frets"]),
);
