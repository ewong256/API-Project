const express = require('express')

const { User, Spot, Review, SpotImage, ReviewImage, Booking } = require('../../db/models')

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router()

// Delete a reviewImage
router.delete("/:imageId", requireAuth, async (req, res, next) => {
    const deleteImage = await SpotImage.findByPk(req.params.imageId);

    if (!deleteImage) {
      err.status = 404
      const err = new Error('Resource not found')
      err.title = 'Resource not found'
      err.errors = { message: 'Image could not be found'}
      return next(err)
    }
    if (deleteImage.userId !== req.user.id) {
      const err = new Error('Must own the image to delete')
      err.status = 403
      err.title = 'Forbidden'
      err.errors= { message: 'Unauthorized for this action'}
      return next(err);
    }

    await deleteImage.destroy()

    res.status(200).json({ message: "Successfully deleted" })
  })

  module.exports = router;


module.exports = router
