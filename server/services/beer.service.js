const PUNK_API_BASE = 'https://api.punkapi.com/v2/beers';
const axios = require('axios');
const { errorLogger } = require('express-winston');
const { infoLogger } = require('../common/logger');
const cache = require('memory-cache');
const { DbService } = require('../database/db.service');

const NO_BEER_IN_QUERY = 'no_beer_in_query_string';

/**
 * Function to get search beer by beerName in punk API
 * Results are stored in cache for future call of this function
 * Formats the received data from punk API before returning
 * 
 * @param {string} beerName `string` (optional) beer name search string
 * @returns 
 */
exports.getbeer = async (beerName) => {
    const beers = cache.get(beerName || NO_BEER_IN_QUERY);
    if(beers) {
        infoLogger(`Search result for ${beerName || NO_BEER_IN_QUERY} found in cache`);
        return JSON.parse(beers);
    }

    infoLogger(`Search result for ${beerName || NO_BEER_IN_QUERY} not found in cache, getting data from Punk API`)
    const punkApiUrl = !beerName ? PUNK_API_BASE : `${PUNK_API_BASE}?beer_name=${beerName}`;
    const { data } = await axios.get(punkApiUrl);
    const formattedData =  (data || []).map(item => ({
        id: item.id,
        name: item.name,
        description: item.description,
        firstBrewed: item.first_brewed,
        foodPairing: item.food_pairing,
        imageUrl: item.image_url,
    }))
    cache.put(beerName || NO_BEER_IN_QUERY, JSON.stringify(formattedData));
    return formattedData;
}

exports.saveReview = (req, res, next) => {
    return DbService.updateReview(req, res, next);
}

exports.getReviews = (req, res, next) => {
    return DbService.getReviews(req, res, next);
}