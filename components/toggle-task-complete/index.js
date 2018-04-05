
exports.JSON = (req, res) => {
  console.log('list', req.session.tasksList)
  const newTask = toggleTask(req, res)
  req.session.tasksList = getUpdatedTasksList(
    req,
    res,
    newTask
  )
  res.json(newTask)
}

exports.HTML = (req, res) => {
  req.session.tasksList = getUpdatedTasksList(
    req,
    res,
    toggleTask(req, res)
  )
  res.redirect('back')
}

function getUpdatedTasksList (req, res, newTask) {
  return req.session.tasksList.map(task => (
    (task.id === req.params.taskId) && newTask ? newTask : task
  ))
}

function toggleTask (req, res) {
  console.log(req.session.tasksList, req.params.taskId)
  return toggleComplete(
    findTask(req.session.tasksList, req.params.taskId)
  )
}

function toggleComplete (task) {
  return task ? {...task, completed: !task.completed} : false
}

function findTask (tasksList, taskId) {
  return tasksList
    .find(task => task.id === taskId) || false
}
