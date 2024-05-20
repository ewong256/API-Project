const express = require('express')

const { User, Spot, Review, SpotImage, ReviewImage } = require('../../db/models')

const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');



const router = express.Router()

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

// Current reviews route
router.get("/current", requireAuth, async (req, res) => {
    const currentUser = req.user.id;

    const allReviews = await Review.findAll({
      where: {
        userId: currentUser,
      },
      include: [
        {
          model: User,
          attributes: ['id', 'firstName', 'lastName'],
        },
        {
          model: Spot,
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: {
            model: SpotImage,
            attributes: ['url'],
          },
        },
        {
          model: ReviewImage,
          attributes: ['id', 'url'],
        },
      ],
    });

    const reviews = []

    allReviews.forEach(review => {
        const jsReview = review.toJSON()
        reviews.push(jsReview)
    })

    reviews.forEach(review => {
        const spotImages = review.Spot.spotImages
        if(spotImages && spotImages.length > 0) {
            const url = spotImages[0]
            review.Spot.previewImage = url
        }
        else {
            review.Spot.previewImage = null
        }
        delete review.Spot.SpotImages
    })
    res.status(200).json({ Reviews: reviews })
  });


// Add an image based on Review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id

    const { url } = req.body

    const review = await Review.findByPk(reviewId, {
        include: {
            model: Spot,
            include: SpotImage
        }
    })

    if(!review) {
        const err = new Error('Review could not be found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Review could not be found'}
        return next(err)
    }

    if(userId !== review.userId) {
        const err = new Error('Must own this review to delete')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }


    const reviewImages = await ReviewImage.findAll({
        where: {
            reviewId: review.id
        }
    })

    if(reviewImages.length >= 10) {
        const err = new Error('Maximum number of images for this resource was reached')
        err.status = 403
        err.title = 'Image Overflow'
        err.errors = { message: 'Maximum number of images for this resource was reached' }
    }

    const newReviewImage = await ReviewImage.create({
        reviewId: review.id,
        url
    })
    res.status(200).json({
        id: newReviewImage.id,
        url: newReviewImage.url
    })
})

// Update review from /:reviewId
router.put('/:reviewId', requireAuth, validateReview, async (req, res, next) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id
    const { review, stars } = req.body

    const updateReview = await Review.findByPk(reviewId)

    if(!updateReview) {
        const err = new Error('Review could not be found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Review could not be found'}
        return next(err)
    }

    if(userId !== updateReview.userId) {
        const err = new Error('Must own this review to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }

    updateReview.review = review
    updateReview.stars = stars

    await updateReview.save()
    res.status(200).json(updateReview)
})

// Delete a review from /:reviewId
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId
    const userId = req.user.id

    const deleteReview = await Review.findByPk(reviewId)

    if(!deleteReview) {
        const err = new Error('Review could not be found')
        err.status = 404
        err.title = 'Resource not found'
        err.errors = { message: 'Review could not be found'}
        return next(err)
    }

    if(userId !== deleteReview.userId) {
        const err = new Error('Must own this review to edit')
        err.status = 403
        err.title = 'Forbidden'
        err.errors= { message: 'Unauthorized for this action'}
        return next(err)
    }

    await deleteReview.destroy()

    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router
