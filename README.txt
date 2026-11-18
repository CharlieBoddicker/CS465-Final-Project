---DBMS Used---

I used Sqlite as my DBMS

---Setup Instructions---

Software required: Sqlite 3

Steps: 
    1. Open a terminal in a folder containing both sql files
    2. Open Sqlite and create a new database: COMMAND - sqlite3 MusicTracker.db
    2. Run schema.sql to create the schema: COMMAND - .read schema.sql
    3. Run insert_data.sql to insert data: COMMAND - .read insert_data.sql

    Note: foreign key enabling is done at the top of schema.sql

---View---

The view I created represents a users friends. 
It contains info on a users friends including the users name and id, as well as the friends id and name.
It uses the tables Friends and User.
This view will be useful as it directly connects users and friends, making access to a users freinds list easier and containing that friends name, not just their id.

---Index---

I created an index in the table song on the column title.
This will make it easier for the database to seach a song by just needing the name of it.

---Design Changes---
I made no design changes since Deliverable 2.

