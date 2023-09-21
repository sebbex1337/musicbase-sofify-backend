import { Router } from "express";
import connection from "../database.js";

const artistsRouter = Router();
// Get all artists from the database //
artistsRouter.get("/", (request, response) => {
	const queryString = /*sql*/ `
        SELECT * FROM artists ORDER BY name ASC;`;
	connection.query(queryString, (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

// Get searched artist from the database //
artistsRouter.get("/search", async (request, response) => {
	console.log("searching for artist");
	const query = request.query.q;
	console.log(query);

	const queryString = /*sql*/ `
    SELECT * FROM artists WHERE name LIKE ? ORDER BY name;`;
	const values = [`%${query}%`];
	await connection.execute(queryString, values, (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

// Get a single artist from the database //
artistsRouter.get("/:id", async (request, response) => {
	const id = request.params.id;
	const queryString = /*sql*/ `
    SELECT * FROM artists WHERE id = ?;`;
	await connection.execute(queryString, [id], (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});

//add a new artist to the database //
artistsRouter.post("/", async (request, response) => {
	const artist = request.body;
	const queryString = /*sql*/ `
	INSERT INTO artists (name, image, website)	
	VALUES (?, ?, ?);`;
	const values = [artist.name, artist.image, artist.website];
	await connection.execute(queryString, values, (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});
// update an artist //
artistsRouter.put("/:id", async (request, response) => {
	const id = request.params.id;
	const artist = request.body;
	const queryString = /*sql*/ `
	UPDATE artists SET name = ?, image = ?, website = ?
	WHERE id = ?;`;
	const values = [artist.name, artist.image, artist.website, id];
	await connection.execute(queryString, values, (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});
// delete an artist //
artistsRouter.delete("/:id", async (request, response) => {
	const id = request.params.id;
	const queryString = /*sql*/ `
	DELETE FROM artists WHERE id = ?;`;
	await connection.execute(queryString, [id], (error, results) => {
		if (error) {
			console.log(error);
			response.status(500).json({ message: "Error occured" });
		} else {
			response.json(results);
		}
	});
});
export default artistsRouter;
