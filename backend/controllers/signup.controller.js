
const User=require('../models/user.model.js');
const jwt=require('jsonwebtoken');

const signup = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
        res.status(403).json({
            'message': 'user allready exist'
        })
    }
    else {
        const newUser = await User.create({ username, password });
        const token = jwt.sign({ username },  process.env.SECRET_KEY_JWT)
        res.cookie('token', token);
        res.status(200).json({
            'message': `new user created ${newUser._id}`
        })
    }
}
module.exports=signup