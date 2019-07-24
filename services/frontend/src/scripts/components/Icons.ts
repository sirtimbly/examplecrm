import { VNode } from "frets";
import { $$ } from "../../styles/base-styles";

export const icon = (name: string): VNode => {
  return $$("span." + name).h([""]);
};

export const Icons = {
  bell: (): VNode => icon("icon-bell"),
  check: (): VNode => icon("icon-ok"),
  minus: (): VNode => icon("icon-minus"),
  ok: (): VNode => icon("icon-ok"),
  plus: (): VNode => icon("icon-plus"),
  refresh: (): VNode => icon("icon-arrows-cw"),
  thumbsUp: (): VNode => icon("icon-thumbs-up"),
  user: (): VNode => icon("icon-user"),
};
