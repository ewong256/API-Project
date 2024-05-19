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
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90 })
        .withMessage('lat must be between -90 and 90'),
    check('lng')
        .exists({ checkFalsy: true })
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

// Query validation
const validateQuery = [
    check('page')
        .optional()
        .isInt({ min: 1, max: 10 })
        .withMessage('Page must be greater than or equal to 1'),
    check('size')
        .optional()
        .isInt({ min: 1, max: 20 })
        .withMessage('Size must be greater than or equal to 1'),
    check('minLat')
        .optional()
        .isFloat({ min: -90 })
        .withMessage('Minimum lat cannot be less than -90'),
    check('maxLat')
        .optional()
        .isFloat({ max: 90 })
        .withMessage('Maximum lat cannot be more than 90'),
    check('minLng')
        .optional()
        .isFloat({ min: -180 })
        .withMessage('Minimum lng cannot be less than -180'),
    check('maxLng')
        .optional()
        .isFloat({ max: 180 })
        .withMessage('Maximum lng cannot be more than 180'),
    check('minPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Minimum price cannot be negative'),
    check('maxPrice')
        .optional()
        .isFloat({ min: 0 })
        .withMessage('Maximum price must be greater than or equal to 0'),
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
router.get('/', validateQuery, async (req, res) => {
    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice } = req.query

    let where = {}

    minLat = minLat ? minLat : -90
    maxLat = maxLat ? maxLat : 90
    minLng = minLng ? minLng : -180
    maxLng = maxLng ? maxLng : 180
    minPrice = minPrice ? minPrice : 0
    maxPrice = maxPrice ? maxPrice : 1000

    where.lat = { [ Op.between ] : [ minLat, maxLat ] }
    where.lng = { [ Op.between ] : [ minLng, maxLng ] }
    where.price = { [ Op.between ] : [ minPrice, maxPrice ] }


    const pagination = {}

    if(!page) page = 1

    if(!size) size = 20

    page = parseInt(page)
    size = parseInt(size)

    if(Number.isInteger(page) && Number.isInteger(size) && page > 0 && size > 0 && size <= 20) {
        pagination.limit = size
        pagination.offset = size * (page - 1)
    }

    const spots = await Spot.findAll({
        where,
        ...pagination
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
    return res.status(200).json({
        Spots: spots,
        page,
        size,
    })
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
        spot.dataValues.previewImage = spotImages ? spotImages[0].url : null
    }
    res.status(200).json({Spots: currSpots})
})

// Get details of Spot from an id
router.get('/:spotId', async (req, res, next) => {
    const spot = await Spot.findByPk(req.params.spotId, {
        include: [
            {
                model: Review,
                attributes: ['id', 'stars']
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


    if(!spot) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Resource not found' }
        return next(err)
    }

    const { id, ownerId, address, city, state, lat, lng, name, description, price, createdAt, updatedAt, SpotImages, Owner } = spot

    const starRatings = spot.Reviews.map(review => review.stars)

    const numReviews = spot.Reviews.length

    const rateAvg = numReviews > 0 ? (starRatings.reduce((acc, sum) => acc + sum)) / numReviews : 0

    const formattedSpot = {
        id,
        ownerId,
        address,
        city,
        state,
        lat,
        lng,
        name,
        description,
        price,
        createdAt,
        updatedAt,
        numReviews: numReviews,
        avgStarRating: rateAvg,
        SpotImages: SpotImages || null,
        Owner: Owner
    }


    return res.status(200).json(formattedSpot)
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
        err.errors = { message: 'Resource not found' }
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
        spotId: currSpot.id,
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
router.get('/:spotId/reviews', async(req, res, next) => {
    const spotId = req.params.spotId

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: `Resource not found`}
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

    const userReview = await Review.findAll({
        where: {
            spotId: spotId,
            userId: userId
        }
    })

    if(!spot) {
        const err = new Error('Could not find spot with the specified id')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: `Spot couldn't be found`}
        return next(err)
    }

    if(userReview.length >= 1) {
        const err = new Error('User already has a review for this spot')
        err.status = 500
        err.errors = { message: 'User already has a review for this spot'}
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

    if(!spot) {
        const err = new Error('Could not find spot with the specified id')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: `Spot couldn't be found`}
        return next(err)
    }

    const bookings = await Booking.findAll({
        where: {
            spotId: spotId
        }
    })


    const jsSpot = spot.toJSON()

    if(jsSpot.ownerId === userId) {

        const formattedBookings = []

        jsSpot.Bookings.forEach((booking) => {
            formattedBookings.push(booking)
        })
        res.status(200).json({ Bookings: formattedBookings })
    }
    else {
        res.status(200).json({ Bookings: bookings })
    }

})



// Create booking from spotId
router.post('/:spotId/bookings', requireAuth, async (req, res, next) => {
    const spotId = req.params.spotId
    const userId = req.user.id
    const { startDate, endDate } = req.body

    const spot = await Spot.findByPk(spotId)

    if(!spot) {
        const err = new Error('Spot not found')
        err.status = 404
        return next(err)
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
        return next(err)
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
