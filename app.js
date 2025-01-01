const express = require('express');
const app = express();
const port = 3000;

app.use(express.static('public')); // Serve static files from 'public' folder

// Example route to fetch the high score
app.get('/highscore', (req, res) => {
    // Get the high score from the database (for now, it's hardcoded)
    res.json({ highScore: 1000 });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
