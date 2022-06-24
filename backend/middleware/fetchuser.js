const jwt = require("jsonwebtoken");

const JWT_SECRET = "tremendouseffortbutnoresult";

const fetchuser = (req, res, next) => {
    //get the user from the jwt token and add id to req object
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user
        next();//to call function next in the route where this middleware is called, that is, the async function after middleware parameter
    } catch (error) {
        res.status(401).send({error: "Please authenticate using a valid token"});
    }
}

module.exports = fetchuser;