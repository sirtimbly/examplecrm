export interface IContact {
  _id?: string;
  firstname?: string;
  lastname?: string;
  phone?: string;
  email?: string;
  role?: string;
  source?: string;
  likelyhood?: number;
  modified?: Date;
}
