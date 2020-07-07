import { server } from "../../src/web/web";
import Database from "../../src/common/classes/database";
import * as supertest from "supertest";

import * as fs from "fs";
import * as path from "path";

const request = supertest(server);

beforeAll((done) => {
  Database.init("lnkbox-test.db");

  // Jest didn't like async / await for this. Manually waiting for 2 seconds until the DB is setup.
  setTimeout(() => done(), 2000);
});

test("two plus two equals four", () => {
  expect(2 + 2).toBe(4);
});

test("verify server", async () => {
  const res = await request.get("/api");

  console.log(res.body);
  expect(res.status).toBe(200);
  expect(res.body.hello).toBe("world");
});

test("get empty entries", async () => {
  const res = await request.get("/api/entries");

  console.log(res.body);

  expect(res.status).toBe(200);
  expect(res.body.response.data).toEqual([]);
});

// Teardown the DB
afterAll((done) => {
  Database.db.close(() => {
    fs.unlink(path.join(process.cwd(), "/lnkbox-test.db"), (err) => {
      if (err) console.log(err);
      done();
    });
  });
});
