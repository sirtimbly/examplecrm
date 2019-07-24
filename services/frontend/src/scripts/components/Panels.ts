
import { VNode, VNodeProperties } from "frets";
import { createEnterCssTransition } from "maquette-css-transitions";
import { $, $$ } from "../../styles/base-styles";

/**
 * Panel
 * @param nodes
 */
export const Panel = (isHoriz: boolean,
                      properties: VNodeProperties,
                      ...nodes: Array<string | VNode>): VNode => {
  let node = $.div.panel.p_1.textLeft.overflowAuto.my_2;
  if (!properties.transparent) {
    node = node.shadow.rounded;
  }
  const titleNode = $.div.textLg.m_1.pb_2.h([properties.title || ""]);

  properties = properties || {};
  properties = Object.assign(properties, {
    key: properties.key || properties.title + nodes.length + 1,
    enterAnimation: createEnterCssTransition("fade-in"),
  });

  if (isHoriz) {
    if (properties.title && properties.title.length) {
      return node.h([$.div.textLeft.h(properties, [
        titleNode,
        $.div.flex.justifyCenter.h(nodes),
      ])]);
    } else {
      node = node.flex.alignMiddle.justifyCenter;
    }
  } else {
    node = node.flex.flexCol;
  }
  if (properties.title) {
    nodes = [titleNode, ...nodes];
  }

  // debugger;
  return node.h(properties, nodes);
};

export const VPanel = (properties: VNodeProperties, ...nodes: Array<string | VNode>): VNode => {
  return Panel(false, properties, ...nodes);
};

/**
 * Horizontal Flex Layout Panel
 * @param nodes;
 */
export const HPanel = (properties: VNodeProperties, ...nodes: Array<string | VNode>): VNode => {
  return Panel(true, properties, ...nodes);
};
