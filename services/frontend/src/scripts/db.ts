
import {
  RemoteMongoClient,
  StitchAppClient,
  RemoteMongoDatabase,
  RemoteMongoCollection,
} from "mongodb-stitch-browser-sdk";

import { IVisualTest } from "./models/AppProps";
import { IContact } from "./models/IContact";

const contactsKey: string = "contacts";

export default class DataService {
  private db: RemoteMongoDatabase;
  private contacts: RemoteMongoCollection<IContact>;
  constructor(private client: StitchAppClient) {
    this.db = client.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas").db("crm");
    this.contacts = this.db.collection<IContact>(contactsKey);
  }

  public listContacts = (limit: number = 100) => this.contacts
    .find({}, { limit }).asArray()

  public createContact = (contact: IContact) => this.contacts.insertOne({
    ...contact
  })

  public deleteContact = (contact: IContact) => this.contacts.deleteOne({
    id: {$eq: contact._id },
  })

}
