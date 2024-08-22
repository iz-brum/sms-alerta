// Formatação do campo de CEP
document.getElementById('cep').addEventListener('input', function (e) {
    e.target.value = formatCEP(e.target.value);
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
    var darkModeToggle = document.getElementById('dark-mode-toggle'); // Referência ao botão de modo escuro/claro

    // Esconder o botão de modo escuro/claro
    darkModeToggle.style.display = 'none';

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

            // Mostrar o botão de modo escuro/claro novamente após a confirmação
            darkModeToggle.style.display = 'block';
        });
    } else {
        Swal.fire({
            title: 'CEP inválido!',
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

            // Mostrar o botão de modo escuro/claro novamente após o erro
            darkModeToggle.style.display = 'block';
        });
    }
}

// Manuseia os eventos de foco e desfoco no campo de input para exibir e esconder o label
document.getElementById('cep').addEventListener('focus', function () {
    this.classList.add('focused');
});

document.getElementById('cep').addEventListener('blur', function () {
    if (!this.value) {
        this.classList.remove('focused');
    }
});