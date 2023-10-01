import { create_element } from "./create_element.js";

async function render(query) {
    const data = await request_data(query);
    console.log(data);
    display_volumes(data);
}

async function request_data(query) {
    const volumes_endpoint = "https://www.googleapis.com/books/v1/volumes?";
    const max_results = 40;
    const endpoint_URL =
        volumes_endpoint + `${query}&maxResults=${max_results}`;

    let data = await fetch(endpoint_URL);
    data = await data.json();
    console.log(data);
    return data;
}

function display_volumes(data) {
    for (let i = 0; i < data.items.length; ++i)
        document.querySelector(".volumes").prepend(get_volume(data.items[i]));
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
    const image = create_element("img", [], {
        src: volume.volumeInfo.imageLinks.thumbnail,
    });
    const figure = create_element("figure", [image], {
        class: "min-w-[100px]",
    });
    const container = create_element("div", [figure, body], {
        class: "card card-side bg-base-100 shadow-xl mb-[20px]",
    });

    return container;
}

export { render };
