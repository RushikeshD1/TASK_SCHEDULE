
# Task Scheduler App with Express App with EJS, MongoDB, Cron Jobs, and Nodemailer

This is a simple Express.js application that uses EJS as the templating engine, connects to a MongoDB database using Mongoose, schedules tasks with `node-cron`, and sends emails using **Nodemailer**. The application serves dynamic content, handles user routes, and connects to a MongoDB database for persistent storage.

## Features

- **Express.js**: A minimalist web framework for Node.js.
- **EJS**: Embedded JavaScript templates for rendering HTML dynamically.
- **MongoDB**: NoSQL database for storing data.
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js.
- **node-cron**: Library for scheduling recurring tasks like background jobs.
- **Nodemailer**: A module for sending emails from your application.

## Prerequisites

Before running this project locally or deploying it, make sure you have the following installed:
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Vercel CLI (optional for deployment via Vercel)

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/your-repository-name.git
    cd your-repository-name
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up environment variables**:
   Create a `.env` file in the root of your project and add the following (replace with your actual values):
    ```env
    DATABASE_URL=mongodb://localhost:27017/your-database-name
    PORT=10000
    EMAIL_USER=your-email@gmail.com
    EMAIL_PASS=your-email-password-or-app-password
    ```

4. **Run the application**:
    ```bash
    npm start
    ```
    The app will run on `http://localhost:10000`.

## Cron Jobs

The project uses `node-cron` to schedule tasks (e.g., cleaning up the database, sending scheduled emails). Vercel doesn’t support traditional cron jobs, so if you need to run periodic tasks, you might want to use **external services** such as **GitHub Actions**, **AWS Lambda**, or **Heroku Scheduler**.

## Notes

- Ensure you have **MongoDB** running locally, or configure **MongoDB Atlas** for a cloud database connection.
- If you're running the project locally, make sure to replace the `DATABASE_URL` in your `.env` file with your local MongoDB URI.

