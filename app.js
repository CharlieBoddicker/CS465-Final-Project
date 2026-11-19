const express = require("express");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.urlencoded({ extended: true }));
const PORT = 8080;
const db = new sqlite3.Database("MusicTracker.db");

db.run("PRAGMA foreign_keys = ON");

const tables = [
  "RecordLabel",
  "Artist",
  "Album",
  "Song",
  "ArtistSongs",
  "User",
  "Friends",
  "Playlist",
  "PlaylistSongs",
];

function escapeHTML(value) {
  return String(value ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[c],
  );
}

app.use((req, res, next) => {
  const originalSend = res.send.bind(res);

  res.send = (html) => {
    if (req.method === "GET" && req.path !== "/" && typeof html === "string") {
      const homeLink = `
        <p style="margin-top: 25px;">
          <a href="/">← Return Home</a>
        </p>
      `;

      if (html.includes("</body>")) {
        html = html.replace("</body>", homeLink + "</body>");
      } else {
        html += homeLink;
      }
    }

    return originalSend(html);
  };

  next();
});

app.get("/", (req, res) => {
  res.send(`
    <h1>Music Tracker</h1>
    <h2>Welcome to Music Tracker!</h2>
    <p>Select an operation below:</p>

    <button onclick="window.location.href='/browse'">
      Browse Database
    </button>

    <button onclick="window.location.href='/related'">
      Display Related Data
    </button>

    <button onclick="window.location.href='/artists/add'">
      Add Artist
    </button>

    <button onclick="window.location.href='/albums/add'">
      Add Album
    </button>

    <button onclick="window.location.href='/songs/add'">
      Add Song
    </button>

    <button onclick="window.location.href='/artists/update'">
      Update Artist
    </button>

    <button onclick="window.location.href='/report'">
      Artist Statistics Report
    </button>

    <button onclick="window.location.href='/playlists/add-song'">
      Add Song to Playlist
    </button>
  `);
});

app.get("/browse", (req, res) => {
  const table = tables.includes(req.query.table) ? req.query.table : "Song";

  db.all(`SELECT * FROM ${table}`, [], (err, rows) => {
    if (err) return res.send(err.message);

    let html = `
      <h1>Music Tracker</h1>
      <form>
        <select name="table" onchange="this.form.submit()">
          ${tables
            .map(
              (t) => `
            <option value="${t}" ${t === table ? "selected" : ""}>
              ${t}
            </option>`,
            )
            .join("")}
        </select>
      </form>
      <h2>${table}</h2>
      <table border="1" cellpadding="8">`;

    if (rows.length > 0) {
      html += "<tr>";
      Object.keys(rows[0]).forEach((col) => {
        html += `<th>${col}</th>`;
      });
      html += "</tr>";

      rows.forEach((row) => {
        html += "<tr>";
        Object.values(row).forEach((value) => {
          html += `<td>${value ?? ""}</td>`;
        });
        html += "</tr>";
      });
    }

    html += "</table>";
    res.send(html);
  });
});

app.get("/related", (req, res) => {
  db.all(
    `SELECT Song.title AS song, Album.title AS album, Artist.name AS artist FROM Song 
          JOIN Album ON Song.albumID = Album.ID
          JOIN Artist ON Album.ArtistID = Artist.ID`,
    [],
    (err, rows) => {
      if (err) return res.send(err.message);

      let html = `
      <h1>Songs with Albums and Artists</h1>
      <table border="1" cellpadding="8">
        <tr>
          <th>Song</th>
          <th>Album</th>
          <th>Artist</th>
        </tr>`;

      rows.forEach((row) => {
        html += `
        <tr>
          <td>${row.song}</td>
          <td>${row.album}</td>
          <td>${row.artist}</td>
        </tr>`;
      });

      html += "</table>";
      res.send(html);
    },
  );
});

app.get("/artists/add", (req, res) => {
  res.send(`
    <h1>Add Artist</h1>
    <form method="POST" action="/artists">
      Artist ID: <input name="id" required>
      Artist Name: <input name="name" required>
      <button type="submit">Add Artist</button>
    </form>
  `);
});

app.post("/artists", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;

  if (
    typeof id !== "string" ||
    typeof name !== "string" ||
    !id.trim() ||
    !name.trim()
  ) {
    return res.status(400).send("ID and name are required");
  }

  const sql = "INSERT INTO Artist (ID, name) VALUES (?, ?)";

  db.run(sql, [id.trim(), name.trim()], function (err) {
    if (err) {
      if (err.message.includes("UNIQUE constraint failed")) {
        return res.status(400).send("Artist ID already exists");
      }
      return res.status(500).send("Could not add artist");
    }

    res.redirect("/browse?table=Artist");
  });
});

