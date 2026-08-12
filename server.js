const express = require("express");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Chatbot API Running");
});

app.post("/chat", (req, res) => {
    res.json({
        response: `You said: ${req.body.message}`
    });
});

app.get("/settings", (req, res) => {
    res.json({
        bot_name: "AaronBot",
        version: "1.0"
    });
});

app.get("/gotosleep", async (req, res) => {

    await new Promise(resolve => setTimeout(resolve, 10000));

    res.json({
        message: "Did this work?"
    });
});

app.post("/wait", async (req, res) => {

    const data = req.body;
    const phone = req.body.phone;

    await new Promise(resolve => setTimeout(resolve, 15000));

    res.json({
        response: `I have recorded ${phone}`,
        state: `I am reporting ${data.message}`
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

const PORT = process.env.PORT || 3100;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
