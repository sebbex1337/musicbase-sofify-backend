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

/* ========= Create complete album with artists and tracks ========== */
albumsRouter.post("/collection", async (req, res) => {
	const album = req.body;
	const query = /* sql */ `
	INSERT INTO albums(name, releaseDate, image) VALUES(?,?,?);
	`;
	const values = [album.name, album.releaseDate, album.image];
	const [results] = await connection.execute(query, values);
	const newAlbumId = results.insertId;

	let artistId = album.artistId;
	let artistIdExists = false;
	if (artistId) {
		artistIdExists = await checkArtist(album.artistId);
	}
	if (!artistIdExists) {
		const artistsQuery = /* sql */ `
		INSERT INTO artists(name, image, website) VALUES(?,?,?);
		`;
		const artistsValues = [album.artistName, album.artistImage, album.artistWebsite];
		const [artistsResults] = await connection.execute(artistsQuery, artistsValues);
		artistId = artistsResults.insertId;
	}

	const artistsAlbumsQuery = /* sql */ `
	INSERT INTO artists_albums(artistID, albumID) VALUES(?,?);
	`;
	const artistsAlbumsValues = [artistId, newAlbumId];
	const [artistsAlbumsResults] = await connection.execute(artistsAlbumsQuery, artistsAlbumsValues);

	let trackId = await checkTrack(album.trackName);
	if (!trackId) {
		const tracksQuery = /* sql */ `
		INSERT INTO tracks(name, duration) VALUES(?,?);
		`;
		const tracksValues = [album.trackName, album.trackDuration];
		const [tracksResults] = await connection.execute(tracksQuery, tracksValues);
		trackId = tracksResults.insertId;
	}

	const tracksAlbumsQuery = /* sql */ `
	INSERT INTO tracks_albums(trackID, albumID) VALUES(?,?);
	`;
	const tracksAlbumsValues = [trackId, newAlbumId];
	const [tracksAlbumsResults] = await connection.execute(tracksAlbumsQuery, tracksAlbumsValues);

	const artistsTracksQuery = /* sql */ `
	INSERT INTO artists_tracks(artistID, trackID) VALUES(?,?);
	`;
	const artistsTracksValues = [artistId, trackId];
	const [artistsTracksResults] = await connection.execute(artistsTracksQuery, artistsTracksValues);

	res.json({ message: "Album added", albumId: newAlbumId });
});

async function checkArtist(artistId) {
	const [allArtists] = await connection.execute(/* sql */ `SELECT * FROM artists WHERE artists.id = ${artistId};`);
	if (allArtists.length === 0) {
		return false;
	}
	return true;
}

async function checkTrack(trackName) {
	const values = [trackName];
	const [allTracks] = await connection.execute(/* sql */ `SELECT * FROM tracks WHERE tracks.name = ?;`, values);
	if (allTracks.length >= 1) {
		return allTracks[0].id;
	}
}

albumsRouter.get("/:id/collection", async (req, res) => {
	const id = req.params.id;
	const query = /* sql */ `
	SELECT albums.*,
				artists.name AS artistName,
				artists.id AS artistId,
				artists.image AS artistImage,
				artists.website AS artistWebsite,
				tracks.id AS trackId,
				tracks.name AS trackName,
				tracks.duration AS trackDuration
		FROM albums
		INNER JOIN artists_albums ON albums.id = artists_albums.albumID
		INNER JOIN artists ON artists_albums.artistID = artists.id
		INNER JOIN tracks_albums ON albums.id = tracks_albums.albumID
		INNER JOIN tracks ON tracks_albums.trackID = tracks.id
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
						name: track.trackName,
						duration: track.trackDuration,
					};
				}),
			};

			res.json(albumTracks);
		} else {
			res.json({ message: "Album not found" });
		}
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
