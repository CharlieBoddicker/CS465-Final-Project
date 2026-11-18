# MusicTracker Application

## Description

MusicTracker is a web application that I built using JavaScript, Node.js, Express, and SQLite. It allows users to browse music records, view related information, add and update artists, generate reports, and manage playlists.

## Requirements

- Node.js
- npm
- Express
- sqlite3

## Setup Instructions

1. Download the project files.
2. Open a terminal in the project directory.
3. Install the required packages:

   `npm install`

4. Make sure `MusicTracker.db` is located in the same directory as `app.js`.
5. Start the application:

   `node app.js`

6. Open a web browser and navigate to:

   `http://localhost:8080`

## Application Operations

1. **Browse Data:** View records from any database table using a dropdown menu.
2. **Display Related Data:** View songs along with their corresponding albums and artists.
3. **Add Artist:** Insert a new artist into the database.
4. **Update Artist:** Modify an existing artist's listener count.
5. **Artist Statistics:** View the total number of songs and streams for each artist.
6. **Add Song to Playlist:** Associate an existing song with an existing playlist.

All six operations can be accessed through buttons on the application's homepage.

## Database

The application connects to the SQLite database `MusicTracker.db`. All records are stored persistently in this database. No external database server or credentials are required.

## Stopping the Application

Press `Ctrl + C` in the terminal to stop the server.
