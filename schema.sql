PRAGMA foreign_keys = ON;
DROP VIEW IF EXISTS UserFriends;
DROP TABLE IF EXISTS PlaylistSongs;
DROP TABLE IF EXISTS ArtistSongs;
DROP TABLE IF EXISTS Friends;
DROP TABLE IF EXISTS Playlist;
DROP TABLE IF EXISTS User;
DROP TABLE IF EXISTS Song;
DROP TABLE IF EXISTS Album;
DROP TABLE IF EXISTS RecordLabel;
DROP TABLE IF EXISTS Artist;

CREATE TABLE User (
    ID TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    friendCount INT CHECK (friendCount >= 0),
    favoriteSongID TEXT,
    FavoriteAlbumID TEXT,
    FavoriteArtistID TEXT,
    FOREIGN KEY (favoriteSongID) REFERENCES Song(ID),
    FOREIGN KEY (FavoriteAlbumID) REFERENCES Album(ID),
    FOREIGN KEY (FavoriteArtistID) REFERENCES Artist(ID)
);

CREATE TABLE Friends (
    userID TEXT NOT NULL,
    friendID TEXT NOT NULL,
    PRIMARY KEY (userID, friendID),
    FOREIGN KEY (userID) REFERENCES User(ID),
    FOREIGN KEY (friendID) REFERENCES User(ID)
);

CREATE TABLE Playlist (
    ID TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    userID TEXT NOT NULL,
    FOREIGN KEY (userID) REFERENCES User(ID)
);

CREATE TABLE PlaylistSongs (
    playlistID TEXT NOT NULL,
    songID TEXT NOT NULL,
    PRIMARY KEY (playlistID, songID),
    FOREIGN KEY (playlistID) REFERENCES Playlist(ID),
    FOREIGN KEY (songID) REFERENCES Song(ID)
);

CREATE TABLE Artist (
    ID TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    listeners INT CHECK (listeners >= 0)
);

CREATE TABLE ArtistSongs (
    artistID TEXT NOT NULL,
    songID TEXT NOT NULL,
    PRIMARY KEY (artistID, songID),
    FOREIGN KEY (artistID) REFERENCES Artist(ID),
    FOREIGN KEY (songID) REFERENCES Song(ID)
);

CREATE TABLE Song (
    ID TEXT PRIMARY KEY,
    albumID TEXT,
    title TEXT NOT NULL,
    streams INT CHECK (streams >= 0),
    length REAL CHECK (length > 0),
    FOREIGN KEY (albumID) REFERENCES Album(ID)
);

CREATE TABLE Album (
    ID TEXT PRIMARY KEY,
    ArtistID TEXT,
    LabelID TEXT,
    title TEXT NOT NULL,
    releaseDate TEXT,
    length REAL CHECK (length > 0),
    FOREIGN KEY (ArtistID) REFERENCES Artist(ID),
    FOREIGN KEY (LabelID) REFERENCES RecordLabel(ID)
);

CREATE TABLE RecordLabel (
    ID TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    location TEXT
);

CREATE VIEW  UserFriends AS
SELECT u.ID AS userID, u.name AS userName, f.friendID AS friendID, uf.name AS friendName
FROM User u
JOIN Friends f ON u.ID = f.userID
JOIN User uf ON f.friendID = uf.ID;

CREATE INDEX inx_song_title ON Song(title);




