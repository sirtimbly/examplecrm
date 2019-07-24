import { VNode } from "frets";
import { App } from "../app";
import { $ } from "../styles/base-styles";
import { VPanel } from "./components/Panels";

export default function viewProject(app: App): VNode {
  return VPanel({ title: app.modelProps.currentProject.name },
    $.button.bgRed_600.textWhite.h("Delete Project Permanently")
  );
}
