import * as express from "express";
const router = express.Router({ mergeParams: true });

import Database from "../../../common/classes/database";
import Entry from "../../../common/interfaces/entry";
import contentType from "../../../common/types/contentType";

//import { entry } from "../../../common/types/"

// List entries with optional filtering.
//
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

// Get a specific entry
router.get("/:entryID", async (req, res) => {
  console.log(req.params.entryID);
  res.json(Database.entries.get(1));
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
