import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import stripe from "stripe";


  if (process.env.NODE_ENV !== "production") {
    dotenv.config();
  }

  const stripePayment = stripe(process.env.STRIPE_SECRET_KEY);

  const app = express();
  const port = process.env.PORT || 5000;

  app.use(cors());
  // parse application/json, basically parse incoming Request Object as a JSON Object
  app.use(express.json());
  // middleware to parse url string to exclude not allowed symbols
  app.use(express.urlencoded({ extended: true }));

  if (process.env.NODE_ENV == "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "client/build", "index/html"));
    });
  }

  app.listen(port, (error) => {
    if (error) throw error;
    console.log("Server is running on port ", port);
  });

  app.post("/payment", (req, res) => {
    const body = {
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "usd",
    };

    stripePayment.charges.create(body, (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).send({ error: stripeErr });
      } else res.status(200).send({ success: stripeRes });
    });
  });