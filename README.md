# Tech Blog

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

Tech Blog is a web application that allows users to create, edit, and delete blog posts, as well as comment on posts. It features user authentication, a dashboard for managing posts, and a clean, user-friendly interface.

## Features

- User authentication (signup, login, logout)
- Create, edit, and delete blog posts
- Comment on posts
- User dashboard for managing posts and comments
- Responsive design

## Tech Stack

- **Frontend:** HTML, CSS, JavaScript, Handlebars, Bootstrap
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL, Sequelize ORM
- **Authentication:** Express-Session, Bcrypt
- **Deployment:** Heroku, Docker (optional)

## Installation

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone https://github.com/your-username/tech-blog.git
cd tech-blog
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a .env file in the root directory and add the following variables:

```bash
DB_NAME=tech_blog_db
DB_USER=postgres
DB_PASSWORD='7758'
DB_HOST=localhost
DB_PORT=5432
SESSION_SECRET='163f4bea10323fc8047e19ad8ccaa0383b1073c43080c053b0ac957e8af02689b4410d5cc6d4984ff91411ca7ecfc84c4f9f8f9816e5bd3295d6667462039f4d'
```

### Set Up the Database

Create a PostgreSQL database using your preferred method.
Run the Sequelize migrations to set up the database schema:

```bash
npx sequelize-cli db:migrate
```

### Start the Application

```bash
npm start
```

The application will be running on http://localhost:3001

## Usage

### Signup and Login

- Navigate to [http://localhost:3001/signup](http://localhost:3001/signup) to create a new account.
- Navigate to [http://localhost:3001/login](http://localhost:3001/login) to log in with your credentials.

### Dashboard

Once logged in, you will be redirected to the dashboard where you can:

- Create new blog posts
- Edit or delete existing posts
- Comment on posts

### Logout

Click the "Logout" button in the navigation bar to log out and return to the home page.

## API Endpoints

### Authentication

- **POST** `/signup` - Create a new user
- **POST** `/login` - Authenticate a user
- **GET** `/logout` - Log out the current user

### Posts

- **POST** `/api/posts` - Create a new post
- **GET** `/api/posts` - Get all posts
- **GET** `/api/posts/:postId` - Get a single post by ID
- **PUT** `/api/posts/:postId` - Update a post by ID
- **DELETE** `/api/posts/:postId` - Delete a post by ID

### Comments

- **POST** `/api/comments` - Create a new comment
- **GET** `/api/comments/:postId` - Get all comments for a post

## Contributing

We welcome contributions to improve this project! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature-name`)
5. Open a Pull Request

Please ensure your code adheres to our coding standards and passes all tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or feedback, please reach out to:

- **Email:** austintallen07@gmail.com
- **GitHub:** [austintylerallen](https://github.com/austintylerallen)
