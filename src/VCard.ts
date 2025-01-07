
interface User {
  name: string,
  number: string,
  email: string,

}

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
  return `BEGIN:VCARD
VERSION:3.0
FN:${Usuario.name}
TEL:${Usuario.number}
EMAIL:${Usuario.email}
END:VCARD`;
}


function Execute() {
  const user: User = {
    name: (document.getElementById("name") as HTMLInputElement).value,
    number: (document.getElementById("number") as HTMLInputElement).value,
    email: (document.getElementById("email") as HTMLInputElement).value,
  };


  if (user.name && user.number && user.email) {
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





