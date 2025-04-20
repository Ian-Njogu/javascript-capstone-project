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

document.addEventListener('DOMContentLoaded', function() {
    // Select all add to cart buttons
    const addCartButtons = document.querySelectorAll(".add-cart");
    
    addCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            // Get the closest product box
            const productBox = event.target.closest(".product-box");
            if (productBox) {
                addToCart(productBox);
            }
        });
    });

    const addToCart = productBox => {
        // Get product details using the specific classes
        const productImg = productBox.querySelector(".img-box");
        const productTitle = productBox.querySelector(".product-title").textContent;
        const productPrice = productBox.querySelector(".price").textContent;
        const productBrand = productBox.querySelector(".text-gray-500").textContent;
        const productColor = productBox.querySelector(".text-gray-400").textContent;
        


        const cartContent = document.querySelector(".cart-content");

        // Create cart item
        const cartBox = document.createElement("div");
        cartBox.classList.add("cart-box", "flex", "items-center", "mt-5", "p-3", "border-b");
        cartBox.innerHTML = `
            <img class="w-20 h-20 object-cover mr-4" src="${productImg.src}" alt="${productImg.alt || ''}">
            <div class="cart-detail flex-1">
                <div class="flex justify-between">
                    <h2 class="cart-product-title font-bold">${productTitle}</h2>
                    <span class="cart-price font-semibold">${productPrice}</span>
                </div>
                <p class="text-sm text-gray-500">${productBrand} • ${productColor}</p>
                <div class="cart-quantity flex items-center mt-2">
                    <button class="decrement px-2 py-1 bg-gray-200 rounded-l">-</button>
                    <span class="number px-3 py-1 bg-gray-100">1</span>
                    <button class="increment px-2 py-1 bg-gray-200 rounded-r">+</button>
                </div>
            </div>
            <i class="fa-solid fa-trash text-red-500 text-lg cursor-pointer ml-4 remove-item"></i>`;
        
        cartContent.appendChild(cartBox);
        
        // Adding event listeners
        cartBox.querySelector(".remove-item").addEventListener('click', function() {
            cartBox.remove();
            updateCartTotal();
        });
        
        
        const decrementBtn = cartBox.querySelector(".decrement");
        const incrementBtn = cartBox.querySelector(".increment");
        const quantityElement = cartBox.querySelector(".number");
        
        decrementBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateCartTotal();
            }
        });
        
        incrementBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateCartTotal();
        });
        
        updateCartTotal();
    };

    function updateCartTotal() {
        
        console.log("Update cart total");
    }
});
