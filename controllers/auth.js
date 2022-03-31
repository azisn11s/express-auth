exports.register = (req, res, next)=> {

    const { email, username, password } = req.body;
    
    res.status(200).json({
        data: { email, username, password } 
    })
}