const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/feedback', (req, res) => {
    const feedback = req.body;
    const filePath = path.join(__dirname, 'database', 'feedback.json');

   
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return fs.writeFile(filePath, JSON.stringify([feedback], null, 2), err => {
                    if (err) {
                        console.error('Error saving feedback:', err);
                        return res.status(500).send('Error saving feedback');
                    }
                    return res.status(200).send('Feedback received');
                });
            } else {
                console.error('Error reading feedback file:', err);
                return res.status(500).send('Error reading feedback file');
            }
        }

        let feedbackArray;
        try {
            feedbackArray = JSON.parse(data);
        } catch (parseErr) {
            console.error('Error parsing feedback file:', parseErr);
            return res.status(500).send('Error parsing feedback file');
        }

        feedbackArray.push(feedback);

        fs.writeFile(filePath, JSON.stringify(feedbackArray, null, 2), err => {
            if (err) {
                console.error('Error saving feedback:', err);
                return res.status(500).send('Error saving feedback');
            }
            return res.status(200).send('Feedback received');
        });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
