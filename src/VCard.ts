// Declare que "QRCodeStyling" está disponível globalmente
declare const QRCodeStyling: any;

interface QRCodeOptions {
  data: string;
  image?: string;
  imageOptions?: {
    crossOrigin: string;
    margin: number;
  };
}

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

function resizeImage(file: File, maxWidth: number, maxHeight: number): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target?.result as string;

      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d")!;
        
        let width = img.width;
        let height = img.height;

        // Redimensiona proporcionalmente
        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          } else {
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


let imageBase64: string = "";

// Lidar com o evento de upload de imagem
document.getElementById("image")?.addEventListener("change", function (event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];

    resizeImage(file, 300, 300).then((resizedImage) => {
      imageBase64 = resizedImage;

      const imageIcon = document.getElementById("imageIcon") as HTMLElement;
      imageIcon.innerHTML = `<img src="${imageBase64}" alt="Uploaded Image" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
    }).catch(() => {
      alert("Falha ao processar a imagem. Tente novamente.");
    });
  }
});


// Função para gerar o QR Code
const generateQRCode = (): void => {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const number = (document.getElementById("number") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;

  if (!name || !email || !number) {
    alert("Por favor, preencha os campos obrigatórios: Nome, Email e Número.");
    return;
  }

  // Formatar o vCard
  const vCard: string = `BEGIN:VCARD
VERSION:3.0
FN:${name}
TEL:${number}
EMAIL:${email}
END:VCARD`;



  // Atualizar o QR Code
 

  // Renderizar o QR Code no container
  const qrContainer = document.getElementById("qrContainer") as HTMLDivElement;
  qrContainer.innerHTML = ""; // Limpar o container antes de renderizar
  qrCode.append(qrContainer);

  // Abrir o modal
  const modal = document.getElementById("qrCodeModal") as HTMLDivElement;
  modal.style.display = "block";
};

// Adicionar evento ao botão "Generate"
document.getElementById("generate")?.addEventListener("click", generateQRCode);

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
