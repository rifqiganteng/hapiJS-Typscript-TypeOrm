import {createConnection} from "typeorm";
import {Creator} from "../entities/creator";
import {Content} from "../entities/content";
import {Report} from "../entities/report";
import {Serial} from "../entities/serial";
import {AdminAccount} from "../entities/admin";


async function createDbConnection(){
    const connection = await createConnection(
        {
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "amanullah",
            database: "dkey",
            entities: [
                Creator,
                Content,
                Report,
                Serial,
                //AdminAccount,
            ],
            synchronize: true,
            logging: true
            // type : process.env.DB_DRIVER,
            // host : process.env.DB_HOST,
            // port : process.env.DB_PORT,
            // username : process.env.DB_USERNAME,
            // password : process.env.DB_PASSWORD,
            // database : process.env.DB_NAME,
            // entities : [
            //     Creator,
            //     Content,
            //     Report,
            //     Serial,
            //     //AdminAccount,
            // ],
            // synchronize : true,
            // logging : true
        }
    )
    return connection
}
export default createDbConnection;











