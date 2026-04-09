 const Post=require('../models/post.model');
 
const delPost = async (req, res) => {


    const id = req.params.id;

    const post = await Post.deleteOne({ id });
    res.status(200).json({
        'message': 'post deleted successfully',
        'post': post
    })
}
module.exports = delPost;