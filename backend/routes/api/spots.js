const express = require('express')

const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models')

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const { Op } = require('sequelize')

const router = express.Router()

// Spot validation
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .isFloat({ min: -90, max: 90 })
        .withMessage('lat must be between -90 and 90'),
    check('lng')
        .isFloat({ min: -180, max: 180 })
        .withMessage('lng must be between -180 and 180'),
    check('name')
        .isLength({ min: 1, max: 50 })
        .withMessage('Name cannot be more than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .isFloat({ min: 0, max: Infinity })
        .withMessage('Price must be greater than 0'),
    handleValidationErrors
]

// Review validation
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .withMessage('Review text is required'),
    check('stars')
        .exists({ checkFalsy: true })
        .isInt({ min: 1, max: 5})
        .withMessage('Stars must be a whole number between 1 and 5'),
    handleValidationErrors
]

// Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        // Old code
        // include: [
        //     { model: Review, attributes: ['stars'] },
        //     { model: SpotImage, attributes: ['url', 'preview'] }
        // ]
    });
    for(let spot of spots) {
        const reviews = await spot.getReviews()
        const spotImages = await spot.getSpotImages()

        const total = reviews.reduce(
            (sum, review) => sum + review.stars, 0
        )
        const rateAvg = total / reviews.length
        spot.dataValues.avgRating = rateAvg
        spot.dataValues.previewImage = spotImages[0].url
    }
    return res.status(200).json({Spots: spots})
});



// Get all spots from current user
router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id

    const currSpots = await Spot.findAll({
        where: { ownerId: userId }
    })
    for(let spot of currSpots) {
        const reviews = await spot.getReviews()
        const spotImages = await spot.getSpotImages()

        const total = reviews.reduce(
            (sum, review) => sum + review.stars, 0
        )

        const rateAvg = total / reviews.length

        spot.dataValues.avgRating = rateAvg
        spot.dataValues.previewImage = spotImages[0].url
    }
    res.status(200).json({Spots: currSpots})
})

// Get details of Spot from an id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: User,
                as: 'Owner',
                attributes: ['id', 'firstName', 'lastName']
            }
        ]
    })
    const reviews = await spot.Reviews

    const total = reviews.reduce(
        (sum, review) => sum + review.stars, 0
    )

    const rateAvg = total / reviews.length

    spot.dataValues.numReviews = reviews.length
    spot.dataValues.avgRating = rateAvg

    return res.status(200).json(spot)
})


// Create a new Spot
router.post('/', requireAuth, validateSpot, async(req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const newSpot = await Spot.create({
        ownerId: req.user.id,
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price
    })
    res.status(201).json(newSpot)
})


// Add spot image to :spotId
router.post('/:spotId/images', requireAuth, async(req, res, next) => {
    const spotId = req.params.spotId

    const { url, preview } = req.body

    const userId = req.user.id

    const currSpot = await Spot.findByPk(spotId)

    if(!currSpot) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors({ message: 'Resource not found' })
        return next(err)
    }

    if(userId !== currSpot.ownerId) {
        const err = new Error('Must own the spot to add an image')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }
    const newImage = await SpotImage.create({
        spotId: spot.id,
        url,
        preview
    })
    res.status(200).json({
        id: newImage.id,
        url: newImage.url,
        preview: newImage.preview
    })
})


// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async(req, res, next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body

    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        return next(err)
    }
    if(userId !== spot.ownerId) {
        const err = new Error('Must own the spot to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }
    spot.address = address
    spot.city = city
    spot.state = state
    spot.country = country
    spot.lat = lat
    spot.lng = lng
    spot.name = name
    spot.description = description
    spot.price = price

    await spot.save()
    res.status(200).json(spot)
})

// Delete a spot
router.delete('/:spotId', requireAuth, async(req, res, next) => {
    const userId = req.user.id
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        return next(err)
    }
    if(userId !== spot.ownerId) {
        const err = new Error('Must own the spot to delete')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }
    await spot.destroy()

    res.status(200).json({ message: 'Successfully deleted'})
})

// Get all reviews from a spotId
router.get('/:spotId/reviews', async(req, res) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)
    if(!spot) {
        const err = new Error('Could not find spot with the specified id')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: `Spot couldn't be found`}
        return next(err)
    }

    const reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })
    res.status(200).json({ Reviews: reviews })
})

// Create a review based on spotId
router.post('/:spotId/reviews', requireAuth, validateReview, async(req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const { review, stars } = req.body

    const spot = await Spot.findByPk(spotId, {
        include: {
            model: Review,
            attributes: ['userId']
        }
    })
    if(!spot) {
        const err = new Error('Could not find spot with the specified id')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: `Spot couldn't be found`}
        return next(err)
    }
    const newReview = await Review.create({
        spotId: spot.id,
        userId: userId,
        review,
        stars
    })
    res.status(201).json(newReview)
})

// Get all bookings from spotId
router.get('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id

    const spot = await Spot.findByPk(spotId, {
        include: {
            model: Booking,
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        }
    })
    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })
    res.status(200).json({ Bookings: bookings })
})



// Create booking from spotId
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const { startDate, endDate } = req.body

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = new Error('Spot not found')
        err.status = 404
        throw err
    }

    const bookingExists = await Booking.findOne({
        where: {
            spotId,
            [Op.or]: [
                {startDate: {[Op.between]: [startDate, endDate]}},
                {endDate: {[Op.between]: [startDate, endDate]}}
            ]
        }
    })

    if(bookingExists) {
        const err = new Error('A booking already exists for the specified date')
        err.status = 403
        throw err
    }

    const newBooking = await Booking.create({
        userId,
        spotId,
        startDate,
        endDate
    })
    res.status(201).json(newBooking)
})

module.exports = router
