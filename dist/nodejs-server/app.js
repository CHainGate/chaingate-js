import express from 'express';
import bodyParser from "body-parser";
import crypto from "crypto";
import 'dotenv/config';
const app = express();
const port = process.env.PORT || 10001;
app.use(bodyParser.json());
app.use(express.json());
const items = [
    {
        productId: "1001",
        price: 1500,
        currency: "USD",
        name: "Computer 1"
    },
    {
        productId: "1002",
        price: 1700,
        currency: "CHF",
        name: "Computer 2"
    },
    {
        productId: "1003",
        price: 2100,
        currency: "USD",
        name: "Computer 3"
    },
];
app.get('/signature/:productId', (req, res) => {
    var _a;
    const payCurrency = (_a = req.query) === null || _a === void 0 ? void 0 : _a.payCurrency;
    if (!payCurrency) {
        return res.sendStatus(400);
    }
    let item = items.find((e) => e.productId === req.params.productId);
    if (!item) {
        return res.sendStatus(404);
    }
    // @ts-ignore
    const hmac = crypto.createHmac('sha512', process.env.API_KEY);
    let chaingateItem = {
        price_amount: item.price,
        price_currency: item.currency,
        pay_currency: payCurrency,
        callback_url: `http://localhost:${port}/webhook`
    };
    // @ts-ignore
    hmac.update(JSON.stringify(item, Object.keys(item).sort()));
    const signature = hmac.digest('hex');
    res.status(200).send(JSON.stringify({ data: chaingateItem, signature }));
});
app.post('/webhook', (req, res) => {
    const params = req.body.data;
    // @ts-ignore
    const hmac = crypto.createHmac('sha512', process.env.API_KEY);
    hmac.update(JSON.stringify(params, Object.keys(params).sort()));
    const signature = hmac.digest('hex');
    if (signature === req.body.signature) {
        // this is a valid webhook from ChainGate
        // process the request here
        console.log("Valid WebHook from ChainGate");
    }
    else {
        console.log("Invalid WebHook from ChainGate");
    }
    console.log(params);
    res.sendStatus(200);
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
