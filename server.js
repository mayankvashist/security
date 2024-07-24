const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const tokens = new Map();

app.get('/generate-token', (req, res) => {
    const token = crypto.randomBytes(16).toString('hex');
    tokens.set(token, true);
    res.json({ token });
});

app.post('/validate-token', (req, res) => {
    const { token } = req.body;
    if (tokens.has(token)) {
        tokens.delete(token);
        res.json({ valid: true });
    } else {
        res.json({ valid: false });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
