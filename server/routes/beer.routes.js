const express = require('express');
const { infoLogger } = require('../common/logger');
const { checkXuserHeader } = require('../middlewares/checkHeader');
const { validateReview } = require('../middlewares/validations/validateReview');
const { getbeer, saveReview, getReviews } = require('../services/beer.service');

const router = express.Router();

/**
 * @swagger
 * /beers:
 *   get:
 *     summary: Retrieve a list of beer from publicly available Punk API.
 *     description: Retrieve a list of beer from publicly available Punk API (https://api.punkapi.com/documentation/v2).
 *     parameters:
 *       - name: beer_name
 *         description: name of the beer.
 *         in: query
 *         required: false
 *         type: string
 *       - name: x-user
 *         description: email of user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: A list of beers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  type: object
 *                  properties:
 *                      id:
 *                          type: integer
 *                          description: beer ID
 *                          example: 1
 *                      name:
 *                          type: string
 *                          description: The beer's name
 *                          example: Buzz
 *                      description:
 *                          type: string
 *                          description: details about the beer
 *                          example: A light, crisp and bitter IPA brewed with English and American hops.
 *                      firstBrewed:
 *                          type: string
 *                          description: the date the beer was first brewed (MM/YYYY)
 *                          example: 09/2007
 *                      foodPairing:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: Spicy chicken tikka masala
 */
router.get('/beers', checkXuserHeader, async function (req, res, next) {
    try {
        const data = await getbeer(req.query.beer_name);
        res.status(200).send(data)
    } catch (e) {
        next(e);
    }
});


/**
 * @openapi
 * /beers/review/{id}:
 *   put:
 *     summary: Saves a beer review in database
 *     description: Saves a beer review in database
 *     parameters:
 *       - name: x-user
 *         description: email of the user
 *         in: header
 *         required: true
 *       - name: id
 *         description: id of the beer
 *         in: path
 *         required: false
 *         type: number
 *     requestBody:
 *       description: review for the beer
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              type: object
 *              required:
 *                  - rating
 *              properties:
 *                  rating:
 *                      type: number
 *                  comment:
 *                      type: string
 *     responses:
 *       201:
 *         description: created comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  id:
 *                      type: string
 *                      description: comment id
 *                      example: TODO
 *                  beerId:
 *                      type: number
 *                      description: id of beer
 *                      example: 1
 *                  rating:
 *                      type: number
 *                      description: rating for the beer (1-5)
 *                      example: 5
 *                  comment:
 *                      type: string
 *                      description: comment for the beer
 *                      example: Tastes awesome!
 */
router.put('/beers/review/:id', checkXuserHeader, validateReview, function (req, res, next) {
    saveReview(req, res, next);
});

/**
 * @swagger
 * /beers/reviews:
 *   get:
 *     summary: Retrieve a list of beer from publicly available Punk API.
 *     description: Retrieve a list of beer from publicly available Punk API (https://api.punkapi.com/documentation/v2).
 *     parameters:
 *       - name: x-user
 *         description: email of user
 *         in: header
 *         required: true
 *         type: string
 *     responses:
 *       201:
 *         description: created comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  $beer_id:
 *                      type: string
 *                      description: Id of a beer
 *                      example: TODO
 */
router.get('/beers/reviews', checkXuserHeader, function(req, res, next) {
    getReviews(req, res, next);
})

module.exports = router;