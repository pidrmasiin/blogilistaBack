const listHelper = require('../utils/list_helper')


describe('likes', () => {
  test('totalLikes', () => {
    const result = listHelper.totalLikes()
    expect(result).toBe(36)
  })
  test('mostLikes', () => {
    const highestlikes = listHelper.highestLikes()
    expect(highestlikes).toBe(12)
  })
})