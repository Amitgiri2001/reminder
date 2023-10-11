const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/reminderPro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

const reminderSchema = new mongoose.Schema({
    text: String,
    date: Date
});

const Reminder = mongoose.model('Reminder', reminderSchema);

app.get('/', async (req, res) => {
    try {
        const reminders = await Reminder.find({});
        res.render('index', { reminders });
    } catch (err) {
        console.log(err);
    }
});


app.post('/add', (req, res) => {
    const newReminder = new Reminder({
        text: req.body.text,
        date: req.body.date
    });
    newReminder.save();
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
