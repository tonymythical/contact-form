import express from 'express';

const app = express();
const PORT = 3009;

const guestbookUsers = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit', (req, res) => {
    const newEntry = {
        firstName: req.body['first-name'], 
        lastName: req.body['last-name'],
        email: req.body.email,
        linkedIn: req.body.linkedin,
        howWeMet: req.body.meet,
        otherSpecify: req.body.other,
        mailingList: req.body['mailing-list'] === 'on',
        format: req.body.format,
        date: new Date().toLocaleString()
    };

    guestbookUsers.push(newEntry);

    res.sendFile(`${import.meta.dirname}/views/confirmation.html`);
});

app.get('/admin', (req, res) => {
    res.json(guestbookUsers);
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});