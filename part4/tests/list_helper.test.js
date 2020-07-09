const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  expect(listHelper.dummy([])).toBe(1)
})

describe('total likes', () => {
  const singleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
      expect(listHelper.totalLikes(singleBlog)).toBe(5)
  })

  const multiBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'EMichael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]

  test('when list has multiple blogs equals the likes of that', () => {
    expect(listHelper.totalLikes(multiBlogs)).toBe(12)
  })

  const zeroBlogs = []

  test('when list has zero blogs equals the likes of that', () => {
    expect(listHelper.totalLikes(zeroBlogs)).toBe(0)
  })

})

describe('favorite blog', () => {
  const singleBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the result is correct', () => {
      expect(listHelper.favoriteBlog(singleBlog)).toEqual(singleBlog[0])
  })

  const multiBlogs = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu',
      likes: 5,
      __v: 0
    },
    {
      _id: '5a422a851b54a676234d17f7',
      title: 'React patterns',
      author: 'EMichael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      __v: 0
    }
  ]  

  test('when list has multiple blogs result is correct', () => {
    expect(listHelper.favoriteBlog(multiBlogs)).toEqual(multiBlogs[1])
})

const zeroBlogs = []

test('when list has zero blogs result is empty list', () => {
  expect(listHelper.favoriteBlog(zeroBlogs)).toEqual([])
})

})