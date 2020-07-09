const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let num = 0 

    blogs.forEach(blogEntry => {
        num += blogEntry.likes
    });

    return num
}

const favoriteBlog = (blogs) => {
    let fav = blogs[0]

    blogs.forEach(blogEntry => {
        if (blogEntry.likes > fav.likes) {
            fav = blogEntry
        }
    })
    
    return fav === undefined
        ? []
        : fav
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}