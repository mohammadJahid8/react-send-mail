const nodemailer = require("nodemailer");
const emailTemplate = require("./emailTemplate");

module.exports = sendMail = async (name, subject, text, fileData, to) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  const emailTemplate = emailTemplate(name, text);

  const mailOptions = {
    from: process.env.USER,
    to,
    subject,
    html: emailTemplate,
    attachments: [fileData],
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
};
