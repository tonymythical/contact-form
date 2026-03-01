import express from "express";
import path from "path";

const app = express();
const PORT = 3009;

app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

const guestbookUsers = [];

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/contact", (req, res) => {
  res.render("contact");
});

app.post("/submit", (req, res) => {
  const newEntry = {
    firstName: req.body["first-name"],
    lastName: req.body["last-name"],
    email: req.body.email,
    linkedIn: req.body.linkedin,
    howWeMet: req.body.meet,
    otherSpecify: req.body.other,
    mailingList: req.body["mailing-list"] === "on",
    format: req.body.format || "N/A",
    timestamp: new Date().toLocaleString()
  };

  guestbookUsers.push(newEntry);

  res.render("confirmation", { user: newEntry });
});

app.get("/admin", (req, res) => {
  res.render("admin", { users: guestbookUsers });
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
