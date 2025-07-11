const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./queries");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const port = 3001;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(
  cors({
    origin: ["http://localhost:3000"],
    method: ["GET","POST","PUT"],
    credentials: true
  }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(
  session({
    key: "iitbuser",
    secret:"1234",
    resave:false,
    saveUninitialized:false ,
    cookie: {
      expires: 60*60*24*1000,
    },
  })
);

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/login", db.getLogin);
app.get("/logout", db.getLogout);
app.get("/login-session", db.getLoginSession);
app.post("/registration", db.getRegistration);
app.get("/portalmaster", db.getPortalMaster);
app.post("/assign", db.getAssign);
app.post("/approve", db.getApprove);
app.post("/update", db.getUpdate);
app.post("/updatepos", db.getUpdatepos);
app.post("/updatedep", db.getUpdatedep);
app.post("/drop", db.getDrop);
app.post("/deleteleave", db.getDeleteleave);
app.post("/empdetail", db.getempdetail);
app.post("/edu", db.getedu);
app.post("/dependent", db.getDependent);
app.post("/workexp", db.getworkexp);
app.post("/leaveapp", db.getleaveapp);
app.post("/leaveapphr", db.getleaveapphr);
app.post("/leaveappsubmit", db.getleaveappsubmit);
app.post("/persoinfosubmit", db.getpersoinfosubmit);
app.post("/edusubmit", db.getedusubmit);
app.post("/depsubmit", db.getdepsubmit);
app.post("/expsubmit", db.getexpsubmit);
app.post("/currworksubmit", db.getcurrworksubmit);
app.post("/salsubmit", db.getsalsubmit);
app.post("/projbidsubmit", db.getprojbidsubmit);
app.post("/hruser", db.gethruser);
app.post("/salary", db.getsal);
app.post("/projbid", db.getprojbid);
app.get("/newemp", db.getnewemp);
app.get("/newempsal", db.getnewempsal);
app.get("/exiemp", db.getexiemp);


app.listen(port, () => {
    console.log(`App running on port ${port}.`);
  });