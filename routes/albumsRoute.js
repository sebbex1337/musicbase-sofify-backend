import { Router } from "express";
import connection from "../database.js";

const albumsRouter = Router();

// READ ALBUMS (FETCH DATA)
albumsRouter.get("/", (req, res) => {
	const query = /* sql */ `
    SELECT DISTINCT albums.*,
                artists.name AS artistName,
                artists.id AS artistId
            FROM albums
            JOIN tracks_albums ON albums.id = tracks_albums.albumID
            JOIN tracks ON tracks_albums.trackID = tracks.id
            JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            JOIN artists ON artists_tracks.artistID = artists.id;`;

	connection.query(query, function (error, results) {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// Get all artists from the database //
albumsRouter.get("/search", (request, response) => {
	const query = request.query.q;
	const queryString = /*sql*/ `
    SELECT * FROM albums WHERE name LIKE ? ORDER BY name;`;
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

albumsRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `
    SELECT albums.*,
                artists.name AS artistName,
                tracks.id AS trackId,
                tracks.name AS trackTitle,
                tracks.duration,
                artists.id AS artistId
            FROM albums
            JOIN tracks_albums ON albums.id = tracks_albums.albumID
            JOIN tracks ON tracks_albums.trackID = tracks.id
            JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            JOIN artists ON artists_tracks.artistID = artists.id
            WHERE albums.id = ?;`;

	connection.query(query, [id], function (error, results) {
		if (error) {
			console.log(error);
		} else {
			if (results[0]) {
				const album = results[0];
				const albumTracks = {
					id: album.id,
					name: album.name,
					releaseDate: album.releaseDate,
					artistName: album.artistName,
					image: album.image,
					tracks: results.map((track) => {
						return {
							id: track.trackId,
							name: track.trackTitle,
							duration: track.duration,
						};
					}),
				};
				res.json(albumTracks);
			} else {
				res.json({ message: "Album not found" });
			}
		}
	});
});

/* Get all tracks from specific album */
albumsRouter.get("/:id/tracks", (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `
    SELECT albums.id AS albumId,
            albums.name AS albumTitle,
            albums.releaseDate AS albumReleaseDate,
            tracks.id AS trackId,
            tracks.name AS trackTitle,
            tracks.duration AS duration,
            artists.name AS artistName
        FROM albums
        INNER JOIN tracks_albums ON albums.id = tracks_albums.albumID
        INNER JOIN tracks ON tracks_albums.trackID = tracks.id
        INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
        INNER JOIN artists ON artists_tracks.artistID = artists.id
        WHERE albums.id = ?;`;

	connection.query(query, [id], function (error, results) {
		if (error) {
			console.log(error);
		} else {
			if (results.length) {
				res.json(results);
			} else {
				res.json({ message: "Album not found" });
			}
		}
	});
});

// POST NEW ALBUM
albumsRouter.post("/", (req, res) => {
	const album = req.body;
	const query = /* sql */ `INSERT INTO albums(name, releaseDate, image) values(?,?,?);`;
	const values = [album.name, album.releaseDate, album.image];

	connection.query(query, values, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// UPDATE ALBUMS BY ID
albumsRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const album = req.body;
	const query = /* sql */ `UPADTE albums SET name=?, releaseDate=?, image=? WHERE id=?;`;
	const values = [album.name, album.releaseDate, album.image, id];

	connection.query(query, values, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

// DELETE ALBUMS BY ID
albumsRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `DELETE FROM WHERE id=?;`;
	const value = [id];

	connection.query(query, value, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			res.json(results);
		}
	});
});

export default albumsRouter;
