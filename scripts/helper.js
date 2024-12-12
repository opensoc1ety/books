import { create_element } from "./create_element.js";

async function render(query) {
    console.log(query)
    document.querySelector(".spinner").classList.toggle("hidden");
    const data = await request_data(query);
    document.querySelector(".spinner").classList.toggle("hidden");
    display_volumes(data);
    return data;
}

async function request_data(query) {
    const volumes_endpoint = "https://www.googleapis.com/books/v1/volumes?";
    const max_results = 40;
    const endpoint_URL =
        volumes_endpoint + `${query}&maxResults=${max_results}`;
    console.log(String(query), endpoint_URL)

    let data = await fetch(endpoint_URL);
    data = await data.json();
    console.log(data)
    return data;
}

function display_volumes(data) {
    document.querySelector(".volumes").textContent = "";
    if (!data.items) {
        document.querySelector(".volumes").prepend(
            create_element("p", ["No books found."], {})
        );
        return;
    }
    for (let i = 0; i < data.items.length; ++i)
        document.querySelector(".volumes").appendChild(get_volume(data.items[i]));
}

function get_volume(volume) {
    const title = create_element("h2", [volume.volumeInfo.title], {
        class: "card-title",
    });
    const authors = volume.volumeInfo.authors || [];
    const author = create_element("p", ["By " + authors.toString()]);

    let description_text = volume.volumeInfo.description || "No description.";
    if (description_text.length > 200)
        description_text = description_text.slice(0, 197) + "...";

    const description = create_element("p", [description_text]);

    const body = create_element("div", [title, author, description], {
        class: "card-body",
    });

    const image_link = volume.volumeInfo.imageLinks ? volume.volumeInfo.imageLinks.thumbnail : "https://picsum.photos/id/24/120/200";
    const image = create_element("img", [], {
        src: image_link
    });
    const figure = create_element("figure", [image], {
        class: "min-w-[100px]",
    });
    const container = create_element("div", [figure, body], {
        class: "card card-side bg-base-100 shadow-xl mb-[20px]",
    });

    return container;
}

export { render, display_volumes };
