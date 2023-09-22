import { Router } from "express";
import connection from "../database.js";

const albumsRouter = Router();

// READ ALBUMS (FETCH DATA)
albumsRouter.get("/", async (req, res) => {
	const query = /* sql */ `
    SELECT DISTINCT albums.*, artists.name AS artistName, artists.id AS artistId, artists.image AS artistsImage, artists.website AS artistsWebsite FROM albums
JOIN artists_albums ON albums.id = artists_albums.albumID
JOIN artists ON artists_albums.artistID = artists.id;`;

	const [results] = await connection.execute(query);
	if (!results) {
		res.status(404).json({ message: "No results found" });
	} else {
		const albums = prepareAlbumsData(results);
		res.json(albums);
	}
});

// Get all artists from the database //
albumsRouter.get("/search", async (request, response) => {
	const query = request.query.q;
	const queryString = /*sql*/ `
    SELECT * FROM albums WHERE name LIKE ? ORDER BY name;`;
	const values = [`%${query}%`];
	const [results] = await connection.execute(queryString, values);
	if (!results) {
		response.status(404).json({ message: "No results found" });
	} else {
		const albums = prepareAlbumsData(results);
		response.json(albums);
	}
});

albumsRouter.get("/:id", async (req, res) => {
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

	const [results] = await connection.execute(query, [id]);
	if (!results) {
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

albumsRouter.get("/:id/tracks", async (req, res) => {
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

	const [results] = await connection.execute(query, [id]);
	if (!results) {
		console.log(error);
	} else {
		if (results.length) {
			res.json(results);
		} else {
			res.json({ message: "Album not found" });
		}
	}
});

// POST NEW ALBUM
albumsRouter.post("/", async (req, res) => {
	const album = req.body;
	const query = /* sql */ `INSERT INTO albums(name, releaseDate, image) values(?,?,?);`;
	const values = [album.name, album.releaseDate, album.image];

	const [results] = await connection.execute(query, values);
	if (!results) {
		console.log(error);
	} else {
		res.json(results);
	}
});

// UPDATE ALBUMS BY ID
albumsRouter.put("/:id", async (req, res) => {
	const id = req.params.id;
	const album = req.body;
	const query = /* sql */ `UPADTE albums SET name=?, releaseDate=?, image=? WHERE id=?;`;
	const values = [album.name, album.releaseDate, album.image, id];

	const [results] = await connection.execute(query, values);
	if (!results) {
		console.log(error);
	} else {
		res.json(results);
	}
});

// DELETE ALBUMS BY ID
albumsRouter.delete("/:id", async (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `DELETE FROM WHERE id=?;`;
	const value = [id];

	const [results] = await connection.execute(query, value);
	if (!results) {
		console.log(error);
	} else {
		res.json(results);
	}
});

function prepareAlbumsData(results) {
	const albumsWithArtists = {};

	for (const album of results) {
		if (!albumsWithArtists[album.id]) {
			albumsWithArtists[album.id] = {
				id: album.id,
				name: album.name,
				releaseDate: album.releaseDate,
				artists: [],
			};
		}
		albumsWithArtists[album.id].artists.push({
			name: album.artistName,
			image: album.artistImage,
			website: album.artistWebsite,
			id: album.artistId,
		});
	}
	const albumsArray = Object.values(albumsWithArtists);
	return albumsArray;
}

export default albumsRouter;
