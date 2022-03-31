import Joi from 'joi'

export default Joi.object({
        clientId: Joi.string(),
        agencyId: Joi.string(),
        name: Joi.string().min(3),
        email: Joi.string().email(),
        phoneNumber: Joi.string().length(10).pattern(/^[0-9]+$/),
        totalBill: Joi.number().min(1)
})