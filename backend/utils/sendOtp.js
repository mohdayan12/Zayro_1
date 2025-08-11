import nodemailer from 'nodemailer';

const sendOtp=async(email,otp)=>{
   const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
    user:process.env.MY_EMAIL,
    pass:process.env.MY_PASSWORD
    }
   });

   const mailOptions={
     from: `"ZAYRO" <${process.env.MY_EMAIL}>`,
    to: email,
    subject: ` [ZAYRO] Password Reset OTP - ${new Date().toLocaleTimeString()}` ,
    headers: {
    'X-Unique-Id': `${Date.now()}`, // break threading
  },
    html: `
     <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
  <div style="max-width: 600px; margin: auto; background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);">
    
    <h2 style="color: #333333;">Reset Your Password</h2>
    
    <p style="font-size: 16px; color: #555;">
      Hello <strong>User</strong>,
    </p>
    
    <p style="font-size: 16px; color: #555;">
      We received a request to reset your password for your <strong>ZAYRO</strong> account. Please use the OTP (One-Time Password) below to continue with resetting your password.
    </p>
    
    <div style="text-align: center; margin: 30px 0;">
      <div style="display: inline-block; background-color: #f0f0f0; padding: 20px 30px; border-radius: 6px;">
        <h1 style="margin: 0; color: #222; letter-spacing: 10px; font-size: 28px;">${otp}</h1>
      </div>
    </div>

    <p style="font-size: 16px; color: #555;">
      This OTP is valid for the next <strong>2 minutes</strong>. If you did not request a password reset, please ignore this message or contact our support team immediately.
    </p>
    
    <p style="font-size: 16px; color: #555;">
      Thank you,<br />
      <strong>The Zayro Team</strong><br />
   
    </p>
  </div>
</div>

    `
  };
     await transporter.sendMail(mailOptions);
   
   }
   export {sendOtp};

