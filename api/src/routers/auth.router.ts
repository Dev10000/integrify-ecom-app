import express from 'express'
import passport from 'passport'

import login from '../controllers/auth.controller' // } // updateUser, // findAll, // deleteUser, // findById, // createUser, //{

const router = express.Router()
const idtokenAuth = passport.authenticate('google-id-token', { session: false })

// Every path we define here will get /api/v1/users prefix
router.post('/login', login)
router.post('/idtoken', idtokenAuth, login)
// router.get('/:userId', findById)
// router.put('/:userId', updateUser)
// router.delete('/:userId', deleteUser)
// router.post('/', createUser)

export default router
