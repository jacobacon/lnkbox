import { koaServer } from "./web/web";

import * as fs from "fs";
import * as path from "path";

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
  }

  startServer(portNumber?: number): void {
    const port = portNumber || 3000;

    koaServer.listen(port, () => {
      console.log(`Server is started on port: ${port}`);
    });
  }
}

export default App;
