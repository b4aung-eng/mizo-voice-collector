const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.json());
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const textId = req.body.textId || 'unknown';
    cb(null, 'mizo_sentence_' + textId + '_' + Date.now() + '.wav');
  }
});
const upload = multer({ storage });
const mizoSentences = [
  { id: 1, text: "Chibai, i dam em?" },
  { id: 2, text: "Mizo tawng hi a mawi hle mai." },
  { id: 3, text: "Naktukah khua a tha ang em?" },
  { id: 4, text: "Vawiin chu ka hnatlang dawn a ni." },
  { id: 5, text: "Aizawl khawpui hi a lun hle mai." }
];
app.get('/api/sentence', (req, res) => {
  const random = mizoSentences[Math.floor(Math.random() * mizoSentences.length)];
  res.json(random);
});
app.post('/api/upload', upload.single('audio'), (req, res) => {
  console.log('Saved file:', req.file.filename);
  res.json({ success: true, filename: req.file.filename });
});
app.listen(PORT, () => console.log('App running on port ' + PORT));