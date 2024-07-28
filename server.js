const express = require('express');
const app = express();
const port = 3000;
require('dotenv').config();

// Serve static files (e.g., HTML, CSS, JS)
app.use(express.static('public'));

app.get('/getApiKey', (req, res) => {
    res.json({ apiKey: process.env.OPENWEATHERMAP_API_KEY });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
