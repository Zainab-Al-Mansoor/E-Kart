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
 