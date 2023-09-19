import { Router } from "express";
import connection from "../database.js";

const artistsRouter = Router();
// Get all artists from the database //
artistsRouter.get("/", (request, response) => {
	const queryString = /*sql*/ `
        SELECT * FROM artists ORDER BY name ASC;`;
	connection.query(queryString, (error, results) => {
		if (error) {
			console.error(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

// Get searched artist from the database //
artistsRouter.get("/search", (request, response) => {
	console.log("searching for artist");
	const query = request.query.q;
	console.log(query);

	const queryString = /*sql*/ `
    SELECT * FROM artists WHERE name LIKE ? ORDER BY name;`;
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

// Get a single artist from the database //
artistsRouter.get("/:id", (request, response) => {
	const id = request.params.id;
	const queryString = /*sql*/ `
    SELECT * FROM artists WHERE id = ?;`;
	connection.query(queryString, [id], (error, results) => {
		if (error) {
			console.error(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

export default artistsRouter;
