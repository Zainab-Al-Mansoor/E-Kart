
    const form = document.getElementById('buyForm');
    const alertBox = document.getElementById('customAlert');

    form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const address = document.getElementById('address').value.trim();
      const city = document.getElementById('city').value.trim();
      const zip = document.getElementById('zip').value.trim();
      const payment = document.getElementById('payment').value;
      const terms = document.getElementById('terms').checked;

      if (!name || !email || !phone || !address || !city || !zip || !payment || !terms) {
        alertBox.innerText = 'Please fill all required fields correctly.';
        alertBox.style.backgroundColor = '#f44336'; // Red
      } else {
        alertBox.innerText = 'Order Placed Successfully!';
        alertBox.style.backgroundColor = '#4CAF50'; // Green
        form.reset();
      }

      alertBox.style.display = 'block';

      setTimeout(() => {
        alertBox.style.display = 'none';
      }, 3000);
    });
 