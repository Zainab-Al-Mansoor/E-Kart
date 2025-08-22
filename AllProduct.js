const allProductsCon = document.getElementById('allProductsCon');
const earbudsCon = document.getElementById('earbuds');
const Cameras = document.getElementById('Cameras');
const SmartPhoneCon = document.getElementById('SmartPhoneCon');
const SmartTVsCon = document.getElementById('SmartTVsCon');



const createProductCard = (product) => {



  const card = document.createElement('div');
  card.classList.add('product-card');

  const img = document.createElement('img');
  img.src = product.img[0];
  img.alt = product.title;
  img.style.transition = "all 0.3s ease";

  img.addEventListener('mouseover', () => {
    if (product.img[1]) img.src = product.img[1];
  });

  img.addEventListener('mouseout', () => {
    img.src = product.img[0];
  });

  card.innerHTML = `
    <div class='tagAndRate'>  
      ${product.tag ? `<span class="tag-badge">${product.tag}</span>` : ''}
      <div class="rating">⭐ ${product.rating ? product.rating : "N/A"}</div>
    </div>

    <div class="product-img"></div>

    <div class="product-details">

      <h3 class="product-title">${product.title}</h3>
      <p class="product-display">${product.display}</p>

      <div class="price-section">
        <span class="price">Rs. ${product.price}</span>
        <span class="discount">${product.discount}</span>
      </div>

      <a href="cart.html?product=${encodeURIComponent(product.title)}" class="add-to-cart-btn">Add to Cart</a>
    </div>
  `;

  card.querySelector('.product-img').appendChild(img);

  return card;
};

// Fetch Functions
const fetchSmartWatches = async () => {
  try {
    const response = await fetch('JSON/SmartWatch.json');
    const data = await response.json();
    data.forEach(product => {
      const card = createProductCard(product);
      allProductsCon.appendChild(card);
    });
  } catch (error) {
    console.error('Smartwatch Error:', error);
  }
};

const fetchEarbuds = async () => {
  try {
    const response = await fetch('JSON/Earbuds.json');
    const data = await response.json();
    data.forEach(product => {
      const card = createProductCard(product);
      earbudsCon.appendChild(card);
    });
  } catch (error) {
    console.error('Earbuds Error:', error);
  }
};

const fetchCameras = async () => {
  try {
    const response = await fetch('JSON/Cameras.json');
    const data = await response.json();
    data.forEach(product => {
      const card = createProductCard(product);
      Cameras.appendChild(card);
    });
  } catch (error) {
    console.error('Cameras Error:', error);
  }
};

const fetchSmartPhones = async () => {
  try {
    const response = await fetch('JSON/SmartPhone.json');
    const data = await response.json();
    data.forEach(product => {
      const card = createProductCard(product);
      SmartPhoneCon.appendChild(card);
    });
  } catch (error) {
    console.error('SmartPhone Error:', error);
  }
};

const fetchSmartTVs = async () => {
  try {
    const response = await fetch('JSON/SmartTVs.json');
    const data = await response.json();
    data.forEach(product => {
      const card = createProductCard(product);
      SmartTVsCon.appendChild(card);
    });
  } catch (error) {
    console.error('SmartTVs Error:', error);
  }
};

// Initial Load
fetchSmartPhones();
fetchCameras();
fetchSmartWatches();
fetchEarbuds();
fetchSmartTVs();

// Search Function
const search_products = async () => {
  const searchWord = document.getElementById("search-input").value.toLowerCase();

  // Clear all product containers before showing search results
  allProductsCon.innerHTML = "";
  earbudsCon.innerHTML = "";
  Cameras.innerHTML = "";
  SmartPhoneCon.innerHTML = "";
  SmartTVsCon.innerHTML = "";

document.querySelector('.eachProductH2').innerHTML=''
document.getElementById('banner').style.display='none'

  try {
const categories = ['SmartWatch', 'Earbuds', 'Cameras', 'SmartPhone', 'SmartTVs'];
    let allProducts = [];

  for (let category of categories) {
  const response = await fetch(`JSON/${category}.json`);
  const data = await response.json();
  console.log(`Loaded ${category}:`, data);
  allProducts = allProducts.concat(data);
}

const filtered = allProducts.filter(product =>
  (product.title && product.title.toLowerCase().includes(searchWord)) ||
  (product.name && product.name.toLowerCase().includes(searchWord)) ||
  (product.productName && product.productName.toLowerCase().includes(searchWord)) ||
  (product.description && product.description.toLowerCase().includes(searchWord)) ||
  (product.desc && product.desc.toLowerCase().includes(searchWord)) ||
  (product.display && product.display.toLowerCase().includes(searchWord))
);

    if (filtered.length === 0) {
      allProductsCon.innerHTML = "<p>No products found for your search.</p>";
      return;
    }

    filtered.forEach(product => {
      const card = createProductCard(product);
      allProductsCon.appendChild(card);  // Show all search results inside allProductsCon
    });

  } catch (error) {
    console.error('Search Error:', error);
  }
};





