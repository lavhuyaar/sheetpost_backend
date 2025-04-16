import { Router } from 'express';
const commentRoutes = Router();

commentRoutes.get('/:postId/all'); //Get all comments of a post
commentRoutes.get('/:authorId/all'); //Get all comments posted on the posts of an author
commentRoutes.put('/:userId'); //Edit comment, can only be done by OP
commentRoutes.delete('/:commentId'); //Delete comment (by OP or author/admin)
commentRoutes.delete('/:authorId/all'); //Delete comment (by author/admin)

export default commentRoutes;
