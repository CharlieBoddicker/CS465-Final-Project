#!/bin/bash
#Note: on my machine, i must explicitly call 'sqlite3.exe' within bash scripts.
#It may be because im on windows, but just calling 'sqlite3' in this script didnt work for me.

DB="MusicTracker.db"

echo "Recreating database..."

rm -f "$DB"

sqlite3.exe "$DB" < schema.sql

sqlite3.exe "$DB" < insert_data.sql

echo
echo "Running queries..."

sqlite3.exe -header -column "$DB" < "queries.sql"

echo
echo "Running transaction..."

sqlite3.exe "$DB" < transaction.sql

echo
echo "Done."