// Objeto que armazena os caminhos das imagens para diferentes proporções de tela
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

    if (width === height) { // Verifica se a tela está em modo quadrado (1:1)
        return "vertical-1:1";
    } else if (width > height) { // Verifica se a tela está em modo horizontal
        // Verifica qual a proporção mais próxima entre as opções disponíveis
        if (width / height == (16 / 9).toFixed(2)) return "horizontal-16:9";
        if (width / height == (21 / 9).toFixed(2)) return "horizontal-21:9";
        return "horizontal-16:9"; // Proporção padrão para horizontal
    } else { // Caso a tela esteja em modo vertical ou quadrado
        return "vertical-9:16"; // Proporção padrão para vertical
    }
}

// Função que atualiza a imagem com base na proporção atual da tela
// Evite recarregar a imagem se a src já estiver correta
function updateImage() {
    const aspectRatio = getAspectRatio();  
    const orientation = aspectRatio.split('-')[0];  
    const ratio = aspectRatio.split('-')[1];  
    const imgSrc = images[orientation][ratio];  
    const imgElement = document.getElementById('instruction-image');  

    // Verifique se a nova imagem é diferente da atual antes de atualizar
    if (imgElement.src !== imgSrc) {
        imgElement.src = imgSrc;
    }
}

// Adicionar um debounce para evitar múltiplas chamadas de updateImage em curto período
function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

const debouncedUpdateImage = debounce(updateImage, 100); // Ajuste o tempo conforme necessário

// Evento que dispara quando o conteúdo da página é carregado
document.addEventListener("DOMContentLoaded", function () {
    debouncedUpdateImage();

    window.addEventListener("resize", function () {
        debouncedUpdateImage();
    });
});

// Adiciona um listener para ajustar a imagem quando a orientação do dispositivo mudar
window.addEventListener('orientationchange', function () {
    var img = document.querySelector('img');
    setTimeout(function () {
        adjustImageSize(img);  // Ajusta o tamanho da imagem após um delay de 300ms
    }, 300);  // Delay para garantir que a mudança de orientação seja concluída
});

// Função para alternar o tamanho da imagem (ampliar/reduzir)
function toggleImageSize() {
    var img = document.getElementById('instruction-image');
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

// Listener para ajustar a imagem quando a janela é redimensionada
window.addEventListener('resize', function () {
    var img = document.querySelector('img');
    adjustImageSize(img);  // Ajusta o tamanho da imagem ao redimensionar a janela
});
