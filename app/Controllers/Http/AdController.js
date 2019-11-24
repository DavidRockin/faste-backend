'use strict'

const Ad = use('App/Models/Ad')
class AdController {
    async index({response}) {
        const ads = await Ad.all();
        return response.send({
            error: false,
            ads
        });
    }

    async show({params, response}) {
        const ad = await Ad.find(params.adId);
        return response.send({
            error: false,
            ad
        });
    }

    async store({ request, response, auth }) {
        const user = await auth.getUser()
        const adInfo = { ...request.all(), userId: user._id, userEmail: user.email }
        const ad = await Ad.create(adInfo);
        return response.status(201).send({
            error: false,
            ad
        });
    }

    async update({ params, request, response }) {
        const adInfo = request.all()
        const ad = await Ad.find(params.adId);
        ad.merge(adInfo);
        await ad.save();
        return response.status(200).send({
            error: false,
            ad
        });
    }

}

module.exports = AdController
