import { Document, FilterQuery, Model, UpdateQuery } from 'mongoose';


export  class BaseRepository <T extends Document>{
  constructor(protected readonly entityModel: Model<T>) {}

  async create(payload: any):Promise<T>{
    return new this.entityModel(payload).save()
  }

  async createMany(payloads: any[]) {
    return this.entityModel.insertMany(payloads,{ordered:true})
  }

  async findOne(entityFilterQuery: FilterQuery<T>, projection?: Partial<T | null> ): Promise<T | any> {
    if(projection){
      return this.entityModel.findOne(entityFilterQuery, projection).lean()
    }
    return this.entityModel.findOne(entityFilterQuery).lean()
  }

  async find(entityFilterQuery: FilterQuery<T>, projection?: Partial<T | any>, sort?: Partial<T | any>): Promise<T[] | null>{
    if(projection && sort){
      return this.entityModel.find(entityFilterQuery, projection).sort(sort).lean()
    }
    if(projection){
      return this.entityModel.find(entityFilterQuery, projection).lean()
    }

    if(sort){
      return this.entityModel.find(entityFilterQuery).sort(sort).lean()
    }
    return this.entityModel.find(entityFilterQuery).lean()
  }

  async findOneAndUpdate(entityFilterQuery: FilterQuery<T>, payload: UpdateQuery<T>): Promise<T | null>{
    return this.entityModel.findOneAndUpdate(entityFilterQuery, payload);
  }

  async deleteOne(entityFilterQuery: FilterQuery<T>): Promise<any>{
    return this.entityModel.deleteOne(entityFilterQuery)
  }

  async deleteMany(entityFilterQuery: FilterQuery<T>): Promise<any>{
    return this.entityModel.deleteMany(entityFilterQuery)
  }
}
