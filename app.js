require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const User = require("./model/User");
const Service = require("./model/Service");
const cors = require("cors")

const app = express();
app.use(express.json());
app.use(cors());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth =  require("./middlewares/auth")
const server = require('http').createServer(app);
const uuid = require("uuid4");



app.get("/", (req, res) => {
  res.json({
    name: "krishna",
  });
});

app.post("/register", async (req, res) => {
    console.log(req)
  try {
    const { firstName, lastName, email, password } = req.body;
    if (!(firstName && lastName && email && password)) {
      res.status(400).send("All fields are mandatory");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(410).send("Already exists");
    }

    const myEcryptPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email: email.toLowerCase(),
      password: myEcryptPassword,
    });

    // Token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.SECRET_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    user.password = undefined;
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
});

app.post("/addService", auth, async(req,res) => {

    try{
        const {serviceName, cost, changeBy} = req.body;

        if (!(serviceName && cost)) {
            res.status(400).send("All fields are mandatory");
          }

          const service = await Service.create({
            serviceName,
            cost,
            changeBy,
            serviceId: uuid()
          });

    res.status(200).json(service);

    } catch (err) {
        console.log(err)
    }
})

app.post("/deleteService", auth, async(req,res) => {
    const {serviceId} = req.body;

    const getserviceId = await Service.deleteOne({serviceId})
    console.log("GETSERVICE",getserviceId)
    res.status(200).json(getserviceId)
})

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body)

    if (!(email && password)) {
      res.status(400).send("Fields are missing");
    }

    const user = await User.findOne({email});
    console.log(user)
    if (!user) {
      res.status(400).send("U r not registered");
    }

    // const pass = await bcrypt.compare(password, user.password);

    if (user && (await bcrypt.compare(password, user.password))) {
      // Token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.SECRET_KEY,
        {
          expiresIn: "2h",
        }
      );

      user.token = token;
      user.password = undefined;
      res.status(200).json(user);
    }

      res.status(400).send("U r not registered");

  } catch (error) {
    console.log(error);
  }
});

app.get("/getServiceList", auth, async(req,res) => {
    const getserviceId = await Service.find()
    res.status(200).json(getserviceId)
})

module.exports = app;
