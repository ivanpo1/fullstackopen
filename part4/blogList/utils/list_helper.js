const _ = require('lodash');

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, cur) => acc + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((max, blog) => blog.likes > max.likes ? blog : max, blogs[0])
}

const mostBlogs = (blogs) => {
    let authors = {}
    blogs.forEach(blog => {
        authors[blog.author] ? authors[blog.author]++ : authors[blog.author] = 1
    })

    let mostAuthor = ''
    let maxBlogs = 0

    for (const [author, count] of Object.entries(authors)) {
        if (count > maxBlogs) {
            maxBlogs = count
            mostAuthor = author
        }
    }

    return {
        author: mostAuthor,
        blogs: maxBlogs
    }
}

const mostBlogsLodash = (blogs) => {
    const authors = _.countBy(blogs, 'author')
    const [ author, blogCount ] = _.maxBy(_.toPairs(authors))
    return { author: author, blogs: blogCount}
}

const mostLikes = (blogs) => {
    const blogWithMostLikes = favoriteBlog(blogs)
    return { author: blogWithMostLikes.author, likes: blogWithMostLikes.likes}
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
    mostBlogsLodash
}

