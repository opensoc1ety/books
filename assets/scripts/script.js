document.querySelector('.btn').addEventListener('click', function(){
    fetch('https://www.poemist.com/api/v1/randompoems')
    .then(response => response.json())
    .then(data => {display_poems(data)})
})

function display_poems(poems)
{
    for (let i = 0; i < poems.length; ++i)
        document.querySelector('.poems').prepend(get_poem(poems[i]));
}

function get_poem(p)
{
    let article = document.createElement("article");
    article.setAttribute('class', 'poems__poem');
    let poet = document.createElement("p");
    poet.setAttribute('class', 'poem__poet')
    let poem = document.createElement("p");
    poem.setAttribute('class', 'poem__content')
    let title = document.createElement("p");
    title.setAttribute('class', 'poem__title')
    poem.innerHTML = p["content"].replaceAll("\n", "<span class=\"linebreak\"></span>");
    poet.textContent = "By " + p["poet"]["name"];
    title.textContent = p["title"];
    article.appendChild(title);
    article.appendChild(poem);
    article.appendChild(poet);
    return article;
}
