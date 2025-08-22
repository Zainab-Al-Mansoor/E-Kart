// /fetch  SmartWatch.json 
// dispaly it in cards using for each and cards look was d/f unique 
const container = document.getElementById("smartwatch-container");

fetch("JSON/SmartWatch.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(product => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `

      
     


        <div class="badge-top">
      <div class="tag"> ${product.tag}</div>
      <div class="rating">⭐ ${product.rating}</div>
    </div>
        <img src="${product.img}" alt="${product.title}">
    <div class="card-content">
      <div class="title">${product.title}</div>
      <div class="subtitle">1.39" HD Display</div>
      <div class="colors">
        <div class="color-circle" style="background-color: black;"></div>
        <div class="color-circle" style="background-color: white;"></div>
        <div class="extra-colors">+4</div>
      </div>
      <div class="price-section">
        <div>
          <div class="old-price">Rs. ${product.discount}</div>
          <div class="new-price">Rs. ${product.price}</div>
        </div>
        <div class="discount">73% OFF</div>
      </div>
      <div class="add-to-cart">      <a href="cart.html?product=${encodeURIComponent(product.title)}" class="add-to-cart-btn">Add to Cart</a>
</div>
    </div>

      `
      
      
      ;

      container.appendChild(card);
    });
  })
  .catch(err => {
    container.innerHTML = `<p>Failed to load smartwatches.</p>`;
    console.error(err);
  });






  ///filter smart watches on title

  
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
