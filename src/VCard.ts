import { User } from "./Interfaces";

function generateVCard(Pessoa: User): string {
  return `BEGIN:VCARD
VERSION:3.0
FN:${Pessoa.name}
TEL:${Pessoa.phone}
EMAIL:${Pessoa.email}
END:VCARD`;
}


function generateQRCode(vCardData: string): string {
  const qrCodeURL = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
    vCardData
  )}`;
  return qrCodeURL;
}


const generateButton = document.getElementById("generate");


generateButton?.addEventListener("click", gerar)

function gerar() {
  const user: User = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    phone: (document.getElementById("number") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,

  };



  if (user) {
    const vCardData = generateVCard(user);
    const qrCodeUrl = generateQRCode(vCardData);


    const qrCodeImage = document.getElementById("QRCodeImageModal") as HTMLImageElement;
    qrCodeImage.src = qrCodeUrl;

    const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
    modal.style.display = "block";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
}



// Fechar o modal ao clicar no "x"
(document.getElementsByClassName("close")[0] as HTMLSpanElement).onclick = function () {
  const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
  modal.style.display = "none";
};

// Fechar o modal ao clicar fora dele
window.onclick = function (event) {
  const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

// Simular clique no input de arquivo
document.getElementById("imageIcon")?.addEventListener("click", () => {
  document.getElementById("image")?.click();
});
