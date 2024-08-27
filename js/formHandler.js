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

// Função para verificar se o CEP é válido usando a API ViaCEP
async function isValidCEP(cep) {
    try {
        let response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        let data = await response.json();
        return !data.erro; // Retorna verdadeiro se não houver erro na resposta
    } catch (error) {
        console.error('Erro ao verificar o CEP:', error);
        return false;
    }
}

// Modificando a função redirectToSMS para incluir a verificação de CEP
async function redirectToSMS() {
    var cep = document.getElementById('cep').value;
    var darkModeToggle = document.getElementById('dark-mode-toggle'); // Referência ao botão de modo escuro/claro

    // Esconder o botão de modo escuro/claro
    darkModeToggle.style.display = 'none';

    // Verifica se o CEP tem o formato correto
    if (cep && cep.length === 9) {
        // Verifica se o CEP é válido usando a API ViaCEP
        if (await isValidCEP(cep)) {
            Swal.fire({
                title: 'Mensagem Preparada!',
                html: "Por favor, ao ser redirecionado para seu aplicativo de mensagens, toque no botão com o ícone de <i class=\"fa-regular fa-paper-plane\"></i> (avião de papel), para enviar o CEP.",
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
            // CEP no formato correto, mas não encontrado (não é válido)
            Swal.fire({
                title: 'CEP não encontrado!',
                html: "O CEP que você digitou está no formato correto, mas não foi encontrado.<br>Por favor, verifique se o CEP está correto ou tente outro.",
                icon: 'error',
                confirmButtonText: 'Tente Outro CEP',
                customClass: {
                    popup: 'swal2-popup',
                    title: 'swal2-title',
                    htmlContainer: 'swal2-html-container',
                    confirmButton: 'swal2-confirm',
                    icon: 'swal2-icon'
                }
            }).then(() => {
                // Mostrar o botão de modo escuro/claro novamente após o erro
                darkModeToggle.style.display = 'block';
            });
        }
    } else {
        // CEP com formato incorreto
        Swal.fire({
            title: 'Formato de CEP não válido!',
            html: "Por favor, insira um CEP no formato: <br><strong>XXXXX-XXX</strong> <br>Exemplo: <strong>12345-678</strong>",
            icon: 'error',
            confirmButtonText: 'Tente Novamente',
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