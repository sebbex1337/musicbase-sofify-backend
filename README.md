# MusicBase Sofify - Node.js Backend

MusicBase Sofify is a Node.js backend project that provides the server-side functionality for managing a music database. This project is built using Node.js and utilizes popular npm packages like Express, CORS, MySQL2, and Dotenv to create a robust and flexible backend for your music application.
Features

    Express.js: A fast, unopinionated, and minimalist web framework for Node.js that makes it easy to build RESTful APIs.

    CORS: Cross-Origin Resource Sharing middleware for enabling secure cross-origin requests.

    MySQL2: A MySQL library for Node.js that enables you to interact with a MySQL database seamlessly.

    Dotenv: A zero-dependency module for loading environment variables from a .env file into process.env.

## Prerequisites

Before you begin, ensure you have met the following requirements:

    Node.js installed on your local machine.

    A MySQL database for storing your music data.

    Create a .env file in the project root directory and set the necessary environment variables (e.g., database credentials).

## Installation

Clone this repository to your local machine:

```bash
git clone https://github.com/sebbex1337/musicbase-sofify-backend.git
```

Navigate to the project directory:

```bash
cd musicbase-sofify-backend
```
Install the project dependencies using npm:

```bash
npm install
```
## Configuration

Create a .env file in the project root directory with the following environment variables:

```bash
    DB_HOST=your-database-host
    DB_USER=your-database-username
    DB_PASSWORD=your-database-password
    DB_DATABASE=your-database-name
    PORT=3333 # Optional: Set the port for your server (default is 3333).
```
Update the values in the .env file with your database connection details.

## Usage

Start the server:

```bash
npm start
```
Your MusicBase Sofify backend server will be running at http://localhost:3333 (or the port you specified in your .env file).

You can now make API requests to interact with your music database.

### API Endpoints

- GET /songs: Get a list of all songs.
- GET /songs/:id: Get details of a specific song by ID.
- POST /songs: Add a new song to the database.
- PUT /songs/:id: Update an existing song by ID.
- DELETE /songs/:id: Delete a song from the database by ID.
