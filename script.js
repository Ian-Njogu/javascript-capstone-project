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

// Search functionality
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('main-search');
    const searchButton = document.getElementById('search-button');
    const searchResults = document.getElementById('search-results');
    
    // Get all products from the page
    function getAllProducts() {
      const productBoxes = document.querySelectorAll('.product-box');
      const products = [];
      //Gets details of all products and pushes them to the products array
      productBoxes.forEach(box => {
        products.push({
          element: box,
          title: box.querySelector('.product-title').textContent.toLowerCase(),
          brand: box.querySelector('p:first-child').textContent.toLowerCase(),
          color: box.querySelector('p:nth-child(3)').textContent.toLowerCase(),
          price: box.querySelector('.price').textContent.toLowerCase()
        });
      });
      
      return products;
    }
    
    // Search function
    function performSearch(query) {
      const products = getAllProducts();
      const results = [];
      
      if (query.trim() === '') {
        return [];
      }
      //returns any entry made to lower case
      const lowerQuery = query.toLowerCase();
      
      products.forEach(product => {
        if (product.title.includes(lowerQuery) || 
            product.brand.includes(lowerQuery) || 
            product.color.includes(lowerQuery) ||
            product.price.includes(lowerQuery)) {
          results.push(product);
        }
      });
      
      return results;
    }
    
    // Display results
    function displayResults(results) {
      searchResults.innerHTML = '';
      //if there is nothing to be found then:
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="p-4 text-gray-500">No products found</div>';
        searchResults.classList.remove('hidden');
        return;
      }
      
      results.forEach(product => {
        const resultItem = document.createElement('a');
        
        resultItem.className = 'flex items-center p-3 hover:bg-gray-100 transition';
        resultItem.innerHTML = `
          <img src="${product.element.querySelector('img').src}" class="w-12 h-12 object-cover mr-3">
          <div>
            <div class="font-semibold">${product.element.querySelector('.product-title').textContent}</div>
            <div class="text-sm text-gray-600">${product.element.querySelector('.price').textContent}</div>
          </div>
        `;
        
        // Scroll to product when clicked
        resultItem.addEventListener('click', (e) => {
          e.preventDefault();
          product.element.scrollIntoView({ behavior: 'smooth' });
          // Highlight the product
          product.element.classList.add('ring-2', 'ring-orange-500');
          setTimeout(() => {
            product.element.classList.remove('ring-2', 'ring-orange-500');
          }, 2000);
          searchResults.classList.add('hidden');//removes the styling after 2 seconds
        });
        
        searchResults.appendChild(resultItem);
      });
      
      searchResults.classList.remove('hidden');
    }
    
    // Event listeners
    searchInput.addEventListener('input', function() {
      const results = performSearch(this.value);
      displayResults(results);
    });
    
    searchButton.addEventListener('click', function() {
      const results = performSearch(searchInput.value);
      displayResults(results);
    });
    
    // Hide results when clicking outside
    document.addEventListener('click', function(e) {
      if (!searchInput.contains(e.target)) {
        searchResults.classList.add('hidden');
      }
    });
  });



//Elements that need to be declared globally for them to be accessed in different scopes
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

