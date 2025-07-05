const express = require("express");
const app = express();
const PORT = 5001;
const XLSX = require('xlsx');

// Middleware to parse JSON
app.use(express.json());

// Example route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/city-code", (req,res) => {
  const workbook = XLSX.readFile("city_code.xlsx");
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const data = XLSX.utils.sheet_to_json(worksheet);

  let result = data.map((item) => {
    return {
      city: item.city,
      code: item.code,
      country: item.country,
      countryCode: item.countrycode,
    };
  });

  res.send(result)
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
