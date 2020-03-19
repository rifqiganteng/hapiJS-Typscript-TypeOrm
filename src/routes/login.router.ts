import {AuthenticationService} from "../services/authentication.service";
import * as hapi from 'hapi';


const authenticationService = new AuthenticationService();
const LoginRouter = [
    {
        method: 'POST',
        path: '/login',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let {username , password} = request.payload;
            console.log(request.payload, "isi paylod nya ")
            return response.response({
                token: await authenticationService.login(username, password)
            })
        }
    }
]
export default LoginRouter