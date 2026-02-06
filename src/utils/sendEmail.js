import nodemailer from "nodemailer";

const sendEmail = async (to, subject, text) => {
  try {

    
    let transporter;

    if (process.env.NODE_ENV === "production") {
      // Production: Gmail
      transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
    } else {
      // Development: Ethereal (fake email for testing)
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER || "test@example.com",
      to,
      subject,
      text,
    });

    // Development e email link console e print hobe
    if (process.env.NODE_ENV !== "production") {
      console.log("📧 Preview URL:", nodemailer.getTestMessageUrl(info));
    }

    return true;
  } catch (error) {
    console.error("Email send error:", error);
    return false;
  }
};

export default sendEmail;