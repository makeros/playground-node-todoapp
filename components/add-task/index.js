const publicStore = require('./../public-store')

module.exports = (req, res) => {
  console.log('add task: ', req.body)
  const newTask = {
    id: new Date().getTime().toString(),
    completed: false,
    title: req.body.title
  }

  if (req.body.public === 'on') {
    publicStore.add(newTask)
  } else {
    req.session.tasksList = [newTask].concat(req.session.tasksList)
  }
  res.redirect('/')
}
