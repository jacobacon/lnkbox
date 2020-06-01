/*
    Class definition for the Database Manager.

    This definition has no public constructor, and all methods are static to ensure consitancy throughout LnkBox.

    Usage: Database.init() -> Initializes the database. Make sure to run this AT LEAST ONCE before usage.
    Database.db -> returns LokiJS DB instance
    Database.entries -> returns the entries collection.

*/

import * as Loki from "lokijs";

export default class Database {
  private static _db: Loki;

  private static _entries: any;

  private constructor() {}

  public static init(filename?: string): void {
    if (!Database._db) {
      const dbName = filename || "lnkbox.db";
      Database._db = new Loki(dbName, {
        autoload: true,
        autosave: true,
        autosaveInterval: 4000,
      });
      this.dbInit();
    }
  }

  private static dbInit(): void {
    //Add collections to the DB
    Database._entries = Database._db.getCollection("entries");
    if (Database._entries === null) {
      Database._entries = Database._db.addCollection("entries", {
        autoupdate: true,
      });
    }
  }

  public static get db(): Loki {
    return Database._db;
  }

  public static get entries(): any {
    return Database._entries;
  }
}
