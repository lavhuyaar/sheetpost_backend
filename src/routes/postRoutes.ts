import { Router } from 'express';
import {
  createNewPost,
  deletePost,
  editPost,
  getAdminPost,
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
postRoutes.get('/post/:postId', getPost); //Get post with id
postRoutes.get('/all/:authorId', getAuthorPosts); //Get all published posts of an author (website)

//Authorization middlewares
postRoutes.use(verifyToken, verifyAuthor);

//Protected Routes
postRoutes.get('/admin', getPostsByAdmin); //Get all posts by Author (admin panel)
postRoutes.get('/admin/:postId', getAdminPost) //Get particular post of Author (admin panel)
postRoutes.post('/new', createNewPost); //Post a new post
postRoutes.put('/post/:postId', editPost); //Edit post
postRoutes.delete('/post/:postId', deletePost); //Delete post

export default postRoutes;
