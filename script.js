const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");



menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
     // Toggle icon between ☰ and ✖
     menuButton.innerHTML = mobileMenu.classList.contains("hidden") ? "&#9776;" : "&#10006;";
     menuButton.style.color = "black";
});

function sub() {
    alert("Thank you for subscribing!")
}

const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    const productBox = event.target.closest(".product-box");
    addToCart(productBox);
});

const addToCart = productBox=> {
    const
}

