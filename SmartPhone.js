const container = document.getElementById("smartphone-container");

const fetchSmartPhones = async () => {
  try {
    const res = await fetch("JSON/SmartPhone.json");
    const data = await res.json();

    data.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <div class="badge-top">
          <div class="tag">${product.tag}</div>
          <div class="rating">⭐ ${product.rating}</div>
        </div>
        <img src="${product.img[0]}" alt="${product.title}">
        <div class="card-content">
          <div class="title">${product.title}</div>
          <div class="subtitle">${product.display}</div>
          <div class="colors">
            <div class="color-circle" style="background-color: black;"></div>
            <div class="color-circle" style="background-color: white;"></div>
            <div class="extra-colors">+4</div>
          </div>
          <div class="price-section">
            <div>
              <div class="old-price">Rs. ${product.original_price}</div>
              <div class="new-price">Rs. ${product.price}</div>
            </div>
            <div class="discount">${product.discount}</div>
          </div>
          <div class="add-to-cart">
            <a href="cart.html?product=${encodeURIComponent(product.title)}" class="add-to-cart-btn">Add to Cart</a>
          </div>
        </div>
      `;

      container.appendChild(card);
    });

  } catch (err) {
    container.innerHTML = `<p>Failed to load smartphones.</p>`;
    console.error(err);
  }
};

fetchSmartPhones();
