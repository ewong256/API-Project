const express = require('express')

const { User, Spot, Review, SpotImage, ReivewImage, Booking } = require('../../db/models')
const { Op } = require('sequelize')
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');


const router = express.Router()

// Current user bookings
router.get('/current', requireAuth, async(req, res) => {
    const userId = req.user.id
    const bookings = await Booking.findAll({
        where: {
            userid: userId
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
router.put('/:bookingId', requireAuth, async (req, res, next) => {
    const bookingId = req.params.bookingId
    const spotId = req.params.spotId
    const userId = req.user.id

    const { startDate, endDate } = req.body

    const booking = await Booking.findByPk(bookingId)

    if(!booking) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Booking could not be found'}
    }
    if(userId !== booking.userId) {
        const err = new Error('Must own the booking to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
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

    if (booking.startDate <= Date.now()) {
        const err = new Error('Cannot edit past bookings');
        err.status = 403;
        err.errors = { message: 'Cannot edit past bookings' };
        err.title = 'Forbidden'
        return next(err);
    };

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
    }

    if(userId !== booking.userId) {
        const err = new Error('Must own the booking to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }


    if (booking.startDate <= Date.now()) {
        const err = new Error('Cannot delete past bookings');
        err.status = 403;
        err.errors = { message: 'Cannot delete past bookings' };
        err.title = 'Forbidden'
        return next(err);
    };

    await booking.destroy()

    res.status(200).json(
        {
            message: 'Successfully deleted'
        }
    )
})

module.exports = router
