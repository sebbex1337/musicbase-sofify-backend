import { Router } from "express";
import connection from "../database.js";

const tracksRouter = Router();

// Default get route for tracks
tracksRouter.get("/", async (req, res) => {
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
    const [results] = await connection.execute(queryString);
    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        const tracks = prepareTrackData(results);
        res.json(tracks);
    }
});

// Get all artists from the database //
tracksRouter.get("/search", async (request, response) => {
    const query = request.query.q;
    const queryString = /*sql*/ `
    SELECT * FROM tracks WHERE name LIKE ? ORDER BY name;`;
    const values = [`%${query}%`];
    const [results] = await connection.execute(queryString, values);
    if (!results) {
        response.status(404).json({ message: "No results found" });
    } else {
        response.json(results);
    }
});

tracksRouter.get("/:id", async (req, res) => {
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
    const [results] = await connection.execute(queryString, [id]);
    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        const track = prepareTrackData(results);
        res.json(track);
    }
});

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

    res.json({ message: "Track added", trackId: newTrackId });
});

tracksRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    const track = req.body;
    const queryString = /* sql */ `
		UPDATE tracks SET name = ?, duration = ?
		WHERE id = ?;`;
    const values = [track.name, track.duration, id];
    const [results] = await connection.execute(queryString, values);
    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        res.json(results);
    }
});

tracksRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    const queryString = /* sql */ `
		DELETE FROM tracks WHERE id = ?;`;
    const [results] = await connection.query(queryString, [id]);
    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        res.json(results);
    }
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
