import { Router } from 'express';
import {
  createNewPost,
  deletePost,
  editPost,
  getAllPosts,
  getAuthorPosts,
  getPost,
  getPostsByAdmin,
} from '../controllers/postController';
import { verifyToken } from '../middlewares/verifyToken';
import verifyAuthor from '../middlewares/verifyAuthor';
const postRoutes = Router();

//Unprotected routes
postRoutes.get('/', getAllPosts); //Get all posts (published)
postRoutes.get('/:postId', getPost); //Get post with id
postRoutes.get('/:authorId/all', getAuthorPosts); //Get all published posts of an author (website)

//Authorization middlewares
postRoutes.use(verifyToken, verifyAuthor);

//Protected Routes
postRoutes.get('/admin', getPostsByAdmin); //Get all posts by Author (admin panel)
postRoutes.post('/new', createNewPost); //Post a new post
postRoutes.put('/:postId', editPost); //Edit post
postRoutes.delete('/:postId', deletePost); //Delete post

export default postRoutes;
