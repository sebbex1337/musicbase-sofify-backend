import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

// Default get route for tracks
tracksRouter.get("/", (req, res) => {
	const queryString = /* sql */ `
        SELECT tracks.*,
                    artists.name AS artistName,
					artists.image AS artistImage,
					artists.website AS artistWebsite,
                    artists.id AS artistId
            FROM tracks
            INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            INNER JOIN artists ON artists_tracks.artistID = artists.id;
    `;
	connection.query(queryString, (error, result) => {
		if (error) {
			console.error(error);
		} else {
			const tracks = prepareTrackData(result);
			res.json(tracks);
		}
	});
});

// Get all artists from the database //
tracksRouter.get("/search", (request, response) => {
	const query = request.query.q;
	const queryString = /*sql*/ `
    SELECT * FROM tracks WHERE name LIKE ? ORDER BY name;`;
	const values = [`%${query}%`];
	connection.query(queryString, values, (error, results) => {
		if (error) {
			console.error(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

tracksRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const queryString = /* sql */ `
        SELECT tracks.*,
                    artists.name AS artistName,
					artists.image AS artistImage,
					artists.website AS artistWebsite,
                    artists.id AS artistId
            FROM tracks
            INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            INNER JOIN artists ON artists_tracks.artistID = artists.id
            WHERE tracks.id = ?;
    `;
	connection.query(queryString, [id], (error, result) => {
		if (error) {
			console.error(error);
		} else {
			const tracks = prepareTrackData(result);
			res.json(tracks);
		}
	});
});

// tracksRouter.post("/", (req, res) => {
// 	const track = req.body;
// 	const queryString = /* sql */ `
// 		INSERT INTO tracks (name, duration) VALUES (?, ?);`;
// 	const values = [track.name, track.duration];
// 	connection.query(queryString, values, (error, results) => {
// 		if (error) {
// 			console.log(error);
// 		} else {
// 			res.json(results);
// 		}
// 	});
// });

tracksRouter.post("/", async (req, res) => {
	const track = req.body;
	const trackQuery = /* sql */ `
		INSERT INTO tracks (name, duration)
		VALUES (?, ?);
	`;
	const trackValues = [track.name, track.duration];
	const [trackResults] = await connection.execute(trackQuery, trackValues);

	const newTrackId = trackResults.insertId;

	const artistsTracksQuery = /* sql */ `INSERT INTO artists_tracks (artistID, trackID) VALUES (?, ?);`;
	const artistsTracksValues = [track.artistId, newTrackId];

	const [artistsTracksResults] = await connection.execute(artistsTracksQuery, artistsTracksValues);
	console.log(artistsTracksResults);

	res.json({ message: "Track added", trackId: newTrackId });
});

tracksRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const track = req.body;
	const queryString = /* sql */ `
		UPDATE tracks SET name = ?, duration = ?
		WHERE id = ?;`;
	const values = [track.name, track.duration, id];
	connection.query(queryString, values, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

tracksRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const queryString = /* sql */ `
		DELETE FROM tracks WHERE id = ?;`;
	connection.query(queryString, [id], (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

function prepareTrackData(results) {
	const tracksWithArtists = {};

	for (const track of results) {
		if (!tracksWithArtists[track.id]) {
			tracksWithArtists[track.id] = {
				id: track.id,
				name: track.name,
				duration: track.duration,
				artists: [],
			};
		}
		tracksWithArtists[track.id].artists.push({
			name: track.artistName,
			image: track.artistImage,
			website: track.artistWebsite,
			id: track.artistId,
		});
	}
	const tracksArray = Object.values(tracksWithArtists);
	return tracksArray;
}

export default tracksRouter;
