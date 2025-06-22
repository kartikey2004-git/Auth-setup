import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
})

export default transporter


// in this transporter , we need to add SMTP port , host and authentication details/ credentials like password and email


// we can use any SMTP provider and we can provide host and credentials from it 


// Brevo SMTP here we use but we can use also with any SMTP provider , nodemailer is compatible with all SMTP providers

