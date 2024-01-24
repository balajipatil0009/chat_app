const login = async(req, res) =>{
     res.send("balaji");
}

const loginPost = async(req, res)=>{
    res.status(200).json(req.body)
    console.log(req.body);
}


module.exports = {login, loginPost}
