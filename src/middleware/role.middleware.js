const roleAdminMiddleware = (req, res, next) => {
    const role = req.user.role

    if(role === 'admin'){
        next()
    }else {
        res.status(401).json({status: 'error', message: 'User not authorized to make this request'})
    }
}

exports.roleAdminMiddleware = roleAdminMiddleware