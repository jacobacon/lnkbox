import * as express from "express";
const router = express.Router({ mergeParams: true });

import Database from "../../../common/classes/database";
import Entry from "../../../common/interfaces/entry";
import contentType from "../../../common/types/contentType";
import apiResponse from "../../../common/types/apiResponse";
import LinkEntry from "../../../common/classes/linkEntry";
import FolderEntry from "../../../common/classes/folderEntry";

import { isUrl } from "../../../common/helpers/validation";

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
  let {
    contentType,
    url,
    userID,
    parentID,
    tags,
    title,
  }: {
    contentType: contentType;
    url: string;
    userID: number;
    parentID: string[];
    tags: string[];
    title: string;
  } = req.body;

  let responseData: apiResponse = {};
  // Assume that everything is alright with the request. Check for possible problems and reject.
  let statusCode: number = 200;

  let newEntry: Entry;

  // If entry is a link, but not a valid URL, or if parentID isn't an array, return an error.
  if (
    (contentType === "link" && !isUrl(url)) ||
    userID === undefined ||
    typeof parentID === "string"
  ) {
    statusCode = 400;

    responseData.error = {
      error: "InvalidParameter",
      errorMsg: "Missing required parameters",
    };
  }

  // Validate folder
  else if (contentType === "folder") {
    // If the parentID is not the root, check if it is a valid sub-folder

    let isParentRoot = true;

    // Check if parentID is undefined
    // If not undefined, check if parentID includes('root')
    // If either are not true, then check if parentID is a valid subfolder.

    if (parentID !== undefined) {
      if (!parentID.includes("root")) {
        isParentRoot = false;
      }
    }

    if (!isParentRoot) {
      if (parentID.length > 1) {
        //Incorrect amount of parentIDs (Should be only one)
        statusCode = 400;
        responseData.error = {
          error: "InvalidParameter",
          errorMsg: "parentID MUST be a single value",
        };
        // Correct number of parentIDs (one)
      } else {
        //Check if the parentID is a string. If not, just convert it to one.
        if (typeof parentID[0] === "number") {
          parentID[0] = String(parentID[0]);
        }
        let parent;
        try {
          //Check if the parentID is a folder.
          parent = await Database.entries.get(parentID);
        } catch (error) {
          console.log("Couldn't get the parent");
        }

        //Prevent creating a new Entry if the parent is not a folder.
        if (parent.contentType !== "folder") {
          statusCode = 400;
          responseData.error = {
            error: "InvalidRequest",
            errorMsg: "parentID must be a folder",
          };
        }
        console.log(parentID);
        console.log(parent);
      }

      // If it passed all conditions, it is a valid folder.
    }
    if (!title) {
      statusCode = 400;
      responseData.error = {
        error: "InvalidParameter",
        errorMsg: "Missing folder title parameter",
      };
    }
  }

  if (statusCode === 200) {
    //If it passed all above checks, an entry is able to be created!

    //Make an object with the correct type of entry.
    if (contentType === "link") {
      newEntry = new LinkEntry(url, userID || 1, {
        parentID,
        title,
        tags,
      });
    } else if (contentType === "folder") {
      newEntry = new FolderEntry(title, userID || 1, {
        parentID,
        tags,
      });
    }

    if (newEntry !== undefined) {
      console.log("Inserting! " + newEntry);
      Database.entries.insert(newEntry);
      responseData.response = {
        responseMsg: `${contentType} created`,
        data: newEntry,
      };
    } else {
      responseData.error = {
        errorMsg: "Unable to create new Entry",
        error: "InternalError",
      };
    }
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
