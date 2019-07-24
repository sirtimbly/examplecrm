import * as just from "just-animate";
import { $, $$ } from "../../styles/base-styles";
import { Icons } from "./Icons";

const animateAlertIn = (domNode: Element, properties: any) => {
  just.animate({
    targets: domNode,
    duration: 412,
    web: {
      opacity: [0, 1],
      x: [300, 0],
    },
  }).play();
};

export const alert = (messages: string[]) => {
  const baseNotification = $.div.textBase.block.p_2.fontBold.shadow.mb_1.flex;
  return $.div.Fixed.absAlertTopRight.flexCol.h(
    messages.map((s: string, index: number) => {
      return baseNotification.bgOrange_400.textWhite.h({
        key: s,
        enterAnimation: animateAlertIn,
      }, [
        Icons.bell(),
        $.div.h([s]),
      ]);
    }),
  );
};

export const success = (messages: string[]) => {
  const baseNotification = $.div.textBase.block.p_2.fontBold.shadow.flex;
  return baseNotification.bgGreen_400.textWhite.h([
    Icons.check(), ...messages.map((s: string) => $.div.h({key: s}, [s])),
  ]);
};
