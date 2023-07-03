import { Router } from 'express';
import { verifyToken } from '../middlewares/LoginMiddleware';
import {
  createNewMatch,
  finishMatch,
  getAllMatches,
  updateMatch,
} from '../controllers/MatchesController';
import { validateMatchesFields, validateMatchesTeams } from '../middlewares/MatchesMiddleware';

const router = Router();

router.get('/', getAllMatches);
router.post('/', verifyToken, validateMatchesFields, validateMatchesTeams, createNewMatch);
router.patch('/:id/finish', finishMatch);
router.patch('/:id', updateMatch);

export default router;
