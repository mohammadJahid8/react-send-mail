const nodemailer = require("nodemailer");

module.exports = sendMail = async (text, fileData, to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const mailOptions = {
    from: process.env.USER,
    to,
    subject: "Send mail from nodejs",
    text,
    attachments: [fileData],
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
};
