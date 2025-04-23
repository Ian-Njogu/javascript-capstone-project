// ==================== GLOBAL VARIABLES ====================
let users = JSON.parse(localStorage.getItem('users')) || [];
let cartItemCount = 0;

// ==================== AUTHENTICATION FUNCTIONS ====================
function isUserLoggedIn() {
  return localStorage.getItem('currentUser') !== null;
}

function getSignUpFormErrors(firstname, email, password, repeatPassword) {
  let errors = [];
  if(firstname === "" || firstname == null){
    errors.push("First name is required");
    firstNameInput.parentElement.classList.add("incorrect");
  }
  if(email === "" || email == null){
    errors.push("Email is required");
    emailInput.parentElement.classList.add("incorrect");
  }
  if(password === "" || password == null){
    errors.push("Password is required");
    passwordInput.parentElement.classList.add("incorrect");
  }
  if(password != repeatPassword){
    errors.push("Password does not match repeated password");
    passwordInput.parentElement.classList.add("incorrect");
    repeatPasswordInput.parentElement.classList.add("incorrect");
  }
  if(password.length < 8) {
    errors.push("Password should not be less than 8 characters");
    passwordInput.parentElement.classList.add("incorrect");
  }
  return errors;
}

function getLoginFormErrors(email, password) {
  let errors = [];
  if(email === "" || email == null){
    errors.push("Email is required");
    emailInput.parentElement.classList.add("incorrect");
  }
  if(password === "" || password == null){
    errors.push("Password is required");
    passwordInput.parentElement.classList.add("incorrect");
  }
  return errors;
}

// ==================== CART FUNCTIONS ====================
function updateCartCount(change) {
  const cartItemCountBadge = document.querySelector(".cart-item-count");
  cartItemCount += change;
  if(cartItemCount > 0) {
    cartItemCountBadge.style.visibility = "visible";
    cartItemCountBadge.textContent = cartItemCount;
  } else {
    cartItemCountBadge.style.visibility = "hidden";
    cartItemCountBadge.textContent = "";
  }
}

function updateTotalPrice() {
  const cartBoxes = document.querySelectorAll(".cart-box");
  let total = 0;
  
  cartBoxes.forEach(cartBox => {
    const priceText = cartBox.querySelector(".cart-price").textContent;
    const quantity = parseInt(cartBox.querySelector(".number").textContent);
    total += parseFloat(priceText) * quantity;
  });
  
  totalPriceElement.textContent = `KES ${total.toLocaleString()}`;
}

