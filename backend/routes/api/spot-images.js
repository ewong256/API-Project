const express = require('express')

const { User, Spot, Review, SpotImage, ReivewImage, Booking } = require('../../db/models')

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

// Delete a spotImage
router.delete('/:imageId', requireAuth, async(req, res, next) => {
    const userId = req.user.id
    const imageId = req.params.imageId

    const spotImage = await SpotImage.findByPk(imageId, { include: { model: Spot } }
    )

    if(!spotImage) {
        const err = new Error('Resource not found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Image could not be found'}
        return next(err)
    }
    if(userId !== spotImage.Spot.ownerId) {
        const err = new Error('Must own the image to delete')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }
    await spotImage.destroy()
    res.status(200).json({ message: 'Successfully deleted' })
})



module.exports = router
