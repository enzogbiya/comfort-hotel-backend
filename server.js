const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post("/api/send-email", async (req, res) => {
	const { name, email, phone, message } = req.body;

	try {
		let transporter = nodemailer.createTransport({
			host: "smtp.gmail.com",
			port: 465,
			auth: {
				user: "lipnitskiy.k@gmail.com", // replace with your email
				pass: "smfmtvzwmqyfvzbi", // replace with your password
			},
			authentication: "plain",
			enable_starttls_auto: true,
		});

		let info = await transporter.sendMail({
			from: `"${name}" <${email}>`,
			to: "lipnitskiy.kirill@gmail.com", // replace with recipient email
			subject: "New message from website",
			html: `
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>Phone: ${phone}</p>
        <p>Message: ${message}</p>
      `,
		});

		console.log(`Message sent: ${info.messageId}`);
		res.sendStatus(200);
	} catch (error) {
		console.error(error);
		res.sendStatus(500);
	}
});

// start server
app.listen(3001, () => {
	console.log("Server started on http://localhost:3001");
});
