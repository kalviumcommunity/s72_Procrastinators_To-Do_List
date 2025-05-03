# Setting Up MongoDB Atlas for Procrastinator's To-Do List

This guide will walk you through the process of setting up a MongoDB Atlas database for the Procrastinator's To-Do List project and inserting sample data.

## Step 1: Create a MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and click "Try Free"
2. Sign up with your preferred method (email, Google, etc.)
3. Complete the initial setup questions about your organization and project

## Step 2: Create a Cluster

1. Choose the "FREE" tier option
2. Select your preferred cloud provider (AWS, Google Cloud, or Azure)
3. Choose a region that's closest to you
4. Leave the default cluster tier (M0 Sandbox)
5. Give your cluster a name (e.g., "ProcrastinatorToDo")
6. Click "Create Cluster" (this may take a few minutes to provision)

## Step 3: Set Up Database Access

1. In the left sidebar, click on "Database Access" under SECURITY
2. Click "Add New Database User"
3. Choose "Password" for Authentication Method
4. Enter a username and password (remember these for your connection string)
5. Set user privileges to "Atlas admin" for simplicity in this project
6. Click "Add User"

## Step 4: Set Up Network Access

1. In the left sidebar, click on "Network Access" under SECURITY
2. Click "Add IP Address"
3. For development purposes, you can click "Allow Access from Anywhere" (not recommended for production)
4. Click "Confirm"

## Step 5: Connect to Your Cluster

1. In the left sidebar, click on "Databases" under DEPLOYMENT
2. Click "Connect" on your cluster
3. Choose "Connect your application"
4. Select "Node.js" and the appropriate version
5. Copy the connection string
6. Replace `<password>` with your database user's password
7. Replace `<dbname>` with "procrastinator_todo"

## Step 6: Set Up Environment Variables

1. In the project directory, copy the `env.example` file to a new file named `.env`:

   ```bash
   cp env.example .env
   ```

2. Open the `.env` file and update the `MONGO_URI` value with your MongoDB Atlas connection string:
   ```
   MONGO_URI=mongodb+srv://your_username:your_password@your_cluster.mongodb.net/procrastinator_todo?retryWrites=true&w=majority
   ```

## Step 7: Install Dependencies and Run the Script

1. Make sure you have Node.js installed on your system
2. Install the required dependencies by running:

```bash
npm install
```

3. Run the script to insert the sample data:

```bash
npm run seed
```

4. You should see console output confirming successful data insertion

## Step 8: Verify the Data

1. Go back to MongoDB Atlas
2. Click on "Collections" for your cluster
3. You should see the "procrastinator_todo" database with the following collections:

   - tasks
   - users
   - excuses
   - motivations
   - stats

4. Click on each collection to view the documents that were inserted

## Step 9: Connect Your Application

Update your application's connection string to match the one you used in the `.env` file.

## Step 10: Record a Demo Video

1. Open MongoDB Atlas in your browser
2. Make sure your username is visible in the top right corner
3. Navigate to your database and show each collection
4. Click into some documents to show their structure and data
5. Explain how the data model supports the functionality of the Procrastinator's To-Do List

## Data Collection Overview

- **Tasks Collection**: Stores all user tasks with fields like title, description, priority, deadlines, postponement tracking, and excuses.
- **Users Collection**: Stores user information including procrastination metrics and task statistics.
- **Excuses Collection**: Stores creative procrastination excuses with categories and usage metrics.
- **Motivations Collection**: Stores motivational messages to encourage task completion.
- **Stats Collection**: Stores aggregated procrastination statistics over time.

Congratulations! You now have a MongoDB Atlas database set up with sample data for your Procrastinator's To-Do List project.
