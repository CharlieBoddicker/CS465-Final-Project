param([string]$DB = "MusicTracker.db")

Write-Output "Recreating database..."

Remove-Item $DB -ErrorAction SilentlyContinue

sqlite3.exe $DB ".read schema.sql"

sqlite3.exe $DB  ".read insert_data.sql"

Write-Output "Running queries..."
Write-Output "Queries will fail, I have not created this file for the final project yet." 
Write-Output "For now, select all from songs table to ensure schema and insert data worked"

sqlite3.exe $DB "SELECT * FROM Song"

# sqlite3 -header -column $DB ".read queries.sql"

Write-Output "Running transaction..."

Write-Output "Transaction will fail, I have not created this file for the final project yet. - skip for now"
Write-Output "NOTE: I am working in my final project dir and db"

# sqlite3 -bail $DB ".read transaction.sql"

Write-Output "Done."