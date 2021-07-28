import lowdb from "lowdb";
import FileSync from "lowdb/adapters/FileSync";
type Enterprise={
  enterprise:string;
}
type Role={
  role:string;
}
type Match={
  matchtype:string;
  usernamematch:string;
}

export type User = {
  id: string;
  name: string;
  roles: Role[];
  enterprises: Enterprise[];
  matches:Match[];
};

type Schema = {
  users: User[];
};

let db: lowdb.LowdbSync<Schema>;

export const createConnection = async () => {
  const adapter = new FileSync<Schema>("db.json");
  db = lowdb(adapter);
  db.defaults({ users: [] }).write();
};

export const getConnection = () => db;
