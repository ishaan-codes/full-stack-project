import {Router} from "express";
import { loginUser, logOutUser, registerUser, refreshAccessToken } from "../controllers/user.controller.js"; //automatically imported after writing line 6
//#debugging -- writing ../controller/user.controller gave error
import {upload} from '../middlewares/multer.middleware.js';

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        }, 
        {
            name: "coverImage",
            coverImage: 1
        }
    ]),
    //allows us to send images
    registerUser
)
//instruction for routing user towards registration page
//this allows us to handle user from here only and we need not tweak app.js everytime
//if we send a request on postman/thunder client other than post request, we get an error


router.route("/login").post(loginUser)

//secured routes
router.route("/logout").post(verifyJWT, logOutUser)
//we can add middleware in any order but we need to ensure that there is a next() flag at the end of each middleware
router.route("refresh-token").post(refreshAccessToken)

export default router;