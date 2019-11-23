'use strict'

class ListingController {
  getListings({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }

  createListing({ request, response}) {
    response.implicitEnd = false
    return response.send({
      error: false,
      message: `....`
    })
  }
}

module.exports = ListingController
