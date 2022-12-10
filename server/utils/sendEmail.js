const nodemailer = require('nodemailer');

module.exports = async(email, sub, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: Number(process.env.EMAIL_PORT),
            secure: Boolean(process.env.SECURE),
            auth: {
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject: sub,
            text: text
        });

        console.log(`Email sent to ${email}`);
    } catch (error) {
        console.log("Error sending email", error);
    }
}