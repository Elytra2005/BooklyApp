require('dotenv').config({ path: '../.env' });
const express = require('express');
const port = 5000;
const app = express();
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: String(process.env.EMAIL_USER),
    pass: String(process.env.EMAIL_PASS),
  },
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: 'Too many requests from this IP, please try again later.',
});

app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false, 
}));


app.post('/retreive', limiter, (req, res) => {
    const {Name, Email, date, time} = req.body;

    if (!Name || !Email || !date || !time) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const adminEmail = `
        <div> 
          <h1> New submission </h1>
          <p> Name: ${Name} </p>
          <p> Email: ${Email} </p>
          <p> Date: ${date} at ${time} </p>
        </div>
    `;

    const userEmail = `
        <div> 
          <h1> Thank you for your comfirmation </h1>
          <p> we have booked your appointment for ${date} at ${time} </p>
        </div>
    `;

    const adminEmailOptions = {
        from: Email,
        to: "mahmoudelhajj005@gmail.com",
        subject:  `New Appointment!`,
        html: adminEmail
    };

    const userEmailOptions = {
        from: "mahmoudelhajj005@gmail.com",
        to: Email,
        subject:  `Thank you for booking with us`,
        html: userEmail
    };


    transporter.sendMail(adminEmailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email to admin:', error);
            return res.status(500).json({ error: 'Failed to send email to admin.' });
        }

        console.log('Admin email sent:', info.response);

        transporter.sendMail(userEmailOptions, (error, info) => {
            if (error) {
                console.error('Error sending acknowledgment email to user:', error);
                return res.status(500).json({ error: 'Failed to send acknowledgment email.' });
            }

            console.log('Acknowledgment email sent:', info.response);
            res.status(200).json({ success: true, message: 'Emails sent successfully!' });
        });
    });

});



app.listen(port, ()=> {
    console.log(`Server running on port ${port}`);
})


// error log: the program needs to have a secure api so that no unlogged in user can acess our api and call it.
// So far ive set up a idToken (ai made it ngl and im gonna re read it and see how i can impliment it to the backend)