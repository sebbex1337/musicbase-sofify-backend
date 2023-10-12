import { Router } from "express";
import connection from "../database.js";
import { prepareAlbumsData } from "./albumsRoute.js";
import { prepareTrackData } from "./tracksRoute.js";

const searchRouter = Router();

searchRouter.get("/", async (req, res) => {
    const query = req.query.q;
    const queryArtists = /*sql*/ `
        SELECT * FROM artists WHERE name LIKE ? ORDER BY name;`;
    const queryTracks = /* sql */ `
        SELECT tracks.*,
            artists.name AS artistName,
            artists.image AS artistImage,
            artists.website AS artistWebsite,
            artists.id AS artistId
        FROM tracks
        INNER JOIN artists_tracks ON tracks.id = artists_tracks.trackID
        INNER JOIN artists ON artists_tracks.artistID = artists.id
        WHERE tracks.name LIKE ? ORDER BY name;
    `;
    const queryAlbums = /* sql */ `
    SELECT DISTINCT albums.*, artists.name AS artistName, artists.id AS artistId, artists.image AS artistsImage, artists.website AS artistsWebsite FROM albums
JOIN artists_albums ON albums.id = artists_albums.albumID
JOIN artists ON artists_albums.artistID = artists.id WHERE albums.name LIKE ? ORDER BY name;`;

    const values = [`%${query}%`];

    const [artistsResults] = await connection.execute(queryArtists, values);
    const [tracksResults] = await connection.execute(queryTracks, values);
    const [albumsResults] = await connection.execute(queryAlbums, values);
    const albums = prepareAlbumsData(albumsResults);
    const tracks = prepareTrackData(tracksResults);

    const results = {
        artists: artistsResults,
        tracks: tracks,
        albums: albums,
    };

    if (!results) {
        res.status(404).json({ message: "No results found" });
    } else {
        res.json(results);
    }
});

export default searchRouter;
