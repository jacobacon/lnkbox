import * as express from "express";
const router = express.Router();

import { entries } from "./routers/entries";

router.get("/", (req, res) => {
  res.json({ hello: "world" });
});

router.use("/entries", entries);

export { router as apiRouter };
