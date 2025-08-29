const menuBtn = document.getElementById("menu-toggle");
      const mobileMenu = document.getElementById("mobile-menu");
      const links = mobileMenu.querySelectorAll("a");

      menuBtn.addEventListener("click", () => {
        mobileMenu.classList.toggle("active");
      });

      links.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.remove("active");
        });
      });













      
// nav
    const navbar = document.getElementById("navbar");

    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
 






    // cart icon

    document.addEventListener("DOMContentLoaded", () => {
  const cartCount = document.getElementById("cart-count");

  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
  }

  updateCartCount();

  // Optional: Update in real-time if items are added on same page
  window.addEventListener("storage", updateCartCount);
});













document.getElementById('cart-icon').addEventListener('click', function(e) {
  e.preventDefault(); // prevent page reload
  showSideCart();      // call your function
});
