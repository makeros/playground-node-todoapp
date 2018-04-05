module.exports = (req, res) => {
  res.render('manage-tasks/views/index', {...res.locals.tasksList})
}
