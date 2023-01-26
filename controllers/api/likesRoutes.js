const router = require("express").Router();
const Likes = require("../../models/Likes");

router.post("/", async (req, res) => {
    try {
        Likes.create({
            trackId: req.body.trackId,
            trackName: req.body.trackName,
            trackArtist: req.body.trackArtist,
            trackArt: req.body.trackArt,
        })
            .then((likesData) => {
                res.json(likesData);
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/likes", async (req, res) => {
    try {
        Likes.findAll({
            // where: {
            //     trackName: {
            //         [Op.not]: null,
            //     }
            // },
        })
            .then((likesData) => {
                const filteredLikesData = likesData.map((likes) =>
                    likes.get({ plain: true })
                );
                res.render("likes", { filteredLikesData });
            })
            .catch((error) => {
                console.log(error);
                res.status(500).json(error);
            });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/", async (req, res) => {
    try {
        console.log("The route was hit")
        Likes.destroy({
            where: {
                id: req.params.id,
            },
        })
        .then((likesData) => {
            const filteredLikesData = likesData.map((likes) =>
                likes.get({ plain: true })
            );
            res.render("likes", { filteredLikesData });
        })
        res.status(200).json(likesData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
