# Task Management System

The Task Management System is a web application for managing projects and tasks. Users can create, update, and delete both projects and tasks. There are two roles:
- **admin**: who has full access.
- **user**: who can view projects and manage tasks.

## Installation

1. You'll need a MongoDB database (local or cloud).
    - In your AWS Cognito account, create a new **user pool**. After that, add the attribute `custom:userType` and give it read rights.
    - Create 2 users: 1 admin and 1 regular user.
    
2. Create an `.env` file and fill in the following:
    ```bash
    MONGO_URI=<db>:<port>/task-management
    COGNITO_USER_POOL_ID=<your cognito user pool id>
    COGNITO_CLIENT_ID=<your cognito client id>
    ```

3. Run the command:
    ```bash
    npm install
    ```

4. To start the application, run:
    ```bash
    npm run start
    ```

5. To run tests, use:
    ```bash
    npm test
    ```