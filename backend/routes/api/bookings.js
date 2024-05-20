const express = require('express')

const { User, Spot, Review, SpotImage, ReivewImage, Booking } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router()

// Booking dates validations
const validateBookings = [
    check('startDate')
        .exists({ checkFalsy: true })
        .withMessage('startDate is required')
        .custom((value) => {
            const currDate = new Date()
            if (new Date(value) < currDate) {
                throw new Error('Start date cannot be in the past')
            }
            return true
        }),
    check('endDate')
        .exists({ checkFalsy: true })
        .withMessage('endDate is required')
        .custom((value, { req }) => {
            const start = req.body.startDate
            const end = new Date(value)
            if (start === value) {
                throw new Error('Start and end dates cannot be the same')
            }
            if (end <= new Date(start)) {
                throw new Error('End date cannot be before start date')
            }
            return true
        }),
        handleValidationErrors
]

// Current user bookings
router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Spot,
                attributes: [
                    'id',
                    'address',
                    'city',
                    'state',
                    'country',
                    'description',
                    'lat',
                    'lng',
                    'name',
                    'price',
                    'state'
                ],
                include: [
                    {
                        model: SpotImage,
                        attributes: { exclude: [ 'createdAt', 'updatedAt' ]}
                    }
                ]
            }
        ],
    })

    const resBookings = []
    bookings.forEach(booking => {
        const jsBooking = booking.toJSON()
        resBookings.push(jsBooking)
    })

    resBookings.forEach(booking => {
        const spotImages = booking.Spot.spotImages
        if(spotImages && spotImages.length > 0) {
            const url = spotImages[0]
            booking.Spot.previewImage = url
        }
        else {
            booking.Spot.previewImage = null
        }
        delete booking.Spot.SpotImages
    })
    res.status(200).json({ Bookings: resBookings })
})

// Edit a booking
router.put('/:bookingId', requireAuth, validateBookings, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const userId = req.user.id

    const { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId)


    if(!booking) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Booking could not be found'}
        return next(err)
    }
    if(userId !== booking.userId) {
        const err = new Error('Must own the booking to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }

    const currDate = new Date()
    if(new Date(booking.endDate) < currDate) {
        return res.status(400).json({
            message: 'Cannot make changes to a booking in the past'
        })
    }


    const bookingConflict = await Booking.findAll({
        where: {
            id: { [Op.ne]: bookingId },
            spotId: booking.spotId,
            [Op.or]: [
                {startDate: { [Op.between]: [startDate, endDate] }},
                {endDate: { [Op.between]: [startDate, endDate] }},
                {[Op.and]: [{ startDate: { [Op.lte]: startDate }}, {endDate: { [Op.gte]: endDate } }] }
            ]
        }
    })

    if(bookingConflict.length >= 1) {
        const err = new Error('A booking already exists for the specified date')
        err.status = 403
        err.errors = {
            startDate: 'Start date conflicts with an existing booking',
            endDate: 'End date conflicts with an existing booking'
          }
        return next(err)
    }


    booking.startDate = startDate
    booking.endDate = endDate
    await booking.save()
    res.status(200).json(booking)
})

// Delete a booking
router.delete('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const userId = req.user.id

    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Booking could not be found'}
        return next(err)
    }

    if(userId !== booking.userId) {
        const err = new Error('Must own the booking to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }


     const currDate = new Date()
    if(new Date(booking.endDate) < currDate) {
        return res.status(403).json({
            message: 'Cannot delete a booking in the past'
        })
    }

    await booking.destroy()

    res.status(200).json(
        {
            message: 'Successfully deleted'
        }
    )
})

module.exports = router
