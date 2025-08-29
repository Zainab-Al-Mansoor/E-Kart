// Function to render cart items on checkout page
function renderCheckoutCart() {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartItemsContainer = document.getElementById("checkoutCartItems");
  const cartTotalContainer = document.getElementById("checkoutCartTotal");

  cartItemsContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty ❌</p>";
    cartTotalContainer.innerHTML = "";
    return;
  }

  cart.forEach(item => {
    const itemDiv = document.createElement("div");
    itemDiv.classList.add("checkout-item");

    // calculate subtotal
    let subtotal = item.price * item.quantity;
    total += subtotal;

    itemDiv.innerHTML = `
      <img src="${item.img}" alt="${item.title}" class="checkout-img">
      <div class="checkout-details">
        <h3>${item.title}</h3>
        <p>Price: $${item.price}</p>
        <p>Quantity: ${item.quantity}</p>
        <p>Subtotal: $${subtotal}</p>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  cartTotalContainer.innerHTML = `<h3>Total: $${total.toFixed(2)}</h3>`;
}

// Handle checkout form submission
document.getElementById("buyNowForm").addEventListener("submit", function (e) {
  e.preventDefault();

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Your cart is empty. Please add products before checkout.");
    return;
  }

  // Get form values
  const formData = {
    name: this.name.value,
    email: this.email.value,
    address: this.address.value,
    phone: this.phone.value,
    city: this.city.value,
    zip: this.zip.value,
    payment: this.payment.value
  };

  // Save buyer info and cart together in localStorage
  const orderData = {
    buyer: formData,
    products: cart
  };
  localStorage.setItem("latestOrder", JSON.stringify(orderData));

  console.log("Order Placed ✅", orderData);

  alert("🎉 Order placed successfully! Your info and products are saved.");

  // Clear cart after order placed
  localStorage.removeItem("cart");

  // Reset form & re-render
  this.reset();
  renderCheckoutCart();
});

// Initial call to render checkout cart
renderCheckoutCart();
