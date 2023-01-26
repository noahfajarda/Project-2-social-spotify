const router = require("express").Router();
const Playlist = require("../../models/Playlist");

router.post("/", async (req, res) => {
    try {
        Playlist.create({
            trackId: req.body.trackId,
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
            trackArt: req.body.trackArt,
            userId: req.body.userId,
        })
            .then((playlistData) => {
                res.json(playlistData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/playlist/:id", async (req, res) => {
    console.log(req.params.id);
    try {
        console.log("TEST FOR TRY BLOVK");
        Playlist.findAll({
            where: {
                userId: req.params.id,
            },
        })
            .then((playlistData) => {
                const filteredData = playlistData.map((playlist) =>
                    playlist.get({ plain: true })
                );

                res.render("playlist", { filteredData });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/api/playlist/:id", async (req, res) => {
    try {
        const playlistData = await Playlist.destroy({
            where: {
                id: req.params.id,
            },
        });
        res.status(200).json(playlistData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
