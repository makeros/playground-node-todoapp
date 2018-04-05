const express = require('express')
const exphbs = require('express-handlebars') // https://github.com/ericf/express-handlebars
const bodyParser = require('body-parser') // https://github.com/expressjs/body-parser
const cookieSession = require('cookie-session') // https://github.com/expressjs/cookie-session

// Components
const listTasks = require('./components/list-tasks')
const addTask = require('./components/add-task')
const removeTask = require('./components/remove-task')
const manageTasks = require('./components/manage-tasks')
const toggleCompleted = require('./components/toggle-task-complete')
const publicStore = require('./components/public-store')

const server = express()

const partialsDir = [
  './components'
]

server.use(bodyParser.urlencoded({extended: true}))

var options = {
  dotfiles: 'ignore',
  etag: false,
  extensions: ['css'],
  index: false,
  maxAge: '1d',
  redirect: false,
  setHeaders: function (res, path, stat) {
    res.set('x-timestamp', Date.now())
  }
}

server.use(express.static('public', options))

server.engine('hbs', exphbs({
  defaultLayout: 'default',
  extname: '.hbs',
  layoutsDir: 'views/layouts/',
  partialsDir: partialsDir
}))

server.set('view engine', 'hbs')
partialsDir.forEach(partial => {
  server.set('views', partial)
})

server.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

server.get('*', (req, res, next) => {
  // console.log(publicStore.getAll())
  const list = req.session.tasksList = req.session.isNew ? [] : req.session.tasksList
  // console.log('start task list', req.session.tasksList)
  res.locals.tasksList = {list}
  next()
})

server.get('/', listTasks)
server.post('/add', addTask)
server.post('/complete-task/', toggleCompleted.HTML)
server.put('/api/task/complete/:taskId', toggleCompleted.JSON)
server.get('/remove/:taskId', removeTask)
server.get('/manage', manageTasks)
server.get('/api/newest-tasks/:timestamp', (req, res) => {
  const timestamp = parseInt(req.params.timestamp, 10)

  const timeout = function () {
    setTimeout(() => {
      const newTasks = publicStore.getNewest(timestamp)
      console.log('is new task', newTasks, timestamp)
      if (newTasks.length) {
        res.json(newTasks)
      } else {
        timeout()
      }
    }, 1000)
  }
  timeout()
})

server.listen(3000, () => console.log('TODO app listening on port 3000!'))
