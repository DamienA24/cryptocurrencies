import express from "express";
import { displayLog } from "./utils/log.js";

const app = express();
const port = 4000;

app.listen(port, () => {
  displayLog("yellow", `server listening on port ${port}`);
});
