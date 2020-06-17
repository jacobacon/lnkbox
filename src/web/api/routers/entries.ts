import * as express from "express";
const router = express.Router({ mergeParams: true });

import Database from "../../../common/classes/database";
import Entry from "../../../common/interfaces/entry";
import contentType from "../../../common/types/contentType";
import apiResponse from "../../../common/types/apiResponse";

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
    parentID,
  }: {
    tags: string[];
    page: number;
    contentType: contentType;
    pageLength: number;
    parentID: number[] | "root"[];
  } = req.query;

  let responseData: apiResponse = {};

  /*
    0) Filter to parentID if given
    1) Find all entries that match content type, or don't filter
    2) Find all entries that match tags, or don't filter
    3) Find all entries that match tags and contentType
    4) IF(page) Sort and Cut results from 1-3 into 'pages' of pageLength, or 25 by default
    5) Return the page requested, or page 1 (Entries 1-25)
  */

  let filter: {
    contentType?: object;
    tags?: object;
    parentID?: object;
  } = {};

  if (parentID) {
    filter.parentID = { $contains: parentID };
  }

  if (contentType) {
    filter.contentType = { $eq: contentType };
  }

  if (tags) {
    filter.tags = { $contains: tags };
  }

  let offset = 0;
  let limit = pageLength || 20;

  if (page > 0) {
    offset = (page - 1) * limit;
  }

  responseData.response = {
    responseMsg: "success",
    data: Database.entries
      .chain()
      .find(filter)
      .offset(offset)
      .limit(limit)
      .data(),
  };

  res.json(responseData);
});

// Get a specific entry
router.get("/:entryID", async (req, res) => {
  const { entryID } = req.params;

  let responseData: apiResponse = {};
  let statusCode: number = 500;

  //Validate that entryID is a number
  if (!Number.isNaN(Number(entryID))) {
    //If an entry exists, update it with the new content.
    const entry = Database.entries.get(entryID);
    if (entry) {
      responseData.response = {
        data: entry,
        responseMsg: "success",
      };
      statusCode = 200;
    } else {
      //Otherwise, let the user know that the entry doesn't exist.
      responseData.error = {
        error: "NotFound",
        errorMsg: "Entry wasn't found",
      };
      statusCode = 404;
    }
  } else {
    //The user screwed up!
    responseData.error = {
      error: "InvalidParameter",
      errorMsg: "entryID must be an integer!",
    };
    statusCode = 400;
  }
  res.status(statusCode).json(responseData);
});

// Create a new entry
router.post("/", async (req, res) => {
  const {
    contentType,
    url,
    userID,
    parentID,
    tags,
  }: {
    contentType: contentType;
    url: string;
    userID: number;
    parentID: number[];
    tags: string[];
  } = req.body;

  let responseData: apiResponse = {};
  let statusCode: number = 200;

  let newEntry: Entry;

  //TODO Validate URL is valid
  if ((contentType === "link" && url === undefined) || userID === undefined) {
    statusCode = 400;

    responseData.error = {
      error: "InvalidParameter",
      errorMsg: "Missing required parameters",
    };
  }

  //Easy way to check if an entry was created
  if (statusCode === 200) {
    newEntry = {
      contentType,
      url,
      creationDate: new Date(),
      userID,
      parentID,
      tags,
    };

    Database.entries.insert(newEntry);

    responseData.response = {
      responseMsg: `${contentType} created`,
      data: newEntry,
    };
  }

  res.status(statusCode).json(responseData);
});

// Update an entry
router.patch("/:entryID", async (req, res) => {
  const { entryID } = req.params;

  let responseData: apiResponse = {};
  let statusCode: number = 500;

  //If entryID is an integer, try to find it in the database
  if (!Number.isNaN(Number(entryID))) {
    const entry = Database.entries.get(entryID);
    //IF the entry exists, update its contents with the new data
    if (entry) {
      //TODO Add validation to PATCH body.
      Object.assign(entry, req.body);

      Database.entries.update(entry);

      responseData.response = {
        data: entry,
        responseMsg: "updated",
      };

      statusCode = 200;
    } else {
      responseData.error = {
        error: "NotFound",
        errorMsg: "Entry wasn't found",
      };
      statusCode = 404;
    }
  } else {
    responseData.error = {
      error: "InvalidParameter",
      errorMsg: "entryID must be an integer!",
    };
    statusCode = 400;
  }
  res.status(statusCode).json(responseData);
});

// Delete an entry
router.delete("/:entryID", async (req, res) => {
  const { entryID } = req.params;

  let responseData: apiResponse = {};
  let statusCode: number = 500;

  //If entryID is an integer, try to find it in the database
  if (!Number.isNaN(Number(entryID))) {
    const entry = Database.entries.get(entryID);
    //IF the entry exists, update its contents with the new data
    if (entry) {
      Database.entries.remove(entry);
      responseData.response = {
        responseMsg: `${entryID} deleted`,
        data: "deleted",
      };
      statusCode = 200;
    } else {
      statusCode = 404;
      responseData.error = {
        error: "NotFound",
        errorMsg: `${entryID} was not found`,
      };
    }
  } else {
    responseData.error = {
      error: "InvalidParameter",
      errorMsg: "entryID must be an integer!",
    };
    statusCode = 400;
  }
  res.status(statusCode).json(responseData);
});

export { router as entries };