app.get("/artists/update", (req, res) => {
  res.send(`
    <h1>Update Artist Listeners</h1>
    <form method="POST" action="/artists/update">
      Artist ID: <input name="id" required>
      Listeners: <input type="number" name="listeners" min="0" required>
      <button type="submit">Update Artist</button>
    </form>
  `);
});

app.get("/artists/update", (req, res) => {
  res.send(`
    <h1>Update Artist Listeners</h1>
    <form method="POST" action="/artists/update">
      Artist ID: <input name="id" required>
      Listeners: <input type="number" name="listeners" min="0" required>
      <button type="submit">Update Artist</button>
    </form>
  `);
});

app.post("/artists/update", (req, res) => {
  const id = req.body.id;
  const input = req.body.listeners;

  if (
    typeof id !== "string" ||
    !id.trim() ||
    typeof input !== "string" ||
    !/^\d+$/.test(input.trim())
  ) {
    return res.status(400).send("Valid ID and listener count required");
  }

  const listeners = Number(input);

  if (!Number.isSafeInteger(listeners)) {
    return res.status(400).send("Invalid listener count");
  }

  const sql = "UPDATE Artist SET listeners = ? WHERE ID = ?";

  db.run(sql, [listeners, id.trim()], function (err) {
    if (err) return res.status(500).send("Could not update artist");

    if (this.changes === 0) {
      return res.status(404).send("Artist not found");
    }

    res.redirect("/browse?table=Artist");
  });
});

app.get("/report", (req, res) => {
  db.all(
    `
    SELECT Artist.name AS artist,
           COUNT(Song.ID) AS songs,
           COALESCE(SUM(Song.streams), 0) AS streams
    FROM Artist
    LEFT JOIN Album ON Artist.ID = Album.ArtistID
    LEFT JOIN Song ON Album.ID = Song.albumID
    GROUP BY Artist.ID, Artist.name
  `,
    [],
    (err, rows) => {
      if (err) return res.send(err.message);

      let html = `
      <h1>Artist Statistics</h1>
      <table border="1" cellpadding="8">
        <tr>
          <th>Artist</th>
          <th>Total Songs</th>
          <th>Total Streams</th>
        </tr>
    `;

      rows.forEach((row) => {
        html += `
        <tr>
          <td>${escapeHTML(row.artist)}</td>
          <td>${row.songs}</td>
          <td>${row.streams}</td>
        </tr>`;
      });

      html += "</table>";
      res.send(html);
    },
  );
});

app.get("/playlists/add-song", (req, res) => {
  db.all("SELECT ID, name FROM Playlist", [], (err, playlists) => {
    if (err) return res.send(err.message);

    db.all("SELECT ID, title FROM Song", [], (err, songs) => {
      if (err) return res.send(err.message);

      res.send(`
        <h1>Add Song to Playlist</h1>
        <form method="POST" action="/playlists/add-song">
          Playlist:
          <select name="playlistID">
            ${playlists
              .map(
                (p) =>
                  `<option value="${escapeHTML(p.ID)}">${escapeHTML(p.name)}</option>`,
              )
              .join("")}
          </select>

          Song:
          <select name="songID">
            ${songs
              .map(
                (s) =>
                  `<option value="${escapeHTML(s.ID)}">${escapeHTML(s.title)}</option>`,
              )
              .join("")}
          </select>

          <button type="submit">Add Song</button>
        </form>
      `);
    });
  });
});

app.post("/playlists/add-song", (req, res) => {
  const playlistID = req.body.playlistID;
  const songID = req.body.songID;

  if (
    typeof playlistID !== "string" ||
    !playlistID.trim() ||
    typeof songID !== "string" ||
    !songID.trim()
  ) {
    return res.status(400).send("Playlist and song are required");
  }

  db.get(
    "SELECT ID FROM Playlist WHERE ID = ?",
    [playlistID],
    (err, playlist) => {
      if (err) return res.status(500).send("Database error");
      if (!playlist) return res.status(400).send("Playlist not found");

      db.get("SELECT ID FROM Song WHERE ID = ?", [songID], (err, song) => {
        if (err) return res.status(500).send("Database error");
        if (!song) return res.status(400).send("Song not found");

        const sql =
          "INSERT INTO PlaylistSongs (playlistID, songID) VALUES (?, ?)";

        db.run(sql, [playlistID, songID], function (err) {
          if (err) {
            if (err.message.includes("UNIQUE constraint failed")) {
              return res.status(400).send("Song already in playlist");
            }
            return res.status(500).send("Could not add song");
          }

          res.redirect("/browse?table=PlaylistSongs");
        });
      });
    },
  );
});

