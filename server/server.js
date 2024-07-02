const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

let requestTimes = [];

const corsOptions = {
  origin: 'http://localhost:3000',
};

app.use(cors(corsOptions))
app.use(express.json());

app.post('/api', (req, res) => {
  const currentTime = Date.now();
  const oneSecondAgo = currentTime - 1000;

  requestTimes = requestTimes.filter(time => time > oneSecondAgo);

  if (requestTimes.length >= 50) {
    return res.status(429).json({ error: 'Too many requests' });
  }

  requestTimes.push(currentTime);

  const delay = Math.floor(Math.random() * 1000) + 1;

  setTimeout(() => {
    res.json({ index: req.body.index });
  }, delay);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
