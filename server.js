const path = require("path");
const express = require("express");
const cors = require("cors");

if (process.env.NODE_ENV !== "production") require("dotenv").config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client/build", "index.html"));
    });
}

app.post("/payment", (req, res) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "inr",
    };

    stripe.charges.create(body, (stripeErr, stripeRes) => {
        if (stripeErr) res.status(500).send({ error: stripeErr });
        else res.status(200).send({ success: stripeRes });
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening to ${port}`));
