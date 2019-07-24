import { App, db } from "./app";
import { $, $$ } from "../styles/base-styles";
import AppProps from "./models/AppProps";
import { HPanel, VPanel } from "./components/Panels";
import DataService from "./db";
import { Icons } from "./components/Icons";
import { VNode } from "frets";
import { ITemplateItem } from "./models/AppProps";
import { $input } from "./components/input";
import { RouteKeys } from "../navigation";

export const nameField = "newProjectName";

export const createProjectPanel = (app: App) => {

  const createProjectAction = app.registerAction("createProject", (e: Event, present) => {
    e.preventDefault();
    if (!app.modelProps.registeredFieldsValues[nameField]) {
      return;
    }
    const template = app.modelProps.projectTemplateList.find((x) => x.selected);
    present({
      isLoading: true,
      createProjectWithTemplateName: template.name
    });
  });

  const getTemplateSelectAction = (item: ITemplateItem) => {
    return app.registerAction(item.name + "_template", (e: Event, present) => {
      console.log("render update directly");
      present({
        projectTemplateList: app.modelProps.projectTemplateList.map((t) => {
          return {
            ...t,
            selected: !!(t.name === item.name),
          };
        }),
      });
    });
  };

  const showCreateProjectAction = app.registerAction("showCreateProject", (e: Event, present) => {
    console.log("toggle form", app.modelProps);
    present({
      showProjectCreateForm: !app.modelProps.showProjectCreateForm,
    });
  });

  const bigBoxButton = (item: ITemplateItem): VNode => {
    return $.button.btn.mr_2.ml_0.w_40.p_2.border.borderGray_400.rounded.flex.flexCol.textCenter.itemsCenter.h({
      title: item.description,
      classes: $$().when(item.selected).borderBlue_400.bgWhite.lightBlue.toObj(),
      onclick: getTemplateSelectAction(item),
    },
    [
      $.img.m_2.pb_1.h({src: item.icon, width: "48"}),
      $.span.fontBold.h([item.name]),
    ]);
  };

  let rendered = $.div.mt_2.h([
    $.button.h({
      onclick: showCreateProjectAction,
    }, [Icons.plus(), "Create New Project"]),
  ]);

  if (app.modelProps.showProjectCreateForm) {
    const projectNameField = app.registerField(nameField, "");
    const isValid = (app.modelProps.projectTemplateList.filter((x) => x.selected).length
                      && projectNameField.value.length);
    rendered = $$("form").h({ onsubmit: createProjectAction}, [
        VPanel({ title: "New Project" },
          $input({
            label: "Name Your Project",
            field: projectNameField
          }),
          HPanel({ title: "Choose A Template"},
            ...app.modelProps.projectTemplateList.map(bigBoxButton)
          ),
          app.modelProps.isLoading
            ? HPanel({}, "Loading", Icons.refresh())
            : HPanel({ transparent: true },
              $.button.btn.btnBorder.border.h({ onclick: showCreateProjectAction}, ["Cancel"]),
              $.button.btn.btnBlue.border.h({
                disabled: !isValid,
              }, ["Next"]),
            ),
        )]);
    }
  return rendered;
};
