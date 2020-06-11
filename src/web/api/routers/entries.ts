import * as express from "express";
const router = express.Router({ mergeParams: true });

import Database from "../../../common/classes/database";
import Entry from "../../../common/interfaces/entry";
import contentType from "../../../common/types/contentType";

/*
Crappy temp docs... TODO replace these with better API docs.
Endpoints: 
  - { GET } '/' - Returns a list of all entries
  - { GET } '/:entryID' - Returns a single entry, or folder
  - { POST } '/' Create a new entry
  - { PATCH } '/:entryID' - update an entry
  - { DELETE } '/:entryID' - Delete an entry, if it is a folder, sets the children to a new directory, or home directory.
*/

// List entries with optional filtering.
router.get("/", async (req, res) => {
  const {
    tags,
    page,
    contentType,
    pageLength,
  }: {
    tags: string[];
    page: number;
    contentType: contentType;
    pageLength: number;
  } = req.query;

  console.log(page);

  const query = Database.entries.chain();

  if (page) {
  }

  query.find();

  query.offset(5);

  //res.json(query.data());

  res.json(
    Database.entries
      .chain()
      .limit()
      .offset(5)
      .data()
  );
});

// Get a specific entry
router.get("/:entryID", async (req, res) => {
  console.log(req.params.entryID);
  res.json(Database.entries.get(1));
});

// Create a new entry
router.post("/", async (req, res) => {
  let newEntry: Entry = {
    contentType: "link",
    url: "https://www.google.com",
    creationDate: new Date(),
    userID: "0",
    parent: "root",
    tags: [],
  };
  res.json(Database.entries.insert(newEntry));
});

// Update an entry
router.put("/:entryID", async (req, res) => {
  res.json({ success: true });
});

// Delete an entry
router.delete("/:entryID", async (req, res) => {
  res.json({ success: true });
});

export { router as entries };
