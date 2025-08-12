import nodemailer from 'nodemailer'

const sendNewUserEmail=async(email,name)=>{
try {
   const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
        user:process.env.MY_EMAIL,
        pass:process.env.MY_PASSWORD
      }
    });
    const mailOptions={
      from:`"Your Website - New Signup" <${process.env.EMAIL_USER}>`,
      to:process.env.MY_EMAIL,
      replyTo:email,
      subject:"🚀 New User Registered on Your Website",
      html:`
        <h2>New User Alert 🚀</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p>This user just created an account on your website.</p>
      `, 
    }

    await transporter.sendMail(mailOptions)
  
} catch (error) {
     console.error("Error sending new user email:", error);
}    
}
export {sendNewUserEmail}