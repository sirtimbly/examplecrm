import { $, $$ } from "../styles/base-styles";

import { Icons } from "./components/Icons";
import { HPanel, Panel, VPanel } from "./components/Panels";
import { Table } from "./components/Tables";

import produce from "immer";

import { App, db } from ".";
import AppProps from "./models/AppProps";
import IProject from "./models/IProject";
import { createProjectPanel } from "./NewProject";

type animationFn = (domNode: Element, properties: any) => void;

export const renderHome = (app: App) => {

  const loadProjects = app.registerAction("loadProjects", (e: Event, present) => {
    console.log("loading projects")
    db.listProjects()
      .then((results) => {
        present(produce(app.modelProps, (d) => {
          d.isLoading = false;
          d.projectList = results.map((x) => ({
            _id: x._id.toString(),
            name: x.name,
            owner_id: x.owner_id,
          }));
        }));
      });

    present({isLoading: true});
  });

  const loadTests = app.registerAction("loadTests", (e: Event, present) => {
    console.log("loading tests");
    db.listTests(app.modelProps.user.id)
      .then((results) => {
        present({
          isLoading: false,
          visualTests: results,
        });
      });

    present({
      isLoading: true,
    });
  });

  if (app.modelProps.projectList && app.modelProps.visualTests && !app.modelProps.isLoading) {
    loadProjects(new Event("load"));
    loadTests(new Event("load"));
  }

  const openProject = (project: IProject) =>
    app.registerAction("project_" + project._id, (event: Event, present) => present({
      currentProject: project
    }));

  return $.div.mt_2.h(
    $.div.flex.justifyBetween.alignBottom.h(
      $$("h2").h("Project Dashboard"),
      createProjectPanel(app)
    ),
    VPanel({},
      $.div.h(
        $.div.textLg.h(
          `Your Projects (${app.modelProps.projectList.length})`),
          ...app.modelProps.projectList.map(
            (p) => HPanel({onclick: openProject(p), key: p._id },
              p.name
            ),
          ),
      )
    ),
  );
};
