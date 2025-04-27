import { Router } from 'express';
import {
  createNewComment,
  deleteCommentByAdmin,
  deleteCommentByUser,
  editCommentById,
  getCommentsOnAuthor,
  getCommentsOnPost,
} from '../controllers/commentController';
import { verifyToken } from '../middlewares/verifyToken';
import verifyAuthor from '../middlewares/verifyAuthor';
import verifyUser from '../middlewares/verifyUser';
const commentRoutes = Router();

//Unprotected routes
commentRoutes.get('/comment/:postId/all', getCommentsOnPost); //Get all comments of a post

commentRoutes.use(verifyToken);

//Protected routes for website
commentRoutes.post('/new', verifyUser, createNewComment); //Creates new comment on post (website)
commentRoutes.put('/comment/:commentId', verifyUser, editCommentById); //Edit comment, can only be done by OP
commentRoutes.delete('/comment/:commentId', verifyUser, deleteCommentByUser); //Delete comment (by OP)

//Protected routes for admin panel
commentRoutes.get('/admin/all', verifyAuthor, getCommentsOnAuthor); //Get all comments posted on the posts of an author
commentRoutes.delete('/admin/:commentId', verifyAuthor, deleteCommentByAdmin); //Delete comment (by author/admin)

export default commentRoutes;
