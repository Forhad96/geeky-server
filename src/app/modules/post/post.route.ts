import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { PostValidations } from "./post.validation";
import { PostController } from "./post.controller";
import auth from "../../middlewares/auth";
import { USER_ROLE } from "../User/user.constant";

const router = Router()

router.post('/create-post',auth(USER_ROLE.USER),validateRequest(PostValidations.createPostValidationSchema),PostController.handleCreatePost)
router.get('/',PostController.handleGetAllPosts)
router.get('/:postId',PostController.handleGetSinglePost)

export const PostRoutes = router