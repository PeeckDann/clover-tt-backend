import express from "express";
import cors from "cors";
import { writeFile, readFile } from "fs";
const app = express();

app.use(express.json());
app.use(cors());

app.post("/save", (req, res) => {
  writeFile("board.json", JSON.stringify(req.body), (err) => {
    if (err) {
      res.status(400).send(err);
    } else {
      res.status(200).send("Saved successfully");
    }
  });
});

app.get("/get", (req, res) => {
  readFile("board.json", (err, data) => {
    if (err) {
      res.status(400).send(err);
    } else {
      const board = JSON.parse(data);
      res.set("Content-Type", "application/json");
      res.status(200).json(board);
    }
  });
});

const server = app.listen(5000, () => {
  console.log(`Running server at http://127.0.0.1:${server.address().port}`);
});
