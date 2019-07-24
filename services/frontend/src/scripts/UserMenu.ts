import { IFunFrets } from "frets";
import AuthProps from "./models/AuthProps";
import { $ } from "../styles/base-styles";
export function renderUserMenu(app: IFunFrets<AuthProps>) {
  return $.div.p_1.h(`Logged in as  ${app.modelProps.username}.`);
}
