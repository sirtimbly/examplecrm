import { $, $$ } from "../styles/base-styles";

import { Icons } from "./components/Icons";
import { HPanel, Panel, VPanel } from "./components/Panels";
import { Table } from "./components/Tables";

import IProject from "./models/IProject";
import { createProjectPanel } from "./NewProject";
import { $input, stackedLabel } from "./components/input";

import { setup, IFunFrets, PropsWithFields } from "frets";

class TestsView extends PropsWithFields {
  public currentProject?: IProject;
  public projectList?: IProject[] = [];
  public results?: any[];
  public showTestCreateForm: boolean;
  public wizardStep?: number;
  public visualTests?: any[];
}

const devices = [{
  id: "iphonex",
  name: "iPhone X",
}, {
  id: "ipad",
  name: "iPad 1024x768"
}];

export const renderTests = (app: IFunFrets<TestsView>) => {
  const showCreateForm = app.registerAction("createTest", (e, present) => {
    e.preventDefault();
    present({showTestCreateForm: true});
  });

  app.registerAcceptor((proposal, state) => {
    console.log(proposal)
    if (proposal.showTestCreateForm === true) {
      app.modelProps.showTestCreateForm = true;
      app.modelProps.wizardStep = 1;
    }
    if (proposal.showTestCreateForm === false) {
      app.modelProps.showTestCreateForm = false;
    }

    if (!isNaN(proposal.wizardStep)) {
      app.modelProps.wizardStep = proposal.wizardStep;
    }

    state(app.modelProps);
    console.log(app.modelProps);
  });

  const listPanel = $.div.h(
    (app.modelProps.visualTests && app.modelProps.visualTests.length)
      ? $.div.textLg.h(
        `Your Visual Tests (${app.modelProps.visualTests.length})`,
        ...app.modelProps.visualTests.map(
          (p) => HPanel({ key: p._id },
            p.finished ? `Finished` : `Waiting to Run`
          ),
        ),
      )
      : $.div.textGray_500.p_2.fontBold.h(
        `No Tests Yet.`,
        $.button.textBlue_500.h({ onclick: showCreateForm }, "Create One Now")
      )

  );

  const deviceField = app.registerField("newDevice", "");
  const widthField = app.registerField("newWidth", "");
  const heightField = app.registerField("newHeight", "");
  const projectField = app.registerField(
    "selectedProject",
    app.modelProps.currentProject ? this.currentProject._id : ""
  );
  const steps = {
    1: $.div.h(
        $.div.p_2.h(
          stackedLabel.h(
            "Select Project",
            $$("select").my_1.h(
              {onchange: projectField.handler},
              ...app.modelProps.projectList.map((proj) => $$("option").h({value: proj._id}, proj.name))
            )
          )
        ),
        $.div.p_2.mb_1.h(
          $input({
            label: "Test Url",
            field: app.registerField("newTestUrl", "http://"),
            type: "text"
          }),
        ),
      ),
    2: $.div.flex.flexCol.p_2.h(
        stackedLabel.h(
          "Select Device",
          $$("select").my_1.h(
            {onchange: deviceField.handler},
            ...devices.map((d) => $$("option").h({value: d.id}, d.name))
          )
        ),
        $input({
          label: "Width",
          field: widthField
        }),
        $input({
          label: "Height",
          field: heightField
        }),
      )
  };
  const testForm = $$("form").h(
    steps[app.modelProps.wizardStep],
    $.flex.justifyAround.p_1.h(
      $.button.btn.bgGray400.h(
        {
          onclick: app.registerAction(
            "newTestCancel",
            (e, p) => {
              e.preventDefault();
              p({showTestCreateForm: false});
            }
          )
        },
        "Cancel"
      ),
      $.button.btn.btnBlue.h({
        onclick: app.registerAction(
          "newTestContinue",
          (e, p) => {
            e.preventDefault();
            console.log("should press continue", app.modelProps.wizardStep)
            p({wizardStep: app.modelProps.wizardStep + 1});
          }
        )
      },
      "Continue"),
    )
  );

  return $.div.mt_2.h(
    VPanel({},
      app.modelProps.showTestCreateForm
        ? testForm
        : listPanel
    ),
  );

};

setup(new TestsView(), (f) => {
  f.registerView(renderTests);
}).mountTo("visualtests");
