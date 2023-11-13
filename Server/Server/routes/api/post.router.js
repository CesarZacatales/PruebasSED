const express = require("express");
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");

const postController = require("../../controllers/post.controller");

const postValidators = require("../../validators/post.validators");
const runValidations = require("../../validators/index.middleware");

const { authentication, authorization } = require('../../middlewares/auth.middewares');


router.get("/", postController.findAll);
router.get("/own", authentication, postController.findOwn);
router.get("/saved", authentication, postController.getOwnSavedPosts);
router.get("/user/:identifier",
    postValidators.findPostByIdValidator,
    runValidations,
    postController.findPostsByUser
);


router.get("/:title",
    postController.findOneBytitulo,
    postValidators.findBookBytituloValidator,
    runValidations
);

    
//Funcionalidad de usuario
router.post("/",
authentication,
authorization(ROLES.USER),
postValidators.createPostValidator,
runValidations,
postController.create);




router.patch("/save/:identifier",
    authentication,
    authorization(ROLES.USER),
    postValidators.findPostByIdValidator,
    runValidations,
    postController.toggleSavedPost
);


module.exports = router;