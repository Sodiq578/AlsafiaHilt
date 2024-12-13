const pricePerProduct = 890000;
const quantityElement = document.getElementById("quantity");
const totalPriceElement = document.getElementById("totalPrice");
const decreaseButton = document.getElementById("decrease");
const increaseButton = document.getElementById("increase");
const form = document.getElementById("orderForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");
const token = "7747931873:AAEx8TM-ddgYOQtnr6cyGGnT1nzC7ElG4u0"; // Your Telegram bot token
const chatId = "5838205785"; // Telegram bot chat ID
const groupChatId = "-1002480723282"; // Telegram group chat ID

let quantity = 1;

function updateTotalPrice() {
  totalPriceElement.textContent = (quantity * pricePerProduct).toLocaleString();
}

function sendToTelegram(name, phone, address, quantity, totalPrice) {
  const message = `
  <b>Yangi buyurtma 🔴 HLT plus:</b>

  👤 <b>Ism:</b> ${name}
  📞 <b>Telefon:</b> ${phone}
  📍 <b>Manzil:</b> ${address}

  📦 <b>Mahsulot:</b> ${pricePerProduct.toLocaleString()} so'm
  💰 <b>Umumiy narx:</b> ${totalPrice} so'm
  🔢 <b>Miqdor:</b> ${quantity}

  Tez orada sizga bog'lanamiz! ✅
  `;

  const options = {
    parse_mode: 'HTML', // HTML formatini ishlatish
  };

  // Telegramga xabar yuborish
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: options.parse_mode, // HTML formatini belgilash
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Xabar botga muvaffaqiyatli yuborildi", data);
    })
    .catch((error) => {
      console.error("Xabar yuborishda xato yuz berdi", error);
    });

  // Telegram guruhiga xabar yuborish
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: groupChatId,
      text: message,
      parse_mode: options.parse_mode, // HTML formatini belgilash
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Xabar guruhga muvaffaqiyatli yuborildi", data);
    })
    .catch((error) => {
      console.error("Guruhga xabar yuborishda xato yuz berdi", error);
    });
}

decreaseButton.addEventListener("click", () => {
  if (quantity > 1) {
    quantity--;
    quantityElement.textContent = quantity;
    updateTotalPrice();
  }
});

increaseButton.addEventListener("click", () => {
  quantity++;
  quantityElement.textContent = quantity;
  updateTotalPrice();
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;
  const totalPrice = (quantity * pricePerProduct).toLocaleString();

  sendToTelegram(name, phone, address, quantity, totalPrice);

  successModal.style.display = "flex"; // Show success modal
});

closeModal.addEventListener("click", () => {
  successModal.style.display = "none"; // Close success modal
  form.reset(); // Reset the form
  quantity = 1; // Reset quantity
  quantityElement.textContent = quantity;
  updateTotalPrice(); // Update total price
});
