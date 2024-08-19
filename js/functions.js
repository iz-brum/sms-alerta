// Objeto que armazena os caminhos das imagens para diferentes proporções de tela,
// separadas em "horizontal" e "vertical"
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

// Função que calcula e retorna a proporção da tela atual
function getAspectRatio() {
    const width = window.innerWidth;  // Largura da janela
    const height = window.innerHeight;  // Altura da janela

    if (width > height) { // Verifica se a tela está em modo horizontal
        // Verifica qual a proporção mais próxima entre as opções disponíveis
        if (width / height == (16 / 9).toFixed(2)) return "horizontal-16:9";
        if (width / height == (21 / 9).toFixed(2)) return "horizontal-21:9";
        if (width / height == (3 / 2).toFixed(2)) return "horizontal-3:2";
        if (width / height == (4 / 3).toFixed(2)) return "horizontal-4:3";
        return "horizontal-16:9"; // Proporção padrão para horizontal
    } else { // Caso a tela esteja em modo vertical ou quadrado
        // Verifica qual a proporção mais próxima entre as opções disponíveis
        if (width / height == (9 / 16).toFixed(2)) return "vertical-9:16";
        if (width / height == (1 / 1).toFixed(2)) return "vertical-1:1";
        return "vertical-9:16"; // Proporção padrão para vertical
    }
}

// Função que atualiza a imagem com base na proporção atual da tela
function updateImage() {
    const aspectRatio = getAspectRatio();  // Obtém a proporção da tela
    const orientation = aspectRatio.split('-')[0];  // Extrai a orientação (horizontal ou vertical)
    const ratio = aspectRatio.split('-')[1];  // Extrai a proporção (ex: 16:9)
    const imgSrc = images[orientation][ratio];  // Busca o caminho da imagem correspondente
    const imgElement = document.querySelector('img');  // Seleciona o elemento de imagem na página
    imgElement.src = imgSrc;  // Atualiza a fonte da imagem

    // Atualiza o campo de informações com a proporção e o nome da imagem
    const infoElement = document.getElementById('info');
    infoElement.textContent = `Proporção: ${aspectRatio}, Imagem: ${imgSrc}`;
}

// Evento que dispara quando o conteúdo da página é carregado
document.addEventListener("DOMContentLoaded", function () {
    updateImage();  // Atualiza a imagem com base na proporção atual da tela

    // Listener para atualizar a imagem sempre que a janela for redimensionada
    window.addEventListener("resize", function () {
        updateImage();
    });

    // Formatação do campo de CEP
    var cepInput = document.getElementById('cep');
    cepInput.addEventListener('input', function (e) {
        e.target.value = formatCEP(e.target.value);
    });
});

// Função que formata o CEP no formato XXXXX-XXX
function formatCEP(value) {
    value = value.replace(/\D/g, '');  // Remove todos os caracteres que não são dígitos
    if (value.length > 5) {
        value = value.replace(/(\d{5})(\d)/, '$1-$2');  // Adiciona o traço no formato XXXXX-XXX
    }
    return value;
}

// Função que redireciona o usuário para o aplicativo de SMS com o CEP pré-preenchido
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
            // Redireciona para o aplicativo de mensagens com o CEP como conteúdo do SMS
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
            // Limpa o campo de CEP se for inválido
            document.getElementById('cep').value = '';
        });
    }
}

// Função para alternar o tamanho da imagem (ampliar/reduzir)
function toggleImageSize() {
    var img = document.querySelector('img');
    img.classList.toggle('enlarged');  // Alterna a classe 'enlarged' na imagem
    adjustImageSize(img);  // Ajusta o tamanho da imagem com base na nova classe
}

// Função que ajusta o tamanho da imagem com base na classe 'enlarged'
function adjustImageSize(img) {
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

// Adiciona um listener para ajustar a imagem quando a orientação do dispositivo mudar
window.addEventListener('orientationchange', function () {
    var img = document.querySelector('img');
    setTimeout(function () {
        adjustImageSize(img);  // Ajusta o tamanho da imagem após um delay de 300ms
    }, 300);  // Delay para garantir que a mudança de orientação seja concluída
});

// Listener para ajustar a imagem quando a janela é redimensionada
window.addEventListener('resize', function () {
    var img = document.querySelector('img');
    adjustImageSize(img);  // Ajusta o tamanho da imagem ao redimensionar a janela
});
