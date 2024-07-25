const apiKey = 'a5f5d52856324389810337bcaacc8751';

const blogContainer = document.getElementById('blog-container');

const searchInput = document.getElementById('search-input');

const searchButton = document.getElementById('search-button');

async function fetchRandomNews(){
    try {
        const apiUrl = `https://newsapi.org/v2/top-headlines?sources=techcrunch&pageSize=10&apiKey=${apiKey}`;
        // fetch the api url
        const response = await fetch(apiUrl);
        // convert the response to json
        const data = await response.json();
        console.log("Random news", data);
        return data.articles;
    } catch(error) {
        console.error("Error fetching random news", error);
        return [];
    }
}

searchButton.addEventListener('click', async () => {
    const searchValue = searchInput.value.trim();

    if(searchValue !== "") {
        try {
            const articles = await fetchNewsValue(searchValue);
            displayBlogs(articles);
        } catch(error) {
            console.log("Error fetching search news by search value", error);
        }
    }
});

async function fetchNewsValue(searchValue){
    try {
        const apiUrl = `https://newsapi.org/v2/everything?q=${searchValue}&pageSize=10&apiKey=${apiKey}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log("Search news by search value", data);
        return data.articles;
    } catch(error) {
        console.error("Error fetching search news by search value", error);
        return [];
    }
}

function displayBlogs(articles){
    // clear the blog container
    blogContainer.innerHTML = "";
    articles.forEach((article) => {
        // create div tag
        const blogPost = document.createElement('div');
        blogPost.classList.add('blog-post');
        // save image
        const img = document.createElement('img');
        img.src = article.urlToImage;
        img.alt = article.title;
        // save title
        const title = document.createElement('h2');
        // truncate the title if it is too long
        const truncatedTitle = article.title.length > 30? article.title.slice(0, 30) + "...." : article.title;
        // pass the title to the title tag
        title.textContent = truncatedTitle;
        // save description
        const description = document.createElement('p');
        // truncate the description if it is too long
        const truncatedDescription = article.description.length > 120? article.description.slice(0, 120) + "...." : article.description;
        // pass the description to the description tag
        description.textContent = truncatedDescription;

        // add the image, title and description to the blog post

        blogPost.appendChild(img);
        blogPost.appendChild(title);
        blogPost.appendChild(description);
        blogPost.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });
        blogContainer.appendChild(blogPost);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch(error) {
        console.error("Error displaying blogs", error);
    }
})();
