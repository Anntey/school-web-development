const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User
      .find({})
      .populate('blogs', { url: 1, title: 1, author: 1})
  response.json(users.map(u => u.toJSON()))
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User
      .findById(request.params.id)
      .populate('blogs', { author: 1, title: 1, url: 1 })
  response.json(user)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  const saltRounds = 10
  const passHashed = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash: passHashed,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
