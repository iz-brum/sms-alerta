const images = {
    "horizontal": {
        "16:9": "imgs/sms_alerta_16_por_9.png",
        "21:9": "imgs/sms_alerta_21_por_9.png",
        "3:2": "imgs/sms_alerta_3_por_2.png",
        "4:3": "imgs/sms_alerta_4_por_3.png"
    },
    "vertical": {
        "9:16": "imgs/sms_alerta_9_por_16.png",
        "1:1": "imgs/sms_alerta_1_por_1.png"
    }
};

function getAspectRatio() {
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (width > height) { // Horizontal
        if (width / height == (16 / 9).toFixed(2)) return "horizontal-16:9";
        if (width / height == (21 / 9).toFixed(2)) return "horizontal-21:9";
        if (width / height == (3 / 2).toFixed(2)) return "horizontal-3:2";
        if (width / height == (4 / 3).toFixed(2)) return "horizontal-4:3";
        return "horizontal-16:9"; // Padrão para horizontal
    } else { // Vertical ou quadrado
        if (width / height == (9 / 16).toFixed(2)) return "vertical-9:16";
        if (width / height == (1 / 1).toFixed(2)) return "vertical-1:1";
        return "vertical-9:16"; // Padrão para vertical
    }
}

function updateImage() {
    const aspectRatio = getAspectRatio();
    const orientation = aspectRatio.split('-')[0];
    const ratio = aspectRatio.split('-')[1];
    const imgSrc = images[orientation][ratio];
    const imgElement = document.querySelector('img');
    imgElement.src = imgSrc;

    // Atualiza o campo de informações com a proporção e o nome da imagem
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Proporção: ${aspectRatio}, Imagem: ${imgSrc}`;
}

document.addEventListener("DOMContentLoaded", function () {
    updateImage();

    window.addEventListener("resize", function () {
        updateImage();
    });

    var cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function (e) {
        e.target.value = formatCEP(e.target.value);
    });
});

function formatCEP(value) {
    value = value.replace(/\D/g, '');
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
    }
    return value;
}

function redirectToSMS() {
    var cep = document.getElementById('cep').value;
    if (cep && cep.length === 9) {
        Swal.fire({
            title: 'Mensagem Preparada!',
            html: "Por favor, toque no botão com o ícone de '<i class='fa-regular fa-paper-plane'></i>' no app de mensagens para enviar o CEP.",
            icon: 'info',
            confirmButtonText: 'OK',
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                htmlContainer: 'swal2-html-container',
                confirmButton: 'swal2-confirm',
                icon: 'swal2-icon'
            }
        }).then(() => {
            window.location.href = "sms:40199?body=" + encodeURIComponent(cep);
        });
    } else {
        Swal.fire({
            title: 'CEP Inválido!',
            html: "Por favor, insira um CEP válido no formato <strong>XXXXX-XXX</strong>. <br>Exemplo: <strong>12345-678</strong>",
            icon: 'error',
            confirmButtonText: 'Tentar Novamente',
            customClass: {
                popup: 'swal2-popup',
                title: 'swal2-title',
                htmlContainer: 'swal2-html-container',
                confirmButton: 'swal2-confirm',
                icon: 'swal2-icon'
            }
        }).then(() => {
            document.getElementById('cep').value = '';
        });
    }
}

function toggleImageSize() {
    var img = document.querySelector('img');
    img.classList.toggle('enlarged');

    if (img.classList.contains('enlarged')) {
        img.style.maxWidth = '100%'; // Ocupa toda a largura disponível
        img.style.height = 'auto';   // Mantém a proporção da altura
        img.style.width = 'auto';    // Define a largura automaticamente para respeitar as proporções
    } else {
        img.style.maxWidth = '90%';  // Retorna ao tamanho padrão anterior
        img.style.height = 'auto';
        img.style.width = 'auto';
    }
}
