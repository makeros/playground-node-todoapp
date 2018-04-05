let publicStore = [{
  id: new Date().getTime().toString(),
  title: 'Hello',
  completed: false,
  public: true
}]

module.exports = {
  add: function (task) {
    publicStore = publicStore.concat({
      ...task,
      public: true
    })
    console.log('add task to public')
  },
  getNewest: function (timestamp) {
    return publicStore.filter(task => {
      console.log('compare', parseInt(task.id, 10), timestamp)
      return parseInt(task.id, 10) > timestamp
    })
  },
  getAll: function () {
    return [].concat(publicStore)
  }
}
