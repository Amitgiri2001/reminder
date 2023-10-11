const express = require('express');
const mongoose = require('mongoose');
const path = require('path'); // Import the 'path' module
const app = express();
const port = process.env.PORT || 4000;

mongoose.connect('mongodb://localhost/reminderPro', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));

const reminderSchema = new mongoose.Schema({
    subject: String,
    description: String,
    date: Date,
    email: String,
    contactNo: String,
    smsNo: String,
    recur: [Number]
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

app.post('/add', async (req, res) => {
    try {
        const newReminder = new Reminder({
            subject: req.body.subject,
            description: req.body.description,
            date: req.body.date,
            email: req.body.email,
            contactNo: req.body.contactNo,
            smsNo: req.body.smsNo,
            recur: req.body.recur
        });

        await newReminder.save();
        res.redirect('/');
    } catch (err) {
        console.error('Error saving reminder:', err);
        res.status(500).send('Error saving reminder');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
