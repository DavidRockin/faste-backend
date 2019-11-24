'use strict'

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});


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
        const adInfo = { ...request.all(), userId: user._id, userEmail: user.email, userName: user.name, userTel: user.telephone }
        
        if (adInfo.file) {
            adInfo.file = await toBase64(adInfo.file)
        }
        
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
