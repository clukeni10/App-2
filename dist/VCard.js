"use strict";
let imageUrl = null; // Variável para armazenar a URL da imagem
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
    let vCard = `BEGIN:VCARD
VERSION:3.0
FN:${Usuario.name}
TEL:${Usuario.number}
EMAIL:${Usuario.email}
ADR:;;${Usuario.location};;;;
TITLE:${Usuario.job}`;
    if (imageUrl) {
        vCard += `\nPHOTO;VALUE=uri:${imageUrl}`; // Adiciona a imagem ao vCard
    }
    vCard += `\nEND:VCARD`;
    return vCard;
}
function updateDisplay(inputId, displayId, displayId2) {
    const inputElement = document.getElementById(inputId);
    const displayElement = document.getElementById(displayId);
    const displayElement2 = document.getElementById(displayId2);
    inputElement.addEventListener("input", function () {
        displayElement.textContent = this.value;
        displayElement2.textContent = this.value;
    });
}
updateDisplay("name", "nameDisplay", "nameDisplay2");
updateDisplay("job", "jobDisplay", "jobDisplay2");
function Execute() {
    const user = {
        name: document.getElementById("name").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        job: document.getElementById("job").value,
    };
    if (user.name && user.number && user.email && user.location) {
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
// Obtém os elementos do DOM
const imageInput = document.getElementById("imageInput");
const imagePreview = document.getElementById("imagePreview");
const uploadButton = document.getElementById("uploadButton");
uploadButton.addEventListener("click", function () {
    imageInput.click();
});
imageInput.addEventListener("change", function (event) {
    const target = event.target;
    const file = target.files ? target.files[0] : null;
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target) {
                imagePreview.src = e.target.result;
                imagePreview.style.display = "block";
                imageUrl = e.target.result;
            }
        };
        reader.readAsDataURL(file);
    }
    else {
        imagePreview.style.display = "none";
        imageUrl = null;
    }
});
// Obtém os elementos do DOM
const phoneIcon = document.getElementById("phoneIcon");
const emailIcon = document.getElementById("emailIcon");
const locationIcon = document.getElementById("locationIcon");
const phoneModal = document.getElementById("phoneModal");
const emailModal = document.getElementById("emailModal");
const locationModal = document.getElementById("locationModal");
const closePhoneModal = document.getElementById("closePhoneModal");
const closeEmailModal = document.getElementById("closeEmailModal");
const closeLocationModal = document.getElementById("closeLocationModal");
// Função para abrir o modal e preencher os dados
function openModal(modal, displayId) {
    const user = {
        name: document.getElementById("name").value,
        number: document.getElementById("number").value,
        email: document.getElementById("email").value,
        location: document.getElementById("location").value,
        job: document.getElementById("job").value,
    };
    const displayElement = document.getElementById(displayId);
    if (modal === phoneModal) {
        displayElement.innerHTML = `<a href="tel:${user.number}">${user.number}</a>`;
    }
    else if (modal === emailModal) {
        displayElement.innerHTML = `<a href="mailto:${user.email}">${user.email}</a>`;
    }
    else if (modal === locationModal) {
        displayElement.innerHTML = `<a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(user.location)}" target="_blank">${user.location}</a>`;
    }
    modal.style.display = "block"; // Exibe o modal
}
// Adiciona ouvintes de eventos para os ícones
phoneIcon.addEventListener("click", () => openModal(phoneModal, "phoneDisplay"));
emailIcon.addEventListener("click", () => openModal(emailModal, "emailDisplay"));
locationIcon.addEventListener("click", () => openModal(locationModal, "locationDisplay"));
// Funções para fechar os modais
closePhoneModal.addEventListener("click", () => phoneModal.style.display = "none");
closeEmailModal.addEventListener("click", () => emailModal.style.display = "none");
closeLocationModal.addEventListener("click", () => locationModal.style.display = "none");
// Fecha o modal se o usuário clicar fora dele
window.onclick = function (event) {
    if (event.target === phoneModal) {
        phoneModal.style.display = "none";
    }
    else if (event.target === emailModal) {
        emailModal.style.display = "none";
    }
    else if (event.target === locationModal) {
        locationModal.style.display = "none";
    }
};
