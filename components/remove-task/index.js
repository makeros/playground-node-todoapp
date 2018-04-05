module.exports = (req, res) => {
  const taskId = req.params.taskId
  req.session.tasksList = req.session.tasksList.filter(task => {
    return task.id !== taskId
  })
  console.log(req.session.tasksList)
  res.redirect('back')
}
