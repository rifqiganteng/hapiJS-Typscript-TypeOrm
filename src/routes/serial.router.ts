import {SerialService} from "../services/serial.service";
import * as hapi from 'hapi';


const serialService = new SerialService();
const SerialRouter = [
    {
        method: 'GET',
        path: '/serials',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            return response.response({
                serial: await serialService.findAllSerial()
            })
        }
    },
    {
        method: 'POST',
        path: '/serial',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let serial = request.payload
            return response.response({
                serial: await serialService.createSerial(serial)
            })
        }
    },
    {
        method: 'GET',
        path: '/serialid/{idSerial}',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let serial = request.params
            return response.response({
                serial: await serialService.findSerialById(serial)
            })
        }
    },
    {
        method: 'PUT',
        path: '/serial',
        handler: async (request: hapi.Request, response: hapi.ResponseToolkit) => {
            let serial = request.payload
            return response.response({
                serial: await serialService.updateSerial(serial)
            })
        }
    }
]
export default SerialRouter