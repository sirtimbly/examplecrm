import { $, $$ } from "../../styles/base-styles";

import { IRegisteredField } from "frets/build/main/Frets";
import { VNodeProperties } from "frets";

export const stackedLabel = $$("label").my_1.flex.flexCol;

export const $input = (cfg: {
    label: string,
    field: IRegisteredField<string>,
    type?: string,
    triggerUpdateOn?: "change" | "blur"
  }) => {
    const props: VNodeProperties = {
      onchange: cfg.field.handler
    };
    if (cfg.triggerUpdateOn === "blur") {
      props.onblur = cfg.field.handler;
    }
    return stackedLabel.h(
      cfg.label,
      $.input.border.borderBlue_200.p_1.h(Object.assign({
        type: cfg.type || "text",
        value: cfg.field.value,
      }, props)),
      $.span.fontBold.textRed_600.p_1.h(cfg.field.validationErrors)
    );
};
