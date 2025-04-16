import { Router } from 'express';
const postRoutes = Router();

postRoutes.get('/all'); //Get all posts
postRoutes.get('/:postId'); //Get post with id
postRoutes.get('/:authorId/all'); //Get all posts of an author
postRoutes.post('/:authorId'); //Post a new post
postRoutes.put('/:postId'); //Edit post
postRoutes.delete('/:postId'); //Delete post

export default postRoutes;
