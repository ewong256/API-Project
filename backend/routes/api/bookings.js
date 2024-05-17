const express = require('express')

const { User, Spot, Review, SpotImage, ReivewImage, Booking } = require('../../db/models')

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
                ]
            }
        ],
        include: [
            {
                model: SpotImage,
                attributes: { exclude: [ 'createdAt', 'updatedAt' ]}
            }
        ]
    })
    res.status(200).json({ Bookings: bookings })
})
