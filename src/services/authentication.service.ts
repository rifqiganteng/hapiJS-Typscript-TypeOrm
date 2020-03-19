import {CreatorService} from "./creator.service";
import {Creator} from "../entities/creator";
import Util from "../util/util";
import * as md5 from "ts-md5";
import * as jwt from "jsonwebtoken";
import RedisService from "./redis.service";

const redisService = new RedisService();
const creatorService = new CreatorService();
const util = new Util();

export class AuthenticationService {
    async login(username: Creator, password: string) {
        const creator = await creatorService.findCreatorById(username)
        if (!creator || !(await util.compare(password, creator.password))) {
            throw new Error(`${username} ${password} is not found`)
        }
        // const salt = await bcrypt.genSalt();
        // const sessionId : String = bcrypt.hashSync(username.username, salt);
        const secretKey: any = process.env.JWT_SECRET;
        // const sessionId = md5.Md5.hashAsciiStr(`${new Date().getTime()}`); // seharusnya berisi id user
        const sessionId = md5.Md5.hashAsciiStr(`${password}`); // seharusnya berisi id user
        const expiresIn = process.env.JWT_EXPIRED; // ini waktu JWT token atau masa berlaku
        const token = jwt.sign({sessionId}, `${secretKey}`, {expiresIn}); // secret key =  certificate yang digenerate dari server
        console.log(token);
        await redisService.set({key: sessionId, value: creator.username, expires: expiresIn});
        return token;


    }

    async validateSession(newSessionId: any) {
        const newSessionID = await redisService.get(newSessionId);
        const creator = await creatorService.findCreatorById(newSessionId);
        return !!creator;
    }
}

