# MusicTracker Application

## Description

MusicTracker is a web application that I built using JavaScript, Node.js, Express, and SQLite. It allows users to browse music records, view related information, add and update artists, generate reports, and manage playlists.

## DBMS

The application connects to the SQLite database `MusicTracker.db`. All records are stored persistently in this database.

## Requirements

- Node.js
- npm
- Express
- sqlite3

## Setup Instructions

Software required: Sqlite 3, node.js, express

1. Open a terminal in the folder root
2. Run run_queries.sh to re-create database from schema.sql and insert_data.sql
   NOTE: this also runs queries.sql and transaction.sql

   `bash ./run_queries.sh` (Windows)

3. Install the required packages:

   `npm install`

4. Start the application:

   `node app.js`

5. Open a web browser and navigate to:

   `http://localhost:8080`

## Application Operations

1. **Browse Data:** View records from any database table using a dropdown menu.
2. **Display Related Data:** View songs along with their corresponding albums and artists.
3. **Add Artist:** Insert a new artist into the database.
4. **Add Album** Insert a new album into the database.
5. **Add Song** Insert a new song into the database.
6. **Update Artist:** Modify an existing artist's listener count.
7. **Artist Statistics:** View the total number of songs and streams for each artist.
8. **Add Song to Playlist:** Associate an existing song with an existing playlist.

All eight operations can be accessed through buttons on the application's homepage.
Each page has a link to reutrn home.

## Stopping the Application

Press `Ctrl + C` in the terminal to stop the server.

## Known Limitations

This application is designed to be run locally, requiring Node.js and SQLite. Seperate user accounts, user authentication, and online hosting are not supported.
