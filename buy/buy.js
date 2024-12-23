// Mahsulotning bir dona narxi
const pricePerProduct = 890000;

// HTML elementlarini olish
const form = document.getElementById("orderForm");
const successModal = document.getElementById("successModal");
const closeModal = document.getElementById("closeModal");

// Telegram bot ma'lumotlari
const token = "7659282400:AAGj3rHn_lozkep2B4tBqwoUy_fBrXh2ycU";  
const chatId = "7609164487";  
const groupChatId = "-4698937559"; 

// Telegramga xabar yuborish funksiyasi
function sendToTelegram(name, phone, address, time) {
  // Yuboriladigan xabar matni
  const message = `
  <b>Yangi buyurtma 🔴 HLT plus:</b>

  👤 <b>Ism:</b> ${name}
  📞 <b>Telefon:</b> ${phone}
  🕒 <b>Murojat qilinish vaqti:</b> ${time}
  📍 <b>Manzil:</b> ${address}

  Tez orada sizga bog'lanamiz! ✅
  `;

  const options = {
    parse_mode: 'HTML', // HTML formatini ishlatish uchun
  };

  // Telegramga foydalanuvchiga xabar yuborish
  fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: chatId,
      text: message,
      parse_mode: options.parse_mode,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Xabar botga muvaffaqiyatli yuborildi: ", data);
    })
    .catch((error) => {
      console.error("Xabar yuborishda xato yuz berdi:", error);
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
      parse_mode: options.parse_mode,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Xabar guruhga muvaffaqiyatli yuborildi: ", data);
    })
    .catch((error) => {
      console.error("Guruhga xabar yuborishda xato yuz berdi:", error);
    });
}

// Shaklni yuborish hodisasi
form.addEventListener("submit", (event) => {
  event.preventDefault(); // Standart shakl yuborishni to'xtatish

  // Foydalanuvchi kiritgan ma'lumotlarni olish
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("comment").value;
  const time = document.getElementById("time").value;  // Yangi vaqtni olish

  // Telegramga yuborish
  sendToTelegram(name, phone, address, time);

  // Muvaffaqiyatli yuborilgan oynani ko'rsatish
  successModal.style.display = "flex";
});

// Modal oynani yopish tugmachasi uchun hodisa
closeModal.addEventListener("click", () => {
  successModal.style.display = "none"; // Modalni yopish
  form.reset(); // Shaklni tozalash
});
