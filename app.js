import express from 'express';

const app = express();
const PORT = 3000;

const guestbookUsers = [];

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(`${import.meta.dirname}/views/home.html`);
});

app.post('/submit', (req, res) => {
    const newEntry = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
        date: new Date().toLocaleString()
    };

    guestbookUsers.push(newEntry);

    res.sendFile(`${import.meta.dirname}/views/index.html`);
});

app.get('/admin', (req, res) => {
    res.json(guestbookUsers);
})

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});