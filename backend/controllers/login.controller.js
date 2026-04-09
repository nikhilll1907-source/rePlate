
const User=require('../models/user.model.js');
const jwt=require('jsonwebtoken');

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        res.status(403).json({
            'message': 'user not exist'
        })
    }

    else if (user.password !== password) {
        res.status(403).json({
            'message': 'Incorrect password'
        })
    }
    else {
        const token = jwt.sign({ username }, 'secret')
        res.cookie('token', token);
        res.status(200).json({
            'message': 'login successfully'
        })

    }
}

export default login;