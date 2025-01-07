"use strict";
const Executar = document.getElementById("generate");
Executar === null || Executar === void 0 ? void 0 : Executar.addEventListener("click", Execute);
const closeButton = document.getElementById("close");
closeButton === null || closeButton === void 0 ? void 0 : closeButton.addEventListener("click", fecharModal);
function fecharModal() {
    const modal = document.getElementById("qrCodeModal");
    modal.style.display = "none";
}
;
window.onclick = function (event) {
    const modal = document.getElementById("qrCodeModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
function generateQRCode(vCardData) {
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(vCardData)}`;
    return qrCodeURL;
}
function generateVCard(Usuario) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${Usuario.name}
TEL:${Usuario.number}
EMAIL:${Usuario.email}
END:VCARD`;
}
function Execute() {
    const user = {
        name: document.getElementById("name").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
    };
    if (user.name && user.number && user.email) {
        const vCardData = generateVCard(user);
        const qrCodeUrl = generateQRCode(vCardData);
        const qrCodeImage = document.getElementById("QRCodeImageModal");
        qrCodeImage.src = qrCodeUrl;
        const modal = document.getElementById("qrCodeModal");
        modal.style.display = "block";
    }
    else {
        alert("Por favor, preencha todos os campos.");
    }
}
;
