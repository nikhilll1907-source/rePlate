 const Post=require('../models/post.model');
 
const createPost = async (req, res) => {
     

    const id = req.params.id;

    const post = await Post.create({ id });
    res.status(200).json({
        'message': 'new post created',
        'user': post
    })
}
module.exports = delPost;