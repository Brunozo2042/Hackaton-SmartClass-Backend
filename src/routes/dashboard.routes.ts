import express from 'express';
import {
  getAdminDashboardData,
  getProfessorDashboardData,
} from '../controllers/dashboard.controller';

const router = express.Router();

router.get('/admin', getAdminDashboardData);
router.get('/professor/:id', getProfessorDashboardData);

export default router;
