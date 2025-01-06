"use strict";
var _a, _b, _c;
const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    type: "svg", // SVG é mais eficiente para muitos dados
    version: 10, // Aumente a versão (valores de 1 a 40)
    dotsOptions: {
        color: "#000",
        type: "rounded",
    },
    backgroundOptions: {
        color: "#ffffff",
    },
});
function resizeImage(file, maxWidth, maxHeight) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        const reader = new FileReader();
        reader.onload = (e) => {
            var _a;
            img.src = (_a = e.target) === null || _a === void 0 ? void 0 : _a.result;
            img.onload = () => {
                const canvas = document.createElement("canvas");
                const ctx = canvas.getContext("2d");
                let width = img.width;
                let height = img.height;
                // Redimensiona proporcionalmente
                if (width > maxWidth || height > maxHeight) {
                    if (width > height) {
                        height = (height * maxWidth) / width;
                        width = maxWidth;
                    }
                    else {
                        width = (width * maxHeight) / height;
                        height = maxHeight;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0, width, height);
                resolve(canvas.toDataURL("image/jpeg", 0.7)); // Compacta para JPEG com qualidade de 70%
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
let imageBase64 = "";
<<<<<<< HEAD
// Função para gerar o conteúdo do vCard
function generateVCard(Pessoa) {
    return `BEGIN:VCARD
VERSION:3.0
FN:${Pessoa.name}
TEL:${Pessoa.phone}
EMAIL:${Pessoa.email}
END:VCARD`;
}
// Função para gerar o QR Code
function generateQRCode(vCardData) {
    const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(vCardData)}`;
    return qrCodeURL;
}
=======
>>>>>>> 15aea4146e48bd2ffc7f95d7c63ca19a3f3335bc
// Lidar com o evento de upload de imagem
(_a = document.getElementById("image")) === null || _a === void 0 ? void 0 : _a.addEventListener("change", function (event) {
    const input = event.target;
    if (input.files && input.files[0]) {
        const file = input.files[0];
        resizeImage(file, 300, 300).then((resizedImage) => {
            imageBase64 = resizedImage;
            const imageIcon = document.getElementById("imageIcon");
            imageIcon.innerHTML = `<img src="${imageBase64}" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
        }).catch(() => {
            alert("Falha ao processar a imagem. Tente novamente.");
        });
    }
});
<<<<<<< HEAD
// Exibir modal com o QR Code gerado
(_b = document.getElementById("generate")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", function () {
    const user = {
        name: document.getElementById("name").value,
        phone: document.getElementById("number").value,
        email: document.getElementById("email").value,
    };
    const vCardData = generateVCard(user);
    const qrCodeURL = generateQRCode(vCardData);
    if (user) {
        const qrCodeUrl = generateQRCode(vCardData);
        const qrCodeImage = document.getElementById("QRCodeImageModal");
        qrCodeImage.src = qrCodeUrl;
        const modal = document.getElementById("qrCodeModal");
        modal.style.display = "block";
=======
// Função para gerar o QR Code
const generateQRCode = () => {
    const name = document.getElementById("name").value;
    const number = document.getElementById("number").value;
    const email = document.getElementById("email").value;
    if (!name || !email || !number) {
        alert("Por favor, preencha os campos obrigatórios: Nome, Email e Número.");
        return;
>>>>>>> 15aea4146e48bd2ffc7f95d7c63ca19a3f3335bc
    }
    // Formatar o vCard
    const vCard = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${number}
EMAIL:${email}
END:VCARD`;
    // Atualizar o QR Code
    // Renderizar o QR Code no container
    const qrContainer = document.getElementById("qrContainer");
    qrContainer.innerHTML = ""; // Limpar o container antes de renderizar
    qrCode.append(qrContainer);
    // Abrir o modal
    const modal = document.getElementById("qrCodeModal");
    modal.style.display = "block";
};
// Adicionar evento ao botão "Generate"
(_b = document.getElementById("generate")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", generateQRCode);
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
