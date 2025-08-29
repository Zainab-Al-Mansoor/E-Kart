const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('product');
const cartContainer = document.getElementById('cart-container');

const fetchSingleProduct = async () => {
  try {
    const [smartwatchRes, earbudsRes, cameraRes, SmartPhoneRes, SmartTVsRes] = await Promise.all([
      fetch('JSON/SmartWatch.json'),
      fetch('JSON/Earbuds.json'),
      fetch('JSON/Cameras.json'),
      fetch('JSON/SmartPhone.json'),
      fetch('JSON/SmartTVs.json')
    ]);

    const [smartwatchData, earbudsData, cameraData, SmartPhoneData, SmartTVsData] = await Promise.all([
      smartwatchRes.json(),
      earbudsRes.json(),
      cameraRes.json(),
      SmartPhoneRes.json(),
      SmartTVsRes.json()
    ]);

    const allProducts = [...smartwatchData, ...earbudsData, ...cameraData, ...SmartPhoneData, ...SmartTVsData];
    const product = allProducts.find(item => item.title === productName);

    if (!product) {
      cartContainer.innerHTML = '<p>Product not found.</p>';
      return;
    }

    const card = document.createElement('div');
    card.classList.add('product-card2');

    card.innerHTML = `
    <div class="left">
  <img src="${product.img[0]}" alt="${product.title}" class="product-image" id="mainProductImage">
</div>

      <div class="right">
        <p class="breadcrumb">Home / ${product.title}</p>
        <span class="tag2">${product.tag || 'PREMIUM ITEM'}</span>
        <h1>${product.title}</h1>
        <p class="sub">${product.description || 'Smartwatch with AMOLED Display'}</p>

        <h2 class="price">
          Rs.${product.price}
          <span class="original">Rs.${product.originalPrice || product.price * 2}</span>
        </h2>

        <p class="discount">${product.discount || '50% OFF'}
          <span class="timer">Offer Ends In <strong>00h 53m 51s</strong></span>
        </p>

        <p class="views">✅ ${product.views || '333+'} people viewed this in the last <strong>7 days</strong></p>

        <p><strong>Color:</strong> ${product.color || 'Default'}</p>
      <div class="colors">
      <img src="${product.img[0]}" alt="Product Color Preview" title="Alternate View" class="thumb" onclick="changeMainImage('${product.img[0]}')">
            <img src="${product.img[1]}" alt="Product Color Preview" title="Alternate View" class="thumb" onclick="changeMainImage('${product.img[1]}')">

      </div>
   

        <div class="quantity">
          <label>Quantity:</label>
          <button onclick="decrementInputNum()" class="decrease">-</button>
          <input type="number" id="quantityInput" value="1">
          <button onclick="incrementInputNum()" class="increase">+</button>
        </div>

        <div class="buttons">
          <button type="button" class="cart">ADD TO CART</button>
          <button><a href='BuyNow.html'>Buy Now</a></button>
        </div>

    `;

    cartContainer.appendChild(card);

    const addToCartBtn = card.querySelector('.cart');
    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const quantity = parseInt(document.getElementById('quantityInput').value);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];

      if (!product.title || !product.price || !product.img || !product.img[0]) {
        alert('Invalid product data.');
        return;
      }

      const existing = cart.find(item => item.title === product.title);
      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          title: product.title,
          price: product.price,
          img: product.img[0],
          quantity: quantity
        });
      }

      localStorage.setItem('cart', JSON.stringify(cart));
      showSideCart();
    });

  } catch (error) {
    cartContainer.innerHTML = '<p>Error loading product.</p>';
  }
};
function changeMainImage(src) {
  const mainImage = document.getElementById('mainProductImage');
  if (mainImage) {
    mainImage.src = src;
  }
}

fetchSingleProduct();

function incrementInputNum() {
  const input = document.getElementById('quantityInput');
  input.value = parseInt(input.value) + 1;
}

function decrementInputNum() {
  const input = document.getElementById('quantityInput');
  const value = parseInt(input.value);
  if (value > 1) input.value = value - 1;
}
function showSideCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const sideCart = document.getElementById('sideCart');
  const sideCartItems = document.getElementById('sideCartItems');
  sideCartItems.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    sideCartItems.innerHTML = '<p>Your cart is empty.</p>';
  } else {
    cart.forEach((item, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'cart-item fade-in';
      itemDiv.innerHTML = `
        <img src="${item.img}" alt="${item.title}">
        <div>
          <h4>${item.title}</h4>
          <div class="quantity-control">
            <button type="button" class="decrease-btn" data-index="${index}">-</button>
            <span class="quantity">${item.quantity}</span>
            <button type="button" class="increase-btn" data-index="${index}">+</button>
          </div>
          <p class="item-price">Rs.${item.price * item.quantity}</p>
          <button type="button" class="remove-btn" data-index="${index}">Remove</button>
        </div>
      `;

      sideCartItems.appendChild(itemDiv);
      total += item.price * item.quantity;
    });

    // TOTAL DIV
    const totalDiv = document.createElement('div');
    totalDiv.className = 'cart-total';
    totalDiv.innerHTML = `
      <h3 style="margin-top: 20px; text-align: center; font-size: 20px; font-weight: 600; color: #ffffffff;">
        Total: Rs.${total}
      </h3>
    `;
    sideCartItems.appendChild(totalDiv);

    // REMOVE ITEM
    document.querySelectorAll('.remove-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        removeFromCart(index);
      });
    });

    // INCREASE QUANTITY
    document.querySelectorAll('.increase-btn').forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        cart[index].quantity++;
        localStorage.setItem("cart", JSON.stringify(cart));

        const parent = this.closest(".cart-item");
        parent.querySelector(".quantity").textContent = cart[index].quantity;
        parent.querySelector(".item-price").textContent = `Rs.${cart[index].price * cart[index].quantity}`;

        updateCartTotal(cart);
      });
    });

    // DECREASE QUANTITY
    document.querySelectorAll('.decrease-btn').forEach(btn => {
      btn.addEventListener("click", function () {
        const index = this.getAttribute("data-index");
        if (cart[index].quantity > 1) {
          cart[index].quantity--;
          localStorage.setItem("cart", JSON.stringify(cart));

          const parent = this.closest(".cart-item");
          parent.querySelector(".quantity").textContent = cart[index].quantity;
          parent.querySelector(".item-price").textContent = `Rs.${cart[index].price * cart[index].quantity}`;

          updateCartTotal(cart);
        }
      });
    });
  }

  if (!sideCart.classList.contains('open')) {
    sideCart.classList.add('open', 'slide-in');
    setTimeout(() => sideCart.classList.remove('slide-in'), 400);
  }
}

// Helper to update total only
function updateCartTotal(cart) {
  let total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalDiv = document.querySelector(".cart-total h3");
  if (totalDiv) {
    totalDiv.textContent = `Total: Rs.${total}`;
  }
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  showSideCart(); // Re-render cart content, no animation
}

function closeSideCart() {
  document.getElementById('sideCart').classList.remove('open');
}



