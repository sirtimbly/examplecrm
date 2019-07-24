import { VNode, VNodeProperties } from "frets";
import * as just from "just-animate";
import { $, $$ } from "../../styles/base-styles";

const animateTableRow = (domNode: Element, properties: any) => {
  just.animate({
    targets: domNode,
    duration: 512,
    props: {
      style: ["transform-origin: 0 0 0", "transform-origin: 0 0 0"]
    },
    web: {
      opacity: [0, 1],
      scaleY: [0, 1],
    },
  }).play();
};

export interface IColumn {
  prop: string;
  label?: string;
}

/**
 * Table
 * @param nodes
 */
export const Table = (columns: IColumn[], data: any[] ): VNode => {
  const row = $$("tr");
  const cell = $$("td").borderB.borderR.borderGray_200.bgGray600.p_1;
  const header = $$("th").borderB.borderGray_600;
  if (!data || data.length <= 0) {
    return $$("table").collapse.h();
  }
  return $$("table").fullWidth.collapse.h([
    row.h(columns.map((c) => header.h([c.label]))),
    ...data.map((d) => row.h({
      enterAnimation: animateTableRow,
      key: d["id"]
    }, [
      ...columns.map((c) => {
        // debugger;
        return cell.h([ `${d[c.prop]}` ]);
      }),
    ])),
  ]);
};
