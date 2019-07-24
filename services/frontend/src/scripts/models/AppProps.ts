import { IFretsProps, PropsWithFields } from "frets";

import { RouteKeys, IRouteKeys, SampleScreens } from "../navigation";

import { StitchUser, StitchUserProfile } from "mongodb-stitch-browser-sdk";
import IProject from "./IProject";

export interface IUser {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phone?: string;
  website?: string;
  address?: any;
  company?: any;
}

export interface ITemplateItem {
  name: string;
  description: string;
  icon: string;
  selected: boolean;
}

export interface IVisualTest {
  _id: any;
  owner_id: string;
  devices: any[];
  sites: any[];
  ready: boolean;
  running: boolean;
  finished: boolean;
  createdDate: Date;
  results: any[];

}

export default class AppProps extends PropsWithFields {
  public screens: SampleScreens[];
  public messages: string[] = [];
  public isLoading: boolean = false;
  public networkError: string;
  public user: IUser;

  public showProjectCreateForm: boolean = false;
  public showTestCreateForm: boolean = false;
  public createProjectWithTemplateName?: string;

  public insertedId?: string;
  public selectedId?: string;
  public projectList: IProject[] = [];
  public currentProject: IProject;
  public projectTemplateList: ITemplateItem[] = [
    {
      name: "Fractal and Foundation SCSS",
      description: "",
      icon: "/images/design-tool-pen-station.svg",
      selected: false,
    },
    {
      name: "Fractal and ITCSS (InuitCSS)",
      description: "",
      icon: "/images/analytics-graph-bar.svg",
      selected: false,
    },
  ];

  public visualTests: IVisualTest[];

  constructor(public activeScreen: SampleScreens = "Home") {
    super();
    const localUser = JSON.parse(window.localStorage.getItem("user"));
    if (localUser) {
      this.user = localUser;
    }
  }
  public get isAuthenticated(): boolean {
    return !!(this.user);
  }

  public get username(): string {
    return this.user ? this.user.email : "...";
  }

}