app.get("/albums/add", (req, res) => {
  db.all("SELECT ID, name FROM Artist ORDER BY name", [], (err, artists) => {
    if (err) return res.status(500).send("Database error");

    db.all(
      "SELECT ID, name FROM RecordLabel ORDER BY name",
      [],
      (err, labels) => {
        if (err) return res.status(500).send("Database error");

        res.send(`
        <h1>Add Album</h1>
        <form method="POST" action="/albums/add">
          Album ID: <input name="id" required><br><br>
          Title: <input name="title" required><br><br>

          Artist:
          <select name="artistID" required>
            ${artists
              .map(
                (a) =>
                  `<option value="${escapeHTML(a.ID)}">${escapeHTML(a.name)}</option>`,
              )
              .join("")}
          </select><br><br>

          Record Label:
          <select name="labelID" required>
            ${labels
              .map(
                (l) =>
                  `<option value="${escapeHTML(l.ID)}">${escapeHTML(l.name)}</option>`,
              )
              .join("")}
          </select><br><br>

          Release Date: <input type="date" name="releaseDate" required><br><br>
          Length (minutes): <input type="number" name="length" min="0.01" step="any" required><br><br>

          <button type="submit">Add Album</button>
        </form>
        <p><a href="/">Home</a></p>
      `);
      },
    );
  });
});

app.post("/albums/add", (req, res) => {
  const { id, title, artistID, labelID, releaseDate, length } = req.body;

  if (
    [id, title, artistID, labelID, releaseDate, length].some(
      (value) => typeof value !== "string" || !value.trim(),
    )
  ) {
    return res.status(400).send("All fields are required");
  }

  const albumLength = Number(length);
  if (
    !Number.isFinite(albumLength) ||
    albumLength <= 0 ||
    !/^\d{4}-\d{2}-\d{2}$/.test(releaseDate)
  ) {
    return res.status(400).send("Invalid length or release date");
  }

  const sql = `
    INSERT INTO Album (ID, ArtistID, LabelID, title, releaseDate, length)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  db.run(
    sql,
    [
      id.trim(),
      artistID.trim(),
      labelID.trim(),
      title.trim(),
      releaseDate,
      albumLength,
    ],
    function (err) {
      if (err) {
        return res
          .status(400)
          .send("Album ID already exists or invalid album data");
      }
      res.redirect("/browse?table=Album");
    },
  );
});

app.get("/songs/add", (req, res) => {
  db.all(
    `
    SELECT Album.ID, Album.title, Artist.name AS artist
    FROM Album
    JOIN Artist ON Album.ArtistID = Artist.ID
    ORDER BY Album.title
  `,
    [],
    (err, albums) => {
      if (err) return res.status(500).send("Database error");

      res.send(`
      <h1>Add Song</h1>
      <form method="POST" action="/songs/add">
        Song ID: <input name="id" required><br><br>
        Title: <input name="title" required><br><br>

        Album:
        <select name="albumID" required>
          ${albums
            .map(
              (a) =>
                `<option value="${escapeHTML(a.ID)}">${escapeHTML(a.title)} - ${escapeHTML(a.artist)}</option>`,
            )
            .join("")}
        </select><br><br>

        Streams: <input type="number" name="streams" min="0" step="1" value="0" required><br><br>
        Length (minutes): <input type="number" name="length" min="0.01" step="any" required><br><br>

        <button type="submit">Add Song</button>
      </form>
      <p><a href="/">Home</a></p>
    `);
    },
  );
});

app.post("/songs/add", (req, res) => {
  const { id, title, albumID, streams, length } = req.body;

  if (
    [id, title, albumID, streams, length].some(
      (value) => typeof value !== "string" || !value.trim(),
    )
  ) {
    return res.status(400).send("All fields are required");
  }

  const streamCount = Number(streams);
  const songLength = Number(length);

  if (
    !Number.isSafeInteger(streamCount) ||
    streamCount < 0 ||
    !Number.isFinite(songLength) ||
    songLength <= 0
  ) {
    return res.status(400).send("Invalid streams or song length");
  }

  db.get(
    "SELECT ArtistID FROM Album WHERE ID = ?",
    [albumID.trim()],
    (err, album) => {
      if (err) return res.status(500).send("Database error");
      if (!album || !album.ArtistID) {
        return res.status(400).send("Album not found or has no artist");
      }

      const sql = `
      INSERT INTO Song (ID, albumID, title, streams, length)
      VALUES (?, ?, ?, ?, ?)
    `;

      db.run(
        sql,
        [id.trim(), albumID.trim(), title.trim(), streamCount, songLength],
        function (err) {
          if (err) {
            return res
              .status(400)
              .send("Song ID already exists or invalid song data");
          }

          db.run(
            "INSERT INTO ArtistSongs (artistID, songID) VALUES (?, ?)",
            [album.ArtistID, id.trim()],
            function (err) {
              if (err) {
                return db.run(
                  "DELETE FROM Song WHERE ID = ?",
                  [id.trim()],
                  () => res.status(500).send("Could not link song to artist"),
                );
              }

              res.redirect("/browse?table=Song");
            },
          );
        },
      );
    },
  );
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
