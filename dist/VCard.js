"use strict";
var _a, _b, _c;
let imageBase64 = "";
// Função para gerar o conteúdo do vCard
function generateVCard(name, phone, email, imageUrl) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
PHOTO;ENCODING=b;TYPE=JPEG:${imageUrl.replace("data:image/jpeg;base64,", "")}
END:VCARD`;
}
// Função para gerar o QR Code
function generateQRCode(vCardData) {
    const qrCodeURL = `https://api.qrserver.com/create-qr-code/?size=150x150&data=${encodeURIComponent(vCardData)}`;
    return qrCodeURL;
}
// Lidar com o evento de upload de imagem
(_a = document.getElementById("image")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function (event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            var _a;
            imageBase64 = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            // Atualizar o container de ícones
            const imageIcon = document.getElementById("imageIcon");
            imageIcon.innerHTML = `<img src="${imageBase64}" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        };
        reader.readAsDataURL(file);
    }
});
// Exibir modal com o QR Code gerado
(_b = document.getElementById("generate")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    const name = document.getElementById("name").value;
    const phone = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    if (name && phone && email && imageBase64) {
        const vCardData = generateVCard(name, phone, email, imageBase64);
        const qrCodeUrl = generateQRCode(vCardData);
        const qrCodeImage = document.getElementById("QRCodeImageModal");
        qrCodeImage.src = qrCodeUrl;
        const modal = document.getElementById("qrCodeModal");
        modal.style.display = "block";
    }
    else {
        alert("Por favor, preencha todos os campos.");
    }
});
// Fechar o modal ao clicar no "x"
document.getElementsByClassName("close")[0].onclick = function () {
    const modal = document.getElementById("qrCodeModal");
    modal.style.display = "none";
};
// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
    const modal = document.getElementById("qrCodeModal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
};
// Simular clique no input de arquivo
(_c = document.getElementById("imageIcon")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
    var _a;
    (_a = document.getElementById("image")) === null || _a === void 0 ? void 0 : _a.click();
});
