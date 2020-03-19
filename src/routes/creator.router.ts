import {CreatorService} from '../services/creator.service';
import * as hapi from 'hapi';
import authentification from '../middleware/authentication.middleware'
import {Creator} from "../entities/creator";


const creatorService = new CreatorService();
const CreatorRouter = [
    // {
    //     method: 'GET',
    //     path: '/creators',
    //     handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
    //         let creator = request.payload as Creator
    //         console.log(request, "11111111111111111111111111111111")
    //         console.log(creator, "22222222222222222222222222222222")
    //         return response.response({
    //             creator: await creatorService.findAllCreator(creator)
    //         })
    //     }
    // },
    {
        method: 'GET',
        path: '/creators',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit,) => {
            return response.response({
                creator: await creatorService.findAllCreator()
            })
        }
    },
    {
        method: 'POST',
        path: '/creator',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let creator = request.payload
            console.log(creator)
            console.log(typeof creator)
            return response.response({
                creator: await creatorService.createCreator(creator)
            })
        }
        ,
        config : {
            //auth : authentification(creator)
        }
    },
    {
        method: 'GET',
        path: '/creatorid/{username}',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let creator = request.params
            return response.response({
                creator: await creatorService.findCreatorById(creator)
            })

        }
    },
    {
        method: 'GET',
        path: '/creatorname/{firstName}',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let creator: any = request.params;

            return response.response({
                creator: await creatorService.findCreatorByName(creator)
            });
        }
    },
    {
        method: 'PUT',
        path: '/creator',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let creator = request.payload
            return response.response({
                creator: await creatorService.updateCreator(creator)
            })
        }
    }
]

export default CreatorRouter;
