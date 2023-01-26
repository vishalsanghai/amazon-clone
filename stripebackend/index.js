const cors = require("cors");
const express = require("express");
const stripe = require("stripe")("sk_test_51KGTrCCoZstnaqib7zbsLr1sRQ5eLok9sGi2FWblEdvgfbj5SaPuxrMBmO73jjMQyFfNKaSm0nBMT1ItXnAfsrDi001wJhaK3G");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Add your stripe Secret Key to the .require('stripe')");
})

app.post("/checkout", async (req, res) => {
    console.log("Request:", req.body);

    let error;
    let status;

    try{
        const {total, token} = req.body;

        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        });

        const idempotency_key = uuidv4();

        const charge = await stripe.charges.create({
            amount: total * 100,
            currency: "usd",
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased the Product`,
        },
        {
            idempotency_key
        });
        console.log("Charge:", {charge})
        status = "success";
    }catch(error){
        console.error("Error:", error);
        status = "failure"
    }

    res.json({error, status})

})

app.listen(8080);