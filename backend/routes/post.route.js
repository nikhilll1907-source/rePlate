const express=require('express');
 const router=express.Router();

const delPost=require('../controllers/deletePost.controller.js');
const createPost=require('../controllers/createpost.controller.js');

 router.get('/get-post',getPost)
 router.delete('/del-post',delPost);
 router.post('/create',createPost);
 module.exports=router;