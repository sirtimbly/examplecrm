import {
  Stitch,
} from "mongodb-stitch-browser-sdk";
import { UserPasswordCredential } from "mongodb-stitch-core-sdk";
import DataService from "./db";

const stitchClient = Stitch.initializeDefaultAppClient(process.env.CLIENT_ID || "example_crm-nzdxc");
const stitchDb: DataService = new DataService(stitchClient);

window["stitchClient"] = stitchClient;
window["stitchDb"] = stitchDb;
window["stitchCredential"] = (username: string, password: string) => {
  return new UserPasswordCredential(username, password);
}
