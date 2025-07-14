const allProductsCon = document.getElementById('allProductsCon');
const earbudsCon = document.getElementById('earbuds');
const Cameras = document.getElementById('Cameras');
const SmartPhoneCon = document.getElementById('SmartPhoneCon');
const SmartTVsCon= document.getElementById('SmartTVsCon')
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

// Smartwatches
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

// Earbuds
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
// Cameras
const fetchCameras = async () => {
  try {
    const response = await fetch('JSON/Cameras.json');
    const data = await response.json();

    data.forEach(product => {
      const card = createProductCard(product);
      Cameras.appendChild(card);
    });
  } catch (error) {
    console.error('Earbuds Error:', error);
  }
};

// SmartPhone
const fetchSmartPhones = async () => {
  try {
    const response = await fetch('JSON/SmartPhone.json');
    const data = await response.json();

    data.forEach(product => {
      const card = createProductCard(product);
      SmartPhoneCon.appendChild(card);
    });
  } catch (error) {
    console.error('Earbuds Error:', error);
  }
};


// SmartTVs
const fetchSmartTVs = async () => {
  try {
    const response = await fetch('JSON/SmartTVs.json');
    const data = await response.json();

    data.forEach(product => {
      const card = createProductCard(product);
      SmartTVsCon.appendChild(card);
    });
  } catch (error) {
    console.error('Earbuds Error:', error);
  }
};
fetchSmartPhones();
fetchCameras();
fetchSmartWatches();
fetchEarbuds();
fetchSmartTVs();