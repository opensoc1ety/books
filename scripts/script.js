const query_input = document.querySelector(".query");
const submit_button = document.querySelector(".query_submit_btn");

submit_button.addEventListener("click", render);
query_input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") render();
});

async function render() {
    const query = query_input.value;
    query.replaceAll(" ", "+");
    query_input.value = "";
    const data = await request_data(query);
    console.log(data);
    display_volumes(data);
}

async function request_data(query) {
    const volumes_endpoint = "https://www.googleapis.com/books/v1/volumes?";
    const max_results = 40;

    const endpoint_URL = `${volumes_endpoint}q=${query}&maxResults=${max_results}`;

    let data = await fetch(endpoint_URL);
    data = await data.json();
    return data;
}

function display_volumes(data) {
    for (let i = 0; i < data.items.length; ++i)
        document.querySelector(".volumes").prepend(get_volume(data.items[i]));
}

function get_volume(volume) {
    const title = document.createElement("p");
    const author = "By " + volume.volumeInfo.authors.toString();
    title.textContent = volume.volumeInfo.title;
    const container = document.createElement("div");
    container.classList.add("mb-[20px]")
    container.append(title);
    container.append(author);
    return container;
}
