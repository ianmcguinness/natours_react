import express from 'express'
import {
  getAllTours,
  createTour,
  getTourById,
  updateTour,
  deleteTour,
  topTours,
  getTourStats,
  getMonthlyPlan
} from '../controllers/tourController.js'

const router = express.Router()

router.route('/top-5-cheap').get(topTours, getAllTours)
router.route('/tour-stats').get(getTourStats)
router.route('/monthly-plan/:year').get(getMonthlyPlan)
router.route('/').get(getAllTours).post(createTour)
router.route('/:id').get(getTourById).patch(updateTour).delete(deleteTour)

export default router
