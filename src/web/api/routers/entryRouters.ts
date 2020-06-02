import * as Router from "koa-router";
import Entry from "../../../common/interfaces/entry";
const router = new Router();

import Database from "../../../common/classes/database";

//import * as Loki from "lokijs";
/*let db = new Loki("lnkbox.db", {
  autoload: true,
  autoloadCallback: databaseInitialize,
  autosave: true,
  autosaveInterval: 4000,
});
*/

/*
function databaseInitialize() {
  var entries = db.getCollection("entries");
  if (entries === null) {
    entries = db.addCollection("entries");
  }

  console.log("Init DB");

  // kick off any program logic or start listening to external events
  runProgramLogic();
}

// example method with any bootstrap logic to run after database initialized
function runProgramLogic() {
  var entryCount = db.getCollection("entries").count();
  console.log("number of entries in database : " + entryCount);
  entries = db.getCollection("entries");
}
*/

router.get("/:entry", async (ctx, next) => {
  //const entries = new Database().entries;
  ctx.type = "json";

  ctx.body = Database.entries.find();
});

router.get("/", async (ctx, next) => {
  let entry: Entry = {
    contentType: "link",
    creationDate: new Date(),
    userID: "1",
    parent: "root",
    tags: [],
  };

  Database.entries.insert(entry);
  ctx.type = "text";
  ctx.body = "Hello World!";
});

export default router;
