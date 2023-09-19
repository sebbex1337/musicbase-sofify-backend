import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

// Default get route for tracks
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
			console.error(error);
		} else {
			res.json(result);
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
			res.json(result);
		}
	});
});

export default tracksRouter;
