import nodemailer from 'nodemailer';
import User from '@/models/usermodel';
import bycryptjs from "bcryptjs"
export const sendEmail = async({email,emailType,userId}:any)=>{

    try {

        const hashedToken = await bycryptjs.hash(userId.toString(),10);
      
      if(emailType==='VERIFY'){
        await User.findByIdAndUpdate(userId,
          {verifyToken:hashedToken,verifyTokenExpiry:Date.now()+3600000}
        )
      }else if(emailType==="RESET"){
      await User.findByIdAndUpdate(userId,
        {
          forgotPasswordToken:hashedToken,
          forgotPasswordTokenExpiry:Date.now()+3600000
        }
      )
      }
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "52bceb0a7cea54",
          pass: "05aab6124ca679"
        }
      });

          const mailOption ={
            from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', 
            to: email, 
            subject: emailType==='VERIFY'?"VERIFY YOUR EMAIL":"Reset your password", 
            html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
            emailType==="VERIFY"?"verify your eamil":"reset your password"
            } 
            or copy and paste the link below in your browser
            
            <br>
            ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`, 
          }

         const mailResponse =  await transport.sendMail(mailOption);
         return mailResponse;
    } catch (error:any) {
        throw new Error(error.message)
    }
}