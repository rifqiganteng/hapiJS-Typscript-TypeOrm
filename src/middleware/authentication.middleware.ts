import * as jwt from "jsonwebtoken";
import {AuthenticationService} from "../services/authentication.service";
import * as hapi from "hapi";
const authenticationService = new AuthenticationService();
const authentification = async (request : hapi.Request,  response : hapi.ResponseToolkit, next : hapi.Auth) => {
    try {
        const token = request.get('Autorization').replace('Bearer ', '');
        const secret = process.env.JWT_SECRET;
        const data = jwt.verify(token, `${secret}`);
        const valid = await authenticationService.validateSession(data.sessionId);
        if(valid){
            next();
        } else {
            response.statusCode(403).json({statusMessage: "Access not permitted"});
        }
    } catch (error) {
        response.status(403).json({message: "access not permitted"})
    }
}
export default authentification;