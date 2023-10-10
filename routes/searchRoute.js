import { Router } from "express";
import connection from "../database.js";

const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
    const query = req.query.q;
    const queryArtists = /*sql*/ `
        SELECT * FROM artists WHERE name LIKE ? ORDER BY name;`;
    const queryTracks = /* sql */ `
        SELECT * FROM tracks WHERE name LIKE ? ORDER BY name;`;
    const queryAlbums = /* sql */ `
        SELECT * FROM albums WHERE name LIKE ? ORDER BY name;`;

    const values = [`%${query}%`];

    const [artistsResults] = await connection.execute(queryArtists, values);
    const [tracksResults] = await connection.execute(queryTracks, values);
    const [albumsResults] = await connection.execute(queryAlbums, values);

    const results = {
        artists: artistsResults,
        tracks: tracksResults,
        albums: albumsResults,
    };

    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        res.json(results);
    }
});

export default searchRouter;
