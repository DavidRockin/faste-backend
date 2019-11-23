'use strict'

const Ad = use('App/Models/Ad')
class AdController {
    async index({response}) {
        let ads = await Ad.all();
        response.implicitEnd = false;
        return response.send({
            error: false,
            ads
        });
    }
}

module.exports = AdController
