--This transaction adds a new album to the albums table by Tame impala.
--It also adds the new albums songs to the Song table.
--It then adds the cooresponding values into ArtistSongs
--These opreations must be grouped together since the new songs are directly related to the new album.

BEGIN;

INSERT INTO Album (ID, ArtistID, LabelID, title, releaseDate, length) VALUES
    ('AL5', 'A2', 'L2', 'Deadbeat', '2025-10-17', 55);

INSERT INTO Song VALUES
('S13', 'AL5', 'Ethereal Connection', 10000000, 7.53),
('S14', 'AL5', 'Oblivion', 8000000, 4.42),
('S15', 'AL5', 'My Old Ways', 12000000, 4.93);

INSERT INTO ArtistSongs VALUES
('A2', 'S13'),
('A2', 'S14'),
('A2', 'S15');

ROLLBACK;