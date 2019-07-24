import { IRegisteredField } from "frets/build/main/Frets";
import { $, $$ } from "../styles/base-styles";

import { Icons } from "./components/Icons";
import { HPanel, Panel, VPanel } from "./components/Panels";
import { Table } from "./components/Tables";

import { App } from "../app";

type animationFn = (domNode: Element, properties: any) => void;

export const renderReleases = (app: App) => {
  const idField: IRegisteredField<string> = app.registerField("id", "1");
  return VPanel({title: "All Recent Releases"},
    HPanel({title: "Async Fetching", key: "fakeData"},
      $.label.m_1.h(
        "Placeholder API User Id",
        $.a.btn.littleCircle.h({
          href:  "https://jsonplaceholder.typicode.com/",
          title: "https://jsonplaceholder.typicode.com/users/",
        }, ["?"]),
        $.input.w_1.h({
          onblur: idField.handler,
          onchange: idField.handler,
          onkeyup: (e: KeyboardEvent) => {
            if (e.key === "Enter") {
              (e.target as HTMLInputElement).parentElement.nextElementSibling.dispatchEvent(new Event("click"));
            }
          },
          type: "text",
          value: idField.value,
        }),
      ),
      $.button.btn.rounded.p_1.m_1.h({
        classes: $$().when(app.modelProps.isLoading).bgGray_500.textWhite.toObj(),
        disabled: app.modelProps.isLoading,
      },
      [
        app.modelProps.isLoading ? Icons.refresh() : Icons.ok(),
          "Fetch API Data",
      ]),
    ),
    VPanel({ title: "Data Results"},
      $.div.rounded.p_1.m_1.h({ class: !!app.modelProps.user ? "green" : "gray" },
        "API Response",
        app.modelProps.user ? Icons.ok() : " - Not Loaded"
      )
      // props.user ?
      // Table([
      //   { label: "Name", prop: "name"},
      //   { label: "Username", prop: "username"},
      //   { label: "E-Mail", prop: "email"},
      //   { label: "Id", prop: "id"},
      //   { label: "Phone", prop: "phone"},
      //   { label: "Website", prop: "website"},
      // ], props.users) : "",
    ),
  );
};
