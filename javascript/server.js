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
        message: "don't be a toolbox."
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

app.post("/random", (req, res) => {
  const roll = Math.random();

  if (roll < 0.75) {
    return res.status(200).json({
      status: "success",
      message: "Request processed successfully."
    });
  }

  if (roll < 0.9) {
    return res.status(429).json({
      status: "rate_limited",
      message: "Too many requests. Please retry later."
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error."
  });
});

app.post("/agent", async (req,res) => {
    
    const data = req.body;

    res.json({
        success: 'true',
        agentQueue: 'Escalation',
        estimatedWait: 15
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

const PORT = process.env.PORT;

app.listen(PORT);
