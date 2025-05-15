const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Root route
app.get('/', (req, res) => {
  res.send('Hello from the deployed Node.js API!');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
