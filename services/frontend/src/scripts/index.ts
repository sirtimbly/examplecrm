
import { setup, IFunFrets } from "frets";

import addHours from "date-fns/esm/addHours";
import format from "date-fns/esm/format";

import AppProps from "./models/AppProps";
import { applyRoutesToAppInstance, SampleScreens, RouteKeys } from "./navigation";
import { renderRootView } from "./Root";

import {
  Stitch,
  UserPasswordCredential,
} from "mongodb-stitch-browser-sdk";

import { IUser } from "./models/AppProps";

import DataService from "./db";
import { nameField } from "./NewProject";

export const client = Stitch.initializeDefaultAppClient(process.env.CLIENT_ID || "designsystems-trzqk");
export const db: DataService = new DataService(client);

const startingCondition: AppProps = new AppProps();
startingCondition.user = JSON.parse(window.localStorage.getItem("user")) || undefined;


export type App = IFunFrets<AppProps>;

setup<AppProps>(startingCondition, (f) => {
  f.registerAcceptor((proposal, state) => {

    Object.assign(f.modelProps, proposal);

    const messages: string[] = [];
    const onSamePage: boolean = (proposal.activeScreen === f.modelProps.activeScreen);
    // Other error messages that don't invalidate the update
    if (proposal.networkError) {
      messages.push(proposal.networkError);
      f.modelProps.networkError = null;
    }

    // clear the alerts if we navigated to a new page
    f.modelProps.messages = onSamePage ? messages : [];

    let activeScreen = proposal.activeScreen;
    if (!f.modelProps.isAuthenticated && activeScreen !== RouteKeys.Login) {
      activeScreen = RouteKeys.Login as SampleScreens;
    }

    if (proposal.showProjectCreateForm) {
      activeScreen = "NewProject";
    }

    f.modelProps.activeScreen = activeScreen || f.modelProps.activeScreen;

    if (proposal.createProjectWithTemplateName) {
      db.createProject(f.modelProps.registeredFieldsValues[nameField], proposal.createProjectWithTemplateName)
        .then((result) => {
          console.log("Created Project");
          f.modelProps.insertedId = result.insertedId;
          f.modelProps.isLoading = false;
          f.modelProps.showProjectCreateForm = false;
          f.modelProps.registeredFieldsValues = Object.assign(
            f.modelProps.registeredFieldsValues,
            { [nameField]: "" }
          );
          if (result.insertedId) {
            console.log("load and then navigate to ", result)
            db.listProjects().then((projects) => {
              f.modelProps.projectList = projects;
              console.log("nav to route ViewProject")
              f.navToRoute("ViewProject", { id: result.insertedId.toString() });
            });
          }
        });
    }

  });
  applyRoutesToAppInstance(f);
  f.registerView(renderRootView);
}).mountTo("mainapp");
