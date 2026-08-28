const express = require("express");

const app = express();

app.use(express.json());

// root "get" command
app.get("/", (req, res) => {
    res.send("Chatbot API Running");
});

// chat function
app.post("/chat", (req, res) => {
    res.json({
        response: `You said: ${req.body.message}`
    });
});

// settings function
app.get("/settings", (req, res) => {
    res.json({
        bot_name: "AaronBot",
        version: "1.0"
    });
});

// sleep function - 10 seconds 
app.get("/gotosleep", async (req, res) => {

    await new Promise(resolve => setTimeout(resolve, 10000));

    res.json({
        message: "don't be a toolbox."
    });
});

// asynchronous behavior tool
app.post("/wait", async (req, res) => {

    const data = req.body;
    const phone = req.body.phone;

    await new Promise(resolve => setTimeout(resolve, 15000));

    res.json({
        response: `I have recorded ${phone}`,
        state: `I am reporting ${data.message}`
    });
});

// random API responses
app.post("/random", (req, res) => {
  const roll = Math.random();

  if (roll < 0.40) {
    return res.status(200).json({
      status: "success",
      message: "Request processed successfully."
    });
  }

  if (roll < 0.75) {
    return res.status(404).json({
      status: "not_found",
      message: "Far end does not exist."
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error."
  });
});

// Live Agent tool
app.post("/agent", async (req,res) => {
    
    const data = req.body;

    res.json({
        success: 'true',
        agentQueue: 'Escalation',
        estimatedWait: 15
    });
});

// a health tool for no reason :D
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// a validation tool
app.post("/validate", (req, res) => {
  const body = req.body || {};

  // Keep all input values as strings to preserve leading zeros.
  const method = String(body.method || "")
    .trim()
    .toUpperCase();

  const CUSTOMER_ZIP_CODE = String(body.CUSTOMER_ZIP_CODE || "")
    .replace(/\D/g, "");

  const CUSTOMER_DOB = String(body.CUSTOMER_DOB || "")
    .replace(/\D/g, "");

  const CUSTOMER_LAST_4_SSN = String(body.CUSTOMER_LAST_4_SSN || "")
    .replace(/\D/g, "");

  // Validate input formats.
  const zipIsValidFormat = /^\d{5}$/.test(zip);
  const dobIsValidFormat = /^\d{8}$/.test(dob);
  const ssnIsValidFormat = /^\d{4}$/.test(ssn);

  let isConfirmed = false;

  switch (method) {
    case "ZIP_DOB":
      isConfirmed =
        zipIsValidFormat &&
        dobIsValidFormat &&
        CUSTOMER_ZIP_CODE === "55555" &&
        CUSTOMER_DOB === "05051955";
      break;

    case "DOB_SSN4":
      isConfirmed =
        dobIsValidFormat &&
        ssnIsValidFormat &&
        CUSTOMER_DOB === "05051955" &&
        CUSTOMER_LAST_4_SSN === "5555";
      break;

    case "ZIP_SSN4":
      isConfirmed =
        zipIsValidFormat &&
        ssnIsValidFormat &&
        CUSTOMER_ZIP_CODE === "55555" &&
        CUSTOMER_LAST_4_SSN === "5555";
      break;

    default:
      return res.status(400).json({
        customerId: "unconfirmed",
        status: "ERROR",
        errorCode: "INVALID_VERIFICATION_METHOD"
      });
  }

  if (isConfirmed) {
    return res.status(200).json({
      customerId: "555",
      status: "CONFIRMED"
    });
  }

  return res.status(200).json({
    customerId: "unconfirmed",
    status: "UNCONFIRMED"
  });
});
    
const PORT = process.env.PORT;

app.listen(PORT);
