import { IFretsProps } from "frets";
import { VNode, VNodeProperties } from "frets";
import { AppActions } from "../../actions/AppActions";
import { $, $$ } from "../../styles/base-styles";
import { IKeyObject, SampleScreens } from "../../navigation";
import { App } from "../../app";

export const MenuItem = (
  labelNodes: Array<string | VNode>,
  subNodes: Array<string | VNode>,
  isActive: boolean = false,
  clickFn: (e: Event) => void | boolean): VNode => {
    return $.div.my_1.h([
      $.button.btn.p_1.textSm.textGray_500.rounded.h({
        classes: $$().when(isActive).textBlue_500.fontBold.toObj(),
        onclick: clickFn,
      },
        labelNodes),
      (subNodes) ? $.div.pl_1.py_1.h([subNodes]) : "",
    ]);
};

export const Menu = (
  keys: IKeyObject,
  f: App,
  isHorizontal: boolean = false,
  ): VNode => {
    const nodes = [];
    Object.keys(keys).forEach((x: SampleScreens) => {
      nodes.push(
        MenuItem(
          [x],
          null,
          f.modelProps.activeScreen === x,
          f.registerAction("menu_" + x, (e: Event, present) => {
            present({activeScreen: x});
          })
        )
      );
    });
    return $$("nav").mb_1.mr_2.h(nodes);
};
