import {getRepository, Like} from "typeorm";
import {Creator} from "../entities/creator";
import * as Boom from "@hapi/boom";
import Util from '../util/util'


const util = new Util();

export class CreatorService {
    criteriaBuilder(criteria: Creator) {
        let criteriaBuilder = {
            queryString: '1=1',
            queryParams: {}
        };

        if (!(criteria.username === undefined) && !(criteria.username === "")) {
            criteriaBuilder = {
                ...criteriaBuilder,
                queryString: criteriaBuilder.queryString + "AND mst_creator.username ,username"
            }
            criteriaBuilder = {...criteriaBuilder, queryParams: Like(`%${criteria.username}`)}
        }
        if (!(criteria.password === undefined) && !(criteria.password === "")) {
            criteriaBuilder = {
                ...criteriaBuilder,
                queryString: criteriaBuilder.queryString + "AND mst_creator.password ,password"
            }
            criteriaBuilder = {...criteriaBuilder, queryParams: Like(`%${criteria.username}`)}
        }
        return criteriaBuilder
    }


    creatorRepository() {
        return getRepository(Creator);
    }

    // async findAllCreator(criteria: Creator){
    //     return await this.creatorRepository().createQueryBuilder('mst_creator').where(this.criteriaBuilder(criteria)).getMany();
    // }
    async findAllCreator() {
        return await this.creatorRepository().find();
    }

    async createCreator(creator: Creator) {
        let {password} = creator
        creator.password = await util.create(password)
        console.log(password)
        return await this.creatorRepository().save(creator);
    }

    async findCreatorById(creator: Creator) {
        let creatorId = await this.creatorRepository().findOne(creator);
        if (!creatorId) {
            throw Boom.notFound("Can not Find The Data");
        }
        return creatorId
    }

    async findCreatorByName(creator: Creator) {
        let creatorId = await this.creatorRepository().findOne(creator);
        if (!creatorId) {
            throw Boom.notFound("Can not Find The Data");
        }
        return creatorId
    }

    async updateCreator(creator: Creator) {
        let creatorId = await this.findCreatorById(creator.username)
        this.creatorRepository().merge(creatorId, creator)
        return await this.creatorRepository().save(creator)
    }


}
