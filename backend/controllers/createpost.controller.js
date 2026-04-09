 const Post=require('../models/post.model');
 
const createPost = async (req, res) => {
     

    const post = await Post.create({});
    res.status(200).json({
        'message': 'new post created',
        'user': post
    })
}
module.exports = createPost;