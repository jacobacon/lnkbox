import { server } from "./web/web";

import * as fs from "fs";
import * as path from "path";

import Database from "./common/classes/database";

class App {
  constructor() {
    this.setup();
  }

  private setup(): void {
    if (!fs.existsSync(path.join(process.cwd(), "dist/user_data"))) {
      console.log(
        "Storing User Data in: ",
        path.join(process.cwd(), "dist/user_data")
      );
      fs.mkdir(
        path.join(process.cwd(), "dist/user_data/files"),
        { recursive: true },
        (err) => {
          if (err) throw err;
        }
      );
    }

    let dbName = "";
    if (process.env.NODE_ENV) {
      dbName = `lnkbox-${process.env.NODE_ENV}.db`;
    }
    Database.init(dbName);
  }

  startServer(portNumber?: number): void {
    const port = portNumber || 3000;

    server.listen(port, () => {
      console.log(`Server is started on port: ${port}`);
    });
  }
}

export default App;
