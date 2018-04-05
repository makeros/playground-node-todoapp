const http = require('http')
const publicStore = require('./../public-store')

module.exports = async (req, res) => {
  const payload = {...res.locals.tasksList}
  payload.list = payload.list.concat(publicStore.getAll())
  payload.list.sort((a, b) => {
    return a.id < b.id
  })

  // getRequest()
  //   .then((response) => {
  //     payload.call = response
  //     res.render('list-tasks/views/index', payload)
  //   })
  //   .catch(() => {
  //     res.send(500)
  //   })
  try {
    payload.call = await getRequest()
    res.render('list-tasks/views/index', payload)
  } catch (e) {
    res.send(500)
  }
}

function getRequest () {
  return new Promise((resolve, reject) => {
    const i = Math.floor(Math.random() * 10)
    console.log('=====> ', i)

    http.get('http://jsonplaceholder.typicode.com/posts/' + i, (res) => {
      let rawData = ''

      res.on('data', (chunk) => { rawData += chunk })

      res.on('end', () => {
        try {
          console.log(rawData)
          const parsedData = JSON.parse(rawData)
          resolve(parsedData)
          // console.log(parsedData)
        } catch (e) {
          reject(e)
          console.error(e.message)
        }
      })
    }).on('error', (e) => reject(e) )
  })
}
