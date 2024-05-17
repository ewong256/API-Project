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

    const reviews = allReviews.map((review) => {
        const Review = review.toJSON();
        Review.previewImage = review.Spot.SpotImages[0].url;
        delete Review.Spot.SpotImages;
        return Review;
        
    });
    res.status(200).json(reviews);
  });


// Add an image based on Review id
router.post('/:reviewId/images', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId

    const { url } = req.body

    const review = await Review.findByPk(reviewId, {
        include: {
            model: Spot,
            include: SpotImage
        }
    })
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
    const { review, stars } = req.body

    const updateReview = await Review.findByPk(reviewId)

    updateReview.review = review
    updateReview.stars = stars

    await updateReview.save()
    res.status(200).json(updateReview)
})

// Delete a review from /:reviewId
router.delete('/:reviewId', requireAuth, async (req, res, next) => {
    const reviewId = req.params.reviewId

    const deleteReview = await Review.findByPk(reviewId)

    await deleteReview.destroy()

    res.json({
        message: 'Successfully deleted'
    })
})

module.exports = router
