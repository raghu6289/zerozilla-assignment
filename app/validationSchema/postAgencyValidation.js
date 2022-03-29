import Joi from 'joi'

const client = Joi.object().keys({
    name : Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phoneNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    totalBill:Joi.number().min(1).required()
})

export default Joi.object({
    name : Joi.string().required().min(3),
    address1: Joi.string().required().min(3),
    address2:Joi.string(),
    state:Joi.string().required().min(2),
    city:Joi.string().required().min(2),
    phoneNumber:Joi.string().length(10).pattern(/^[0-9]+$/).required(),
    clients:Joi.array().items(client).required()
})