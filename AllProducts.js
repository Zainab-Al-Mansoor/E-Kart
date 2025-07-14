///smart phones
const productContainer = document.getElementById('productContainer');

const getUnsplashImage = async (query) => {
  const accessKey = '84WWU8nUmqMuINtRGaCdrFYxozjihqXmhTgdsu2T0J4';
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=1&client_id=${accessKey}`);
  const data = await res.json();
  return data.results[0]?.urls?.regular || 'https://via.placeholder.com/300x200';
};

const fetchSmartphones = async () => {
  try {
    const response = await fetch('https://dummyjson.com/products/category/smartphones');
    const data = await response.json();
    const products = data.products;
console.log(products)
    for (const product of products) {
      const imageUrl = await getUnsplashImage(product.title);

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${imageUrl}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <p>Brand: ${product.brand}</p>
        <p>Price: Rs.${product.price}</p>
        <p>⭐ ${product.rating}</p>
      `;

      productContainer.appendChild(card);
    }
  } catch (error) {
    console.error('Error:', error.message);
  }
};

fetchSmartphones();
///laptop and tablets
// same code for 









const laptopContainer = document.getElementById('laptopContainer');
const tabletContainer = document.getElementById('tabletContainer');
const watchContainer = document.getElementById('watchContainer');
const womensWatchContainer = document.getElementById('womensWatchContainer');


const fetchProductsByCategory = async (category, container) => {
  try {
    const response = await fetch(`https://dummyjson.com/products/category/${category}`);
    const data = await response.json();
    const products = data.products;

    for (const product of products) {
      const imageUrl = await getUnsplashImage(product.title);

      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${imageUrl}" alt="${product.title}" />
        <h4>${product.title}</h4>
        <p>Brand: ${product.brand}</p>
        <p>Price: Rs.${product.price}</p>
        <p>⭐ ${product.rating}</p>
      `;

      container.appendChild(card);
    }
  } catch (error) {
    console.error(`Error loading ${category}:`, error.message);
  }
};

fetchProductsByCategory('laptops', laptopContainer);
fetchProductsByCategory('tablets', tabletContainer);
fetchProductsByCategory('mens-watches', watchContainer);
fetchProductsByCategory('womens-watches', womensWatchContainer);


// EarBuds / headphones
//smart watches
//Cameras