console.log("Setting Up...");

import { koaServer } from "./web/web";

koaServer.listen(3000, () => {
  console.log("Listening on port 3000");
});
