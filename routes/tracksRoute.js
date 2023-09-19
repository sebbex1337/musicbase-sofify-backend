import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

/* ============= GET ROUTES ============== */
tracksRouter.get("/", (req, res) => {
	const queryString = /* sql */ `
        SELECT tracks.*,
                    artists.name AS artistName,
                    artists.id AS artistId
            FROM tracks
            INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            INNER JOIN artists ON artists_tracks.artistID = artists.id;  
    `;
	connection.query(queryString, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
		}
	});
});

// Search for specific track //
tracksRouter.get("/search", (request, response) => {
	const query = request.query.q;
	const queryString = /*sql*/ `
    SELECT * FROM tracks WHERE name LIKE ? ORDER BY name;`;
	const values = [`%${query}%`];
	connection.query(queryString, values, (error, results) => {
		if (error) {
			console.log(error);
		} else {
			response.json(results);
		}
	});
});

// Get track by id //
tracksRouter.get("/:id", (req, res) => {
	const id = req.params.id;
	const queryString = /* sql */ `
        SELECT tracks.*,
                    artists.name AS artistName,
                    artists.id AS artistId
            FROM tracks
            INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
            INNER JOIN artists ON artists_tracks.artistID = artists.id
            WHERE tracks.id = ?;
    `;
	connection.query(queryString, [id], (error, result) => {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
		}
	});
});

/* ============= POST ROUTES ============== */
tracksRouter.post("/", (req, res) => {
	const track = req.body;
	const queryString = /* sql */ `
		INSERT INTO tracks (name, duration) VALUES (?, ?);
	`;
	const values = [track.name, track.duration];
	connection.query(queryString, values, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
		}
	});
});

/* ============= PUT ROUTES ============== */
tracksRouter.put("/:id", (req, res) => {
	const id = req.params.id;
	const track = req.body;
	const queryString = /* sql */ `
		UPDATE tracks SET name = ?, duration = ? WHERE id = ?;
	`;
	const values = [track.name, track.duration, id];
	connection.query(queryString, values, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
		}
	});
});

/* ============= DELETE ROUTES ============== */
tracksRouter.delete("/:id", (req, res) => {
	const id = req.params.id;
	const queryString = /* sql */ `
		DELETE FROM tracks WHERE id = ?;
	`;
	const values = [id];
	connection.query(queryString, values, (error, result) => {
		if (error) {
			console.log(error);
		} else {
			res.json(result);
		}
	});
});

export default tracksRouter;
