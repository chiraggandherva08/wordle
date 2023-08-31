const fs = require("fs");

const express = require("express");
const app = express();
const PORT = 8000;

const cors = require('cors');
app.use(cors());

const fetch_words = async () => {
    try {
        const res = await fs.readFileSync('res.txt').toString().split('\n');
        return res;
    }
    catch {
        return [];
    }
}

app.get("/", async (req, res) => {
    const words = await fetch_words();
    const idx = Math.floor(Math.random() * words.length);

    if (words.length == 0) {
        res.json({
            status: "failed to load words"
        })
    }
    else {
        res.json({ word: words[idx] })
    }
});

app.listen(PORT, () => {
    console.log(`Connected to port ${PORT}`)
});
