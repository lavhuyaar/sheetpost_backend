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
commentRoutes.get('/:postId/all', getCommentsOnPost); //Get all comments of a post

commentRoutes.use(verifyToken);

//Protected routes for website
commentRoutes.post('/new', verifyUser, createNewComment); //Creates new comment on post (website)
commentRoutes.put('/:commentId', verifyUser, editCommentById); //Edit comment, can only be done by OP
commentRoutes.delete('/:commentId', verifyUser, deleteCommentByUser); //Delete comment (by OP)

//Protected routes for admin panel
commentRoutes.get('/:authorId/all', verifyAuthor, getCommentsOnAuthor); //Get all comments posted on the posts of an author
commentRoutes.delete('/:commentId/admin', verifyAuthor, deleteCommentByAdmin); //Delete comment (by author/admin)

export default commentRoutes;
