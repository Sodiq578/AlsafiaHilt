document.addEventListener('DOMContentLoaded', () => {
    const buyForm = document.getElementById('buyForm');
    const orderModal = document.getElementById('orderModal');
    const closeModal = document.getElementById('closeModal');
  
    buyForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      // Collect form data
      const formData = new FormData(buyForm);
      const data = {
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
      };
  
      // Display modal
      orderModal.style.display = 'flex';
  
      // Send order data to Telegram bot
      sendOrderToTelegram(data);
    });
  
    closeModal.addEventListener('click', () => {
      orderModal.style.display = 'none';
      buyForm.reset();
    });
  
    function sendOrderToTelegram(orderData) {
      const telegramToken = '7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0';
      const chatId = '5838205785';
      const message = `
      Buyurtma:
      To'liq ism: ${orderData.fullName}
      Email: ${orderData.email}
      Telefon raqami: ${orderData.phone}
      Yetkazib berish manzili: ${orderData.address}
      `;
  
      const telegramApiUrl = `https://api.telegram.org/bot${telegramToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;
  
      fetch(telegramApiUrl)
        .then(response => response.json())
        .then(data => {
          if (data.ok) {
            console.log('Order sent to Telegram');
          } else {
            console.log('Error sending order to Telegram');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  });
  