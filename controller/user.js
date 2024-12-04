const nodemailer = require("nodemailer")
const dotenv = require('dotenv')
const User = require('../models/jobs')
const cron = require('node-cron')

dotenv.config()

const data = async (req, res) => {

    try{

        const users = await User.find()   
         
        res.render('index.ejs', { users })
    }catch(e){
        console.log("Something went wrong");
        
    }
}

const createEmail = async (req, res) => {
    try{
        const {jobTitle, email, cronSchedule} = req.body

        const existingUser = await User.findOne({ email })

        if(existingUser) {
            return res.status(400).json({
                success : false,
                message : 'This e-mail is already taken'
            })
        }        

        const newJob = new User({
            jobTitle,
            email, 
            cronSchedule,
            status : 'scheduled'
        })

        

        await newJob.save()

        cron.schedule(cronSchedule, async () => {            

            try{

                if (newJob.status === 'completed') {
                    // Don't send email if the task has already been completed
                    console.log(`Task "${jobTitle}" already completed. Skipping execution.`);
                    return;
                }

                const subject = `Task Executed: ${jobTitle}`

                const text = `Hello, this is a reminder that the task "${jobTitle}" was executed successfully.`

                const htmlContent = `<p>Hello,</p><p>This is a reminder that the task <b>"${jobTitle}"</b> was executed successfully.</p>`

                await sendEmail(email, subject, text, htmlContent)

                newJob.status = 'completed'
                newJob.lastExecuted = new Date()

                await newJob.save()

                console.log(`Email sent to ${email} for task "${jobTitle}"`)


            }catch(e){
                newJob.status = 'failed'
                console.log('Error during task execution:', e)

            }

        })
        res.status(201).send(`User ${jobTitle} with email ${email} created!`);

    }catch(e){
        console.log(e);            
    }   
}

const transporter = nodemailer.createTransport({
    service : 'gmail',
    auth : {
        user : process.env.EMAIL_USER,
        pass : process.env.EMAIL_PASSWORD
    }
})

const sendEmail = async (toEmail, subject, text, htmlContent) => {
    try{
        const mailOption = {
            from : process.env.EMAIL_USER,
            to : toEmail,
            subject : subject,
            text : text,
            html : htmlContent
        }

        await transporter.sendMail(mailOption)
        console.log(`Email send to ${toEmail}`)

    }catch(e){
        console.log("email not sent", e)
    }
}


const userData = {
    data,
    createEmail,   
    sendEmail  
}

module.exports = userData;