function addToCart(productBox) {
  const productImg = productBox.querySelector(".img-box img");
  const productTitle = productBox.querySelector(".product-title").textContent;
  const productPrice = productBox.querySelector(".price").textContent;
  const productBrand = productBox.querySelector(".text-gray-500").textContent;
  const productColor = productBox.querySelector(".text-gray-400").textContent;

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
  
  // Event listeners for cart items
  cartBox.querySelector(".remove-item").addEventListener('click', function() {
    cartBox.remove();
    updateCartCount(-1);
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
}

function completePurchase() {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  cartBoxes.forEach(cartBox => cartBox.remove());
  cartItemCount = 0;
  updateCartCount(0);
  updateTotalPrice();
  alert("Thank you for your purchase!");
}

function handleSuccessfulLogin() {
  const pendingCart = JSON.parse(localStorage.getItem('pendingCart'));
  const pendingAction = localStorage.getItem('pendingAction');
  
  if (pendingAction === 'checkout' && pendingCart) {
    localStorage.removeItem('pendingCart');
    localStorage.removeItem('pendingAction');
    
    document.querySelectorAll(".cart-box").forEach(box => box.remove());
    cartItemCount = 0;
    updateCartCount(0);
    
    pendingCart.forEach(item => {
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
        </div>`;
      
      addToCart(mockProductBox.querySelector(".product-box"));
      
      const cartBoxes = document.querySelectorAll(".cart-box");
      const lastBox = cartBoxes[cartBoxes.length - 1];
      if (lastBox) {
        lastBox.querySelector(".number").textContent = item.quantity;
      }
    });
    
    updateTotalPrice();
    cart.classList.add("active");
    alert("Your cart has been restored. Please complete your purchase");
  }
}

// ==================== DOM EVENT LISTENERS ====================
// Mobile Menu
const menuButton = document.getElementById("menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden");
  menuButton.innerHTML = mobileMenu.classList.contains("hidden") ? "&#9776;" : "&#10006;";
  menuButton.style.color = "black";
});

// Cart Elements
const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");
const cartContent = document.querySelector(".cart-content");
const totalPriceElement = document.querySelector(".total-price");

cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Add to Cart Buttons
document.querySelectorAll(".add-cart").forEach(button => {
  button.addEventListener('click', function(event) {
    const productBox = event.target.closest(".product-box");
    if (productBox) {
      addToCart(productBox);
    }
  });
});

// Buy Now Button
document.querySelector(".btn-buy").addEventListener("click", () => {
  const cartBoxes = cartContent.querySelectorAll(".cart-box");
  if (cartBoxes.length === 0) {
    alert("Your cart is empty. Please add items to the cart before making a purchase");
    return;
  }

  if (!isUserLoggedIn()) {
    const cartItems = Array.from(cartBoxes).map(box => ({
      imgSrc: box.querySelector("img").src,
      imgAlt: box.querySelector("img").alt,
      title: box.querySelector(".cart-product-title").textContent,
      price: box.querySelector(".cart-price").textContent,
      quantity: parseInt(box.querySelector(".number").textContent)
    }));
    
    localStorage.setItem('pendingCart', JSON.stringify(cartItems));
    localStorage.setItem('pendingAction', 'checkout');
    
    alert("Please login to complete your purchase");
    window.location.href = "login.html";
    return;
  }

  completePurchase();
});

// Form Validation
const form = document.getElementById("form");
const firstNameInput = document.getElementById("firstName-input");
const emailInput = document.getElementById("email-input");
const passwordInput = document.getElementById("password-input");
const repeatPasswordInput = document.getElementById("repeat-password-input");
const errorMessage = document.getElementById("error-message");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  let errors = [];
  if (firstNameInput) {
    errors = getSignUpFormErrors(
      firstNameInput.value, 
      emailInput.value, 
      passwordInput.value, 
      repeatPasswordInput.value
    );
    
    if (errors.length === 0) {
      const userExists = users.some(user => user.email === emailInput.value);
      if (userExists) {
        errors.push("Email already registered");
        emailInput.parentElement.classList.add("incorrect");
      } else {
        users.push({
          firstName: firstNameInput.value,
          email: emailInput.value,
          password: passwordInput.value
        });
        localStorage.setItem('users', JSON.stringify(users));
        handleSuccessfulLogin();
        alert("Signup successful! Please login.");
        window.location.href = "login.html";
      }
    }
  } else {
    errors = getLoginFormErrors(emailInput.value, passwordInput.value);
    
    if (errors.length === 0) {
      const user = users.find(user => user.email === emailInput.value);
      if (!user) {
        errors.push("Email not found");
        emailInput.parentElement.classList.add("incorrect");
      } else if (user.password !== passwordInput.value) {
        errors.push("Incorrect password");
        passwordInput.parentElement.classList.add("incorrect");
      } else {
        alert("Login successful!");
        localStorage.setItem('currentUser', JSON.stringify(user.email));
        handleSuccessfulLogin();
        window.location.href = "index.html";
      }
    }
  };
 
  if (errors.length > 0) {
    errorMessage.innerText = errors.join(". ");
  }
});

// Input Validation Clear
[firstNameInput, emailInput, passwordInput, repeatPasswordInput]
  .filter(input => input != null)
  .forEach(input => {
    input.addEventListener("input", () => {
      if(input.parentElement.classList.contains("incorrect")){
        input.parentElement.classList.remove("incorrect");
        errorMessage.innerText = "";
      }
    });
  });