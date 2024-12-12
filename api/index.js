import sqlite3 from "sqlite3";
import { open } from "sqlite";
import express from "express";
import cors from "cors";

async function main() {
  const db = await open({
    filename: "./data.db",
    driver: sqlite3.Database,
  });
  await db.exec(
    `
    CREATE TABLE IF NOT EXISTS dropdown (
    id INTEGER PRIMARY KEY AUTOINCREMENT, 
    content TEXT
    );
    
    CREATE TABLE IF NOT EXISTS dropdown_item (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    dropdown_id INTEGER,
    content TEXT,
    FOREIGN KEY(dropdown_id) REFERENCES dropdown(id)
    )
    `
  );

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.get("/", (req, res) => {
    res.send("I'm working :)");
  });

  app.post("/dropdowns", async (req, res) => {
    const { content } = req.body;
    const result = await db.run(
      `
      INSERT INTO dropdown (content) VALUES (?)
      `,
      [content]
    );
    res.status(201).json({ id: result.lastID });
  });

  app.post("/dropdown-items", async (req, res) => {
    const { dropdown_id, content } = req.body;
    const result = await db.run(
      `
      INSERT INTO dropdown_item (dropdown_id, content) VALUES (?, ?)
      `,
      [dropdown_id, content]
    );
    res.status(201).json({ id: result.lastID });
  });

  app.get("/dropdowns", async (req, res) => {
    const dropdowns = await db.all(
      `
      SELECT * FROM dropdown
      `
    );
    await Promise.all(
      dropdowns.map(async (dropdown) => {
        dropdown.items = await db.all(
          `
        SELECT * FROM dropdown_item WHERE dropdown_id = ?
        `,
          [dropdown.id]
        );
      })
    );
    res.json(dropdowns);
  });

  app.delete("/delete", async (req, res) => {
    await db.run(
      `
      DELETE FROM dropdown;
      DELETE FROM dropdown_item;
      `
    );
    res.send("All dropdowns deleted");
  });

  app.listen(3000);
}

main();
