const nodemailer = require("nodemailer");

async function sendMail(text, file, to) {
  const transporter = nodemailer.createTransport({
    service: "gmaill",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to: "jahid.dev8@gmail.com",
    subject: "Send mail from nodejs",
    text: "this is an test mail",
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
}
