const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());

// Middleware to parse incoming JSON
app.use(bodyParser.json());

// POST Route for processing data
app.post("/bfhl", (req, res) => {
  const { data, file_b64 } = req.body;

  let numbers = [];
  let alphabets = [];
  let highestLowercaseAlphabet = null;
  let fileValid = false;
  let fileMimeType = null;
  let fileSizeKB = null;

  // Check if data exists and process it
  if (data && Array.isArray(data)) {
    data.forEach((item) => {
      if (!isNaN(item)) {
        numbers.push(item);
      } else if (/[a-zA-Z]/.test(item)) {
        alphabets.push(item);
        if (/[a-z]/.test(item)) {
          if (!highestLowercaseAlphabet || item > highestLowercaseAlphabet) {
            highestLowercaseAlphabet = item;
          }
        }
      }
    });
  }

  if (file_b64) {
    const buffer = Buffer.from(file_b64, "base64");
    fileSizeKB = buffer.length / 1024;
    fileValid = true;
    fileMimeType = "image/png";
  }

  res.status(200).json({
    is_success: true,
    user_id: "ank_agarwal_05082003",
    email: "av5602@srmist.edu.in",
    roll_number: "RA2111003010052",
    numbers: numbers,
    alphabets: alphabets,
    highest_lowercase_alphabet: highestLowercaseAlphabet
      ? [highestLowercaseAlphabet]
      : [],
    file_valid: fileValid,
    file_mime_type: fileMimeType,
    file_size_kb: fileSizeKB,
  });
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({
    operation_code: 1,
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
