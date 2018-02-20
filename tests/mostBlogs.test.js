const listHelper = require('../utils/list_helper')

describe('mostBlogs', () => {
  const blogger = listHelper.mostBlogs()
  test('authorOfMostBlogs', () => {
    expect(blogger.name).toEqual('Robert C. Martin')
  })
  test('numberOfBlogs', () => {
    expect(blogger.blogs).toEqual(3)
  })

})