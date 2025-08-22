const smartphoneContainer = document.getElementById("smartphone-container");
const earbudsContainer = document.getElementById("Earbuds-container");
const CamerasContainer = document.getElementById("Cameras-container");
const SmartTVs = document.getElementById("SmartTVs");

// Reusable Function for Fetching & Displaying Products
const fetchAndDisplayProducts = async (url, container) => {
  try {
    const res = await fetch(url);
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
    container.innerHTML = `<p>Failed to load products.</p>`;
    console.error(err);
  }
};

// Fetch Both Categories
fetchAndDisplayProducts("JSON/SmartPhone.json", smartphoneContainer);
fetchAndDisplayProducts("JSON/Earbuds.json", earbudsContainer);
fetchAndDisplayProducts("JSON/Cameras.json", CamerasContainer);
fetchAndDisplayProducts("JSON/SmartTVs.json", SmartTVs);






//filter products on search button on navbar

const searchInput = document.getElementById('search-input');

function search_products() {
  const query = searchInput.value.toLowerCase();
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    const title = card.querySelector('.title').textContent.toLowerCase();
    if (title.includes(query)) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });
}
