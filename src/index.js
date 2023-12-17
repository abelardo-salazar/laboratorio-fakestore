const localPaginationKey = "api-pagination";
localStorage.removeItem(localPaginationKey);
const $app = document.getElementById("app");
const $observe = document.getElementById("observe");
const API = "https://api.escuelajs.co/api/v1/products";

const productCardHTML = ({ images, title, price }) =>
    `<article class="Card">
    <img src="${images[0]}" alt="${title}" />
    <h2>
      ${title}
      <small>$ ${price}</small>
    </h2>
  </article>`;

const renderProductCards = (products) => {
    let productsContainer = document.createElement("section");
    productsContainer.classList.add("Items");

    let template = "";
    products.forEach((product) => {
        template += productCardHTML(product);
    });

    productsContainer.innerHTML += template;
    $app.appendChild(productsContainer);
    console.log("first")
};

const getProducts = () => {
    const limit = 10;

    // Set offset based on localstorage
    const initialOffset = 5;
    let offset = localStorage.getItem(localPaginationKey);
    offset ? (offset = parseInt(offset) + limit) : (offset = initialOffset);
    localStorage.setItem(localPaginationKey, offset);

    const url = `${API}?offset=${offset}&limit=${limit}`;
    fetch(url)
        .then((response) => response.json())
        .then((response) => {
            let products = response;
            renderProductCards(products);
        })
        .catch((error) => console.log(error));
};

const loadData = () => {
    getData(API);
};

const intersectionObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) getProducts();
    },
    {
        rootMargin: "0px 0px 100% 0px",
    }
);

intersectionObserver.observe($observe);
