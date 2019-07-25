
import {
  RemoteMongoClient,
  StitchAppClient,
  RemoteInsertOneResult,
  RemoteMongoDatabase,
  RemoteMongoCollection,
} from "mongodb-stitch-browser-sdk";
import IProject from "./models/IProject";
import { IVisualTest } from "./models/AppProps";

const projectKey: string = "projects";
const testKey: string = "visualTests";

export default class DataService {
  private db: RemoteMongoDatabase;
  private projects: RemoteMongoCollection<IProject>;
  private tests: RemoteMongoCollection<IVisualTest>;
  constructor(private client: StitchAppClient) {
    this.db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("crm");
    this.projects = this.db.collection<IProject>(projectKey);
    this.tests = this.db.collection<IVisualTest>(testKey);
  }

  public listProjects = (limit: number = 100) => this.projects
    .find({owner_id: this.client.auth.user.id}, { limit }).asArray()

  public createProject = (name: string, template: string) => this.projects.insertOne({
    owner_id: this.client.auth.user.id,
    template,
    name,
  })

  public deleteProject = (project: IProject) => this.projects.deleteOne({
    id: {$eq: project._id },
  })

  public listTests = (ownerId: string) => this.tests.find({
    owner_id: ownerId,
  }).asArray()

}
