--Requirement 1: Filtering and Sorting
--Finds songs with length greater than 4 minutes and sorts them in descending order by length
SELECT * FROM Song 
WHERE length > 4
ORDER BY length DESC;

--Requirement 2: INNER JOIN
--Lists all albums with the name of their record label
SELECT Album.title AS AlbumTitle, RecordLabel.name AS LabelName
FROM Album
INNER JOIN RecordLabel ON Album.LabelID = RecordLabel.ID;

--Requirement 3: LEFT JOIN
--Shows all users and their frieds ID, even users with no friends
SELECT User.name, Friends.friendID
FROM User 
LEFT JOIN Friends ON User.ID = Friends.userID;

--Requirement 4: Three-Table Join
--Lists all users, thier playlists, and each song from those playlists
SELECT User.name AS UserName, Playlist.name as PlaylistName, Song.title AS SongTitle
FROM User
JOIN Playlist ON User.ID = Playlist.userID
JOIN PlaylistSongs ON Playlist.ID = PlaylistSongs.playlistID
JOIN Song ON PlaylistSongs.songID = Song.ID;


--Requirement 5: Aggregate Query
--lists every album and the average length of its songs
SELECT Album.title AS albumTitle, AVG(Song.length) AS AverageSongLength
FROM Album
JOIN Song ON Album.ID = Song.albumID
GROUP BY Album.title;

--Requirement 6: GROUP BY and HAVING
--Lists all users with more than 1 friend
SELECT User.name, COUNT(Friends.userID) AS FriendCount
FROM User
JOIN Friends ON Friends.userID = user.ID
GROUP BY user.name
HAVING COUNT(Friends.userID) > 1;

--Requirement 7: Subquery
--List songs that have more streams than the average number of streams per song
SELECT title, streams
FROM Song 
WHERE streams > (
    SELECT AVG(streams)
    FROM Song
);

--Requirement 8: Set Operation
--Find songs that are in someones playlist, and marked as someones favorite
SELECT title
FROM Song
WHERE ID IN(
    SELECT songID FROM PlaylistSongs
    INTERSECT
    SELECT favoriteSongID FROM User
);


--Requirement 9: View
--Display all of Charlies friends
SELECT userName, friendName 
FROM UserFriends
WHERE userName = 'Charlie';