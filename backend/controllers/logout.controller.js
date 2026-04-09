
const logout = (req, res) => {
   res.cookie('token', '');
   res.status(200).json({
      "message":'logout successfully'
   })
}
module.exports = logout;