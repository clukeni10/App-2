let imageBase64: string = "";

// Função para gerar o conteúdo do vCard
function generateVCard(name: string, phone: string, email: string, imageUrl: string): string {
  return `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${phone}
EMAIL:${email}
PHOTO;ENCODING=b;TYPE=JPEG:${imageUrl.replace("data:image/jpeg;base64,", "")}
END:VCARD`;
}

// Função para gerar o QR Code
function generateQRCode(vCardData: string): string {
  const qrCodeURL = `https://api.qrserver.com/create-qr-code/?size=150x150&data=${encodeURIComponent(
    vCardData
  )}`;
  return qrCodeURL;
}

// Lidar com o evento de upload de imagem
document.getElementById("image")?.addEventListener("change", function (event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      imageBase64 = e.target?.result as string;

      // Atualizar o container de ícones
      const imageIcon = document.getElementById("imageIcon") as HTMLElement;
      imageIcon.innerHTML = `<img src="${imageBase64}" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    };

    reader.readAsDataURL(file);
  }
});

// Exibir modal com o QR Code gerado
document.getElementById("generate")?.addEventListener("click", function () {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const phone = (document.getElementById("number") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;

  if (name && phone && email && imageBase64) {
    const vCardData = generateVCard(name, phone, email, imageBase64);
    const qrCodeUrl = generateQRCode(vCardData);

    const qrCodeImage = document.getElementById("QRCodeImageModal") as HTMLImageElement;
    qrCodeImage.src = qrCodeUrl;

    const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
    modal.style.display = "block";
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});

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
