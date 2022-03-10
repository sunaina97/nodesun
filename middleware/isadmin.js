module.exports = (req,res,next) => {
    if(!req.session.user.isadmin) {
        return res.redirect('/booking')
    }
    next()
}