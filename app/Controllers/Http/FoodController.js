'use strict'

const Axios = use('Axios');
const Config = use('Config')
const nutritionixApi = Config.get('app.nutritionixApi');
class FoodController {
    /**
   * Controller for retrieving messages
   * @params .userId {string} userID for user querying messages
   * @querParms .specificUserId {string} userID to filter messages
   * @queryParms .unread {boolean} messages that have not been read by receiver
   */
  async retrieveFoods({ request, response}) {
    const queryParms = request.get();
    try{
        const {data} = await Axios.get(nutritionixApi.url + '/search/instant?query='+queryParms.query, {
            headers: nutritionixApi.headers
        });
        
        return response.send({
            error: false,
            foods: data
        })

    } catch (error) {
        return response.send({
            error: true,
            error
          })
    }

  }

  async getFoodNutrients({ request, response}) {
    const queryParms = request.get();
    try{
        let apiResponse = '';
        // Looks for items using nix_item_id
        if(queryParms.nix_item_id){
            apiResponse = await Axios.get(nutritionixApi.url + '/search/item?nix_item_id='+queryParms.nix_item_id, {
                headers: nutritionixApi.headers
            });
        }else if(queryParms.food_name){
            apiResponse = await Axios.post(nutritionixApi.url + '/natural/nutrients', 
            {query: queryParms.food_name},
            {headers: nutritionixApi.headers});
        }

        return response.send({
            error: false,
            foods: apiResponse.data
        });

    } catch (error) {
        console.log(error);
        return response.send({
            error: true,
            error: error
        });
    }
  }
}

module.exports = FoodController
