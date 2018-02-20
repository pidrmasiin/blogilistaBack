const listHelper = require('../utils/list_helper')

describe('favorite', () => {
  test('authorOfMostLikes', () => {
    const mostlikes = listHelper.mostLikes()
    expect(mostlikes.author).toEqual('Edsger W. Dijkstra')
  })
  test('titleOfMostLiked', () => {
    const mostlikes = listHelper.mostLikes()
    expect(mostlikes.title).toEqual('Canonical string reduction')
  })

})