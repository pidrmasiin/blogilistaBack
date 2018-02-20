const listHelper = require('../utils/list_helper')

describe('mostLikedBlogger', () => {
  const mostliked = listHelper.mostLiked()
  test('authorOfMostLiked', () => {
    expect(mostliked.name).toEqual('Edsger W. Dijkstra')
  })
  test('likesOfMostLiked', () => {
    expect(mostliked.likes).toBe(17)
  })

})