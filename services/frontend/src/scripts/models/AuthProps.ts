import { IFretsProps, PropsWithFields } from "frets";

import IProject from "./IProject";
import { IUser } from "./AppProps";

export default class AuthProps extends PropsWithFields {
  public messages: string[] = [];
  public isLoading: boolean = false;
  public networkError: string;
  public user: IUser;

  constructor() {
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
