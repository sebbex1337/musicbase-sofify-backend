import express from "express";
import cors from "cors";
import connection from "./database.js";

const app = express();
const port = 3333;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

//  PORT LISTNER - to see if there is connection
app.listen(port, () => {
	console.log(`Musicbase is running on http://localhost:${port}`);
});

// Server is running
app.get("/", (req, res) => {
	res.send("Musicbase is up and running");
});

// ------------------------------ //
// ------ READ DATA (FETCH) ----- //
// ------------------------------ //

// READ ARTISTS (FETCH DATA)
app.get("/artists", (req, res) => {
	const query = "SELECT * FROM `artists`";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// READ ALBUMS (FETCH DATA)
app.get("/albums", (req, res) => {
	const query = "SELECT * FROM `albums`";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// READ TRACK (FETCH DATA)
app.get("/tracks", (req, res) => {
	const query = "SELECT * FROM `tracks`";

	connection.query(query, function (error, results, fields) {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// -------------------------------- //
// ------ READ CROSS TABELS  ------ //
// -------------------------------- //

// READ ALL ALBUMS FROM ARTISTS BY ID
app.get("/artists_albums/:id", (req, res) => {
	const id = req.params.id;
	const query =
		"SELECT * FROM artists INNER JOIN artists_albums ON artists.id = artists_albums.artistID INNER JOIN albums ON artists_albums.albumID = albums.id WHERE artists.id=?;";
	const values = [id];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// READ ALL TRACKS FROM ARTISTS BY ID
app.get("/artists_tracks/:id", (req, res) => {
	const id = req.params.id;
	const query =
		"SELECT * FROM artists INNER JOIN artists_tracks ON artists.id = artists_tracks.artistID INNER JOIN tracks ON artists_tracks.trackID = tracks.id WHERE artists.id = ?;";
	const values = [id];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// READ ALL TRACKS FROM ALBUMS BY ID
app.get("/tracks_albums/:id", (req, res) => {
	const id = req.params.id;
	const query = "SELECT * FROM albums INNER JOIN tracks_albums ON albums.id = tracks_albums.albumID INNER JOIN tracks ON tracks_albums.trackID = tracks.id WHERE albums.id=? ";
	const values = [id];

	connection.query(query, values, (err, results, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.json(results);
		}
	});
});

// ------------------------ //
// -------- POST NEW ------ //
// ------------------------ //

// POST NEW ARTIST
app.post("/artists", (req, res) => {
	const artist = req.body;
	const query = "INSERT INTO artists(name, image, website) values(?,?,?);";
	const values = [artist.name, artist.image, artist.website];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
			console.log(fields);
		}
	});
});

// POST NEW TRACK
app.post("/tracks", (req, res) => {
	const track = req.body;
	const query = "INSERT INTO tracks(name, duration) values(?,?);";
	const values = [track.name, track.duration];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// POST NEW ALBUM
app.post("/albums", (req, res) => {
	const album = req.body;
	const query = "INSERT INTO albums(name, releaseDate, image) values(?,?,?);";
	const values = [album.name, album.releaseDate, album.image];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// ------------------------- //
// ------ UPDATE BY ID ----- //
// ------------------------- //

// UPDATE ARTISTS BY ID
app.put("/artists/:id", (req, res) => {
	const id = req.params.id;
	const artist = req.body;
	const query = "UPDATE artists SET name=?, image=?, website=? WHERE id=?;";
	const values = [artist.name, artist.image, artist.website, id];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
			console.log(fields);
		}
	});
});

// UPDATE TRACKS BY ID
app.put("/tracks/:id", (req, res) => {
	const id = req.params.id;
	const track = req.body;
	const query = "UPDATE tracks SET name=?, duration=? WHERE id=?;";
	const values = [track.name, track.duration, id];

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// UPDATE ALBUMS BY ID
app.put("/albums/:id", (req, res) => {
	const id = req.params.id;
	const album = req.body;
	const query = "UPADTE albums SET name=?, releaseDate=?, image=? WHERE id=?;";

	connection.query(query, values, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// ------------------------- //
// ------ DELETE BY ID ----- //
// ------------------------- //

// DELETE ARTISTS BY ID
app.delete("/artists/:id", (req, res) => {
	const id = req.params.id;
	const query = "DELETE FROM artists WHERE id=?;";
	const value = [id];

	connection.query(query, value, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// DELETE TRACKS BY ID
app.delete("/tracks/:id", (req, res) => {
	const id = req.params.id;
	const query = "DELETE FROM tracks WHERE id=?;";
	const value = [id];

	connection.query(query, value, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// DELETE ALBUMS BY ID
app.delete("/albums/:id", (req, res) => {
	const id = req.params.id;
	const query = "DELETE FROM WHERE id=?;";
	const value = [id];

	connection.query(query, value, (error, results, fields) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// Backend (skal være hosted på Azure)
// REST API implementeret med Node.js og Express.js
// Routes med endpoint for HTTP-metoderne GET, POST, PUT/PATCH, DELETE. (Y)
// CRUD-operationer der læser og skriver til MySQL Database. (Y)
// Udover de almindelige GET metoder skal der også være mulighed for søgning (N)
// søgning på album-navne
// søgning på artist-navne
// søgning på track-navne
// generel søgning (på tværs af alle kategorier) (Y)
// Udover de almindelige POST metoder skal der ogå være en funktion til at oprette et komplet album med artist og alle tracks -
// hvis artist findes i databasen, skal det eksisterende id bruges, ellers skal der oprettes en ny. Det samme gælder for hvert enkelt track. (N)
// Tilsvarende skal der være en GET metode til at trække al info om et album ud - så man i teorien ville kunne eksportere albums fra én backend,
// og importere dem til en anden. (Y)

/* TEST */
app.get("/search", (req, res) => {
	const query = req.query.q;

	const sqlQuery = "SELECT * FROM artists WHERE name LIKE CONCAT('%', ?, '%')";
	const values = [query];
	connection.query(sqlQuery, values, (err, results, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.json(results);
		}
	});
});
