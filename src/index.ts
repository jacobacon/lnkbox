import App from "./app";

const app = new App();

let port = Number(process.env.PORT);

app.startServer(port);