function isLoggedIn() {
    return localStorage.getItem('currentUser') !== null;
}

    // Select all add to cart buttons
    const addCartButtons = document.querySelectorAll(".add-cart");
    // Goes through each add to cart button
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

        // Creaing the cart items
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
        
        // Adding event listeners for the buttons in the cart section
        cartBox.querySelector(".remove-item").addEventListener('click', function() {
            cartBox.remove();
            updateCartCount(-1)
            updateTotalPrice();
        });
        
        
        const decrementBtn = cartBox.querySelector(".decrement");
        const incrementBtn = cartBox.querySelector(".increment");
        const quantityElement = cartBox.querySelector(".number");
        
        decrementBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            if (quantity > 1) {
                quantity--;
                quantityElement.textContent = quantity;
                updateTotalPrice();
            }
        });
        
        incrementBtn.addEventListener('click', function() {
            let quantity = parseInt(quantityElement.textContent);
            quantity++;
            quantityElement.textContent = quantity;
            updateTotalPrice();
        });
        
        updateTotalPrice();
        updateCartCount(1);

    };

    const totalPriceElement = document.querySelector(".total-price");

    const updateTotalPrice = () => {
        const cartBoxes = document.querySelectorAll(".cart-box");
        let total = 0;
         
        cartBoxes.forEach(cartBox => {
        
                const priceText = cartBox.querySelector(".cart-price").textContent
                    
                const quantity = parseInt(cartBox.querySelector(".number").textContent);
                
                total += parseFloat(priceText) * quantity;
          
        });
        
       
        totalPriceElement.textContent = `KES ${total.toLocaleString()}`;
    };

    let cartItemCount = 0; //
    //Change parameter is used to determine whether the item count increases or decreases
    const updateCartCount = change => {
        const cartItemCountBadge = document.querySelector(".cart-item-count");
        cartItemCount += change; //if change is positive the item count increases and vice versa if negative
        if(cartItemCount > 0) {
            cartItemCountBadge.style.visibility = "visible";
            cartItemCountBadge.textContent = cartItemCount;
        } else {
            cartItemCountBadge.style.visibility = "hidden";
            cartItemCountBadge.textContent = "";
        }
    };

    const buyNowButton = document.querySelector(".btn-buy");
    buyNowButton.addEventListener("click", () => {
    // First check if cart is empty (existing check)
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to the cart before making a purchase");
        return;
    }

    // NEW: Check if user is logged in
    if (!isLoggedIn()) {
        // Store cart items temporarily
        const cartItems = Array.from(cartBoxes).map(box => ({
            imgSrc: box.querySelector("img").src,
            imgAlt: box.querySelector("img").alt,
            title: box.querySelector(".cart-product-title").textContent,
            price: box.querySelector(".cart-price").textContent,
            quantity: parseInt(box.querySelector(".number").textContent)
        }));
        
        localStorage.setItem('pendingCart', JSON.stringify(cartItems));
        localStorage.setItem('pendingAction', 'checkout');
        
        // Redirect to login
        alert("Please login to complete your purchase");
        window.location.href = "login.html"; // Change to your login page
        return;
    }

    // If logged in, proceed with purchase
    completePurchase();
});


function completePurchase() {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    cartBoxes.forEach(cartBox => cartBox.remove());
    cartItemCount = 0;
    updateCartCount(0);
    updateTotalPrice();
    alert("Thank you for your purchase!");
}


function handleSuccessfulLogin() {
    // Check for pending cart
    const pendingCart = JSON.parse(localStorage.getItem('pendingCart'));
    const pendingAction = localStorage.getItem('pendingAction');
    
    if (pendingAction === 'checkout' && pendingCart) {
        localStorage.removeItem('pendingCart');
        localStorage.removeItem('pendingAction');
        
        // Clear existing cart first
        document.querySelectorAll(".cart-box").forEach(box => box.remove());
        cartItemCount = 0;
        updateCartCount(0);
        
        // Restore the cart
        pendingCart.forEach(item => {
            // Create a mock productBox element
            const mockProductBox = document.createElement('div');
            mockProductBox.innerHTML = `
                <div class="product-box">
                    <div class="img-box">
                        <img src="${item.imgSrc}" alt="${item.imgAlt}">
                    </div>
                    <h2 class="product-title">${item.title}</h2>
                    <span class="price">${item.price}</span>
                    <p class="text-gray-500">Sample Brand</p>
                    <p class="text-gray-400">Sample Color</p>
                </div>
            `;
            
            // Add each item to cart
            addToCart(mockProductBox.querySelector(".product-box"));
            
            // Set correct quantity
            const cartBoxes = document.querySelectorAll(".cart-box");
            const lastBox = cartBoxes[cartBoxes.length - 1];
            if (lastBox) {
                lastBox.querySelector(".number").textContent = item.quantity;
            }
        });
        
        updateTotalPrice();
        
        // Show cart and prompt user
        cart.classList.add("active");
        alert("Your cart has been restored. Please complete your purchase");
    }
};




