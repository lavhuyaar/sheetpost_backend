import { Router } from 'express';
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getAuthorPosts,
  getPost,
} from '../controllers/postController';
import { verifyToken } from '../middlewares/verifyToken';
import verifyAuthor from '../middlewares/verifyAuthor';
const postRoutes = Router();

//Unprotected routes
postRoutes.get('/', getAllPosts); //Get all posts
postRoutes.get('/:postId', getPost); //Get post with id
postRoutes.get('/:authorId/all', getAuthorPosts); //Get all posts of an author

//Authorization middlewares
postRoutes.use(verifyToken, verifyAuthor);

//Protected Routes
postRoutes.post('/new', createNewPost); //Post a new post
postRoutes.put('/:postId', editPost); //Edit post
postRoutes.delete('/:postId', deletePost); //Delete post

export default postRoutes;
