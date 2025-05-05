"use strict";
const button = document.getElementById('generateBtn');
const container = document.getElementById('qrCodeContainer');
const fixedUrl = 'https://www.google.com';
button.addEventListener('click', () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(fixedUrl)}&size=200x200`;
    container.innerHTML = `
    <p>Escaneie para visitar nosso site:</p>
    <img src="${qrUrl}" alt="QR Code para Delicious Cakes" />
    <p><strong>${fixedUrl}</strong></p>
  `;
});
