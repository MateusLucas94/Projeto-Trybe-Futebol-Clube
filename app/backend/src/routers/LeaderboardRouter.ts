import { Router } from 'express';
import {
  leaderboard,
  leaderboardAway,
  leaderboardHome,
} from '../controllers/LeaderboardController';

const router = Router();

router.get('/home', leaderboardHome);
router.get('/away', leaderboardAway);
router.get('/', leaderboard);

export default router;
