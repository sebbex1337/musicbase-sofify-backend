import express from "express";
import cors from "cors";
import albumsRouter from "./routes/albumsRoute.js";
import tracksRouter from "./routes/tracksRoute.js";
import artistsRouter from "./routes/artistsRoute.js";

const app = express();
const port = process.env.SERVER_PORT || 3333;

app.use(express.json()); // to parse JSON bodies
app.use(cors());

app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/artists", artistsRouter);

//  PORT LISTNER - to see if there is connection
app.listen(port, () => {
	console.log(`Musicbase is running on http://localhost:${port}`);
});

// Server is running
app.get("/", (req, res) => {
	res.send("Musicbase is up and running");
});

// -------------------------------- //
// ------ READ CROSS TABELS  ------ //
// -------------------------------- //

// READ ALL ALBUMS FROM ARTISTS BY ID
/* app.get("/artists_albums/:id", (req, res) => {
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
}); */

// READ ALL TRACKS FROM ARTISTS BY ID
/* app.get("/artists_tracks/:id", (req, res) => {
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
}); */

// READ ALL TRACKS FROM ALBUMS BY ID
app.get("/tracks_albums/:id", (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `
		SELECT * 
		FROM albums 
		INNER JOIN tracks_albums ON albums.id = tracks_albums.albumID 
		INNER JOIN tracks ON tracks_albums.trackID = tracks.id 
		WHERE albums.id=?; `;
	const values = [id];

	connection.query(query, values, (err, results, fields) => {
		if (err) {
			console.log(err);
		} else {
			res.json(results);
		}
	});
});
