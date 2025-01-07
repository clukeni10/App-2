
interface User {
  name: string,
  number: string,
  email: string,
  location: string,
  job?: string,
  

}

let imageUrl: string | null = null; // Variável para armazenar a URL da imagem

const Executar = document.getElementById("generate");
Executar?.addEventListener("click", Execute);

const closeButton = document.getElementById("close") as HTMLSpanElement;
closeButton?.addEventListener("click", fecharModal);

function fecharModal() {
  const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
  modal.style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

function generateQRCode(vCardData: string): string {
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    vCardData
  )}`;
  return qrCodeURL;
}

function generateVCard(Usuario: User): string {
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

function updateDisplay(inputId: string, displayId: string, displayId2: string): void {
  const inputElement = document.getElementById(inputId) as HTMLInputElement;
  const displayElement = document.getElementById(displayId) as HTMLSpanElement;
  const displayElement2 = document.getElementById(displayId2) as HTMLSpanElement;

  inputElement.addEventListener("input", function() {
      displayElement.textContent = this.value; 
      displayElement2.textContent = this.value;
  });
}

updateDisplay("name", "nameDisplay", "nameDisplay2");
updateDisplay("job", "jobDisplay", "jobDisplay2");


function Execute() {
  const user: User = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    number: (document.getElementById("number") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
    location: (document.getElementById("location") as HTMLInputElement).value,
    job: (document.getElementById("job") as HTMLInputElement).value,
  };


  if (user.name && user.number && user.email && user.location) {
    const vCardData = generateVCard(user);
    const qrCodeUrl = generateQRCode(vCardData);

    const qrCodeImage = document.getElementById("QRCodeImageModal") as HTMLImageElement;
    qrCodeImage.src = qrCodeUrl;

    const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
    modal.style.display = "block";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
};





// Obtém os elementos do DOM
const imageInput = document.getElementById("imageInput") as HTMLInputElement;
const imagePreview = document.getElementById("imagePreview") as HTMLImageElement;
const uploadButton = document.getElementById("uploadButton") as HTMLButtonElement;


uploadButton.addEventListener("click", function() {
    imageInput.click(); 
});


imageInput.addEventListener("change", function(event: Event) {
  const target = event.target as HTMLInputElement; 
  const file = target.files ? target.files[0] : null; 

  if (file) {
      const reader = new FileReader(); 

      reader.onload = function(e: ProgressEvent<FileReader>) {
          if (e.target) {
              imagePreview.src = e.target.result as string;
              imagePreview.style.display = "block";
              imageUrl = e.target.result as string; 
          }
      };

      reader.readAsDataURL(file); 
  } else {
      imagePreview.style.display = "none";
      imageUrl = null; 
  }
});

// Obtém os elementos do DOM
const phoneIcon = document.getElementById("phoneIcon") as HTMLDivElement;
const emailIcon = document.getElementById("emailIcon") as HTMLDivElement;
const locationIcon = document.getElementById("locationIcon") as HTMLDivElement;

const phoneModal = document.getElementById("phoneModal") as HTMLDivElement;
const emailModal = document.getElementById("emailModal") as HTMLDivElement;
const locationModal = document.getElementById("locationModal") as HTMLDivElement;

const closePhoneModal = document.getElementById("closePhoneModal") as HTMLSpanElement;
const closeEmailModal = document.getElementById("closeEmailModal") as HTMLSpanElement;
const closeLocationModal = document.getElementById("closeLocationModal") as HTMLSpanElement;

// Função para abrir o modal e preencher os dados
function openModal(modal: HTMLDivElement, displayId: string) {
  const user: User = {
      name: (document.getElementById("name") as HTMLInputElement).value,
      number: (document.getElementById("number") as HTMLInputElement).value,
      email: (document.getElementById("email") as HTMLInputElement).value,
      location: (document.getElementById("location") as HTMLInputElement).value,
      job: (document.getElementById("job") as HTMLInputElement).value,
  };

  const displayElement = document.getElementById(displayId) as HTMLParagraphElement;

  if (modal === phoneModal) {
      displayElement.innerHTML = `<a href="tel:${user.number}">${user.number}</a>`;
  } else if (modal === emailModal) {
      displayElement.innerHTML = `<a href="mailto:${user.email}">${user.email}</a>`;
  } else if (modal === locationModal) {
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
window.onclick = function(event) {
    if (event.target === phoneModal) {
        phoneModal.style.display = "none";
    } else if (event.target === emailModal) {
        emailModal.style.display = "none";
    } else if (event.target === locationModal) {
        locationModal.style.display = "none";
    }
};