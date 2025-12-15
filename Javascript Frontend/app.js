//Variables:
let allProducts = [];
let shoppingCart = [];

//Methods:

function FetchProducts() {
  const productList = document.getElementById("product-list");

  fetch("./data/products.json")
    .then((res) => res.json())
    .then((data) => {
      allProducts = data.products;
      RenderProducts(allProducts);
    })
    .catch((error) => {
      console.error("Fout bij het ophalen van producten: Check api.", error);
      const DisplayError = document.getElementById("display-error");
      DisplayError.innerHTML = `<div class="alert alert-danger" role="alert">
             Error while loading products
      </div>
`;

      const filterButtons = document.getElementById("filter-buttons");
      filterButtons.className = "d-flex flex-wrap gap-2 mb-3 d-none";
    });
}

function RenderProducts(products) {
  const productList = document.getElementById("product-list");
  productList.innerHTML = "";

  products.forEach((product) => {
    const index = allProducts.indexOf(product);
    productList.innerHTML += `
                 <div class ="col">
                    <div class="card h-100">
                        <img src="${product.image}" class="card-img-top" alt="${product.description}">
                        <div class="card-body">
                            <h5 class="card-title">
                                ${product.name}
                                <span class="badge bg-secondary float-none">€${product.price}</span>
                            </h5>
                            <p class="card-text">${product.description}</p>
                            <a href="#" onclick="AddToCart(${index})" class="btn btn-dark">Add to cart</a>
                        </div>
                    </div>  
                 </div>
                `;
  });
}

function FilterProducts(category) {
  if (category === "all") {
    RenderProducts(allProducts);
  } else {
    const filteredProducts = allProducts.filter(
      (product) => product.category === category,
    );
    RenderProducts(filteredProducts);
  }
}

function AddToCart(index) {
  const product = allProducts[index];
  if (product) {
    shoppingCart.push(product);
    CartAmountDisplay();
    RenderCart();
  }
}

function RemoveFromCart(index) {
  const product = allProducts[index];
  if (product) {
    shoppingCart.splice(index, 1);
    CartAmountDisplay();
    RenderCart();
  }
}

function CartAmountDisplay() {
  const CartCounter = document.getElementById("cart-counter");
  CartCounter.innerText = shoppingCart.length;
}

function Checkout() {
  alert("Thank you for your purchase!");
  shoppingCart = [];
  RenderCart();
}

function RenderCart() {
  const cartItems = document.querySelector(".dropdown-menu");
  cartItems.innerHTML = "";

  if (shoppingCart.length === 0) {
    cartItems.innerHTML = "<li class='dropdown-item'>No products found</li>";
  } else {
    const uniqueProducts = [];
    let totalPrice = 0;
    shoppingCart.forEach((product, index) => {
      if (!uniqueProducts.includes(product)) {
        uniqueProducts.push(product);

        const count = shoppingCart.filter(
          (item) => item.name === product.name,
        ).length;

        const totalPerItemPrice = product.price * count;
        totalPrice += product.price * count;
        cartItems.innerHTML += `
          <li class="dropdown-item d-flex align-items-center">
            <span>${product.name} ${count}x </span>
            <span class="ms-auto">€${totalPerItemPrice.toFixed(2)}</span>
            <button class="btn btn-danger btn-sm ms-2" onclick="RemoveFromCart('${product.name}')">Verwijderen</button>
          </li>
        `;
      }
    });

    cartItems.innerHTML += `
      <li class="dropdown-item d-flex align-items-center fw-bold" onclick="Checkout()" role="button">
        <span>Check out</span>
        <span class="ms-auto">€${totalPrice.toFixed(2)}</span>
      </li>
    `;
  }

  CartAmountDisplay();
}

//Program:
FetchProducts();

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.category;
    FilterProducts(category);
  });
});
