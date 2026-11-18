INSERT INTO RecordLabel VALUES
('L1', 'Steel City Dance Discs', 'Ireland'),
('L2', 'Modular Recordings', 'Australia'),
('L3', 'Partisan Records', 'New York'),
('L4', 'XL Recordings', 'London');

INSERT INTO Artist VALUES
('A1', 'KETTAMA', 1500000),
('A2', 'Tame Impala', 25000000),
('A3', 'Geese', 2000000),
('A4', 'Radiohead', 30000000);

INSERT INTO Album VALUES
('AL1', 'A1', 'L1', 'Archangel', '2025-10-03', 59.2),
('AL2', 'A2', 'L2', 'Innerspeaker', '2010-05-21', 53.3),
('AL3', 'A3', 'L3', 'Getting Killed', '2025-09-26', 45.6),
('AL4', 'A4', 'L4', 'In Rainbows', '2007-10-10', 42.7);

INSERT INTO Song VALUES
('S1', 'AL1', 'Yosemite', 10000000, 4.43),
('S2', 'AL1', 'Take Me', 8000000, 4.42),
('S3', 'AL1', 'Gotta Have It', 12000000, 4.42),
('S4', 'AL2', 'Solitude Is Bliss', 50000000, 3.92),
('S5', 'AL2', 'Alter Ego', 75000000, 4.78),
('S6', 'AL2', 'Lucidity', 45000000, 4.52),
('S7', 'AL3', 'Trinidad', 15000000, 3.73),
('S8', 'AL3', 'Taxes', 20000000, 3.5),
('S9', 'AL3', '100 Horses', 12000000, 3.77),
('S10', 'AL4', 'Weird Fishes/Arpeggi', 250000000, 5.3),
('S11', 'AL4', 'Nude', 200000000, 4.25),
('S12', 'AL4', 'Jigsaw Falling Into Place', 180000000, 4.15);

INSERT INTO ArtistSongs VALUES
('A1', 'S1'),
('A1', 'S2'),
('A1', 'S3'),
('A2', 'S4'),
('A2', 'S5'),
('A2', 'S6'),
('A3', 'S7'),
('A3', 'S8'),
('A3', 'S9'),
('A4', 'S10'),
('A4', 'S11'),
('A4', 'S12');

INSERT INTO User VALUES
('U1', 'Charlie', 2, 'S5', 'AL2', 'A2'),
('U2', 'Brenna', 2, 'S10', 'AL4', 'A4'),
('U3', 'Alex', 2, 'S1', 'AL1', 'A1'),
('U4', 'Rory', 0, 'S8', 'AL3', 'A3');

INSERT INTO Friends VALUES
('U1', 'U2'),
('U2', 'U1'),
('U1', 'U3'),
('U3', 'U1'),
('U2', 'U3'),
('U3', 'U2');

INSERT INTO Playlist VALUES
('P1', 'Charlie Favorites', 'U1'),
('P2', 'Brenna Mix', 'U2'),
('P3', 'Alex Electronic', 'U3'),
('P4', 'Rory Rock', 'U4');

INSERT INTO PlaylistSongs VALUES
('P1', 'S4'),
('P1', 'S5'),
('P2', 'S10'),
('P2', 'S11'),
('P3', 'S1'),
('P3', 'S2'),
('P4', 'S7'),
('P4', 'S12');