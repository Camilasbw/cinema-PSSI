const container = document.getElementById('container'); // Container geral dos formulários
const registerBtn = document.getElementById('register'); // Botão para ir ao cadastro
const loginBtn = document.getElementById('login'); // Botão para ir ao login
const welcomeScreen = document.getElementById('welcome-screen'); // Tela de boas-vindas (não usada diretamente aqui)
const forgotLink = document.getElementById('forgot-password-link'); // Link "Esqueceu a senha?"
const backToLogin = document.getElementById('back-to-login'); // Link "Voltar ao login"

registerBtn.addEventListener('click', () => {
  container.classList.add('active');
  container.classList.remove('forgot'); // Garante que a tela de recuperação esteja escondida
});

loginBtn.addEventListener('click', () => {
  container.classList.remove('active');
  container.classList.remove('forgot');
});

forgotLink.addEventListener('click', (e) => {
  e.preventDefault();
  container.classList.add('forgot');
});

backToLogin.addEventListener('click', (e) => {
  e.preventDefault(); // Evita o comportamento padrão do link
  container.classList.remove('forgot');
});

// Lógica de cadastro de novo usuário
document.getElementById('register-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;

  const user = { name, email, password };

  // Salva os dados no localStorage (simulando um banco de dados local)
  localStorage.setItem('user', JSON.stringify(user));

  alert('Conta criada com sucesso!');
  container.classList.remove('active'); // Volta para o formulário de login após o cadastro
});

document.getElementById('login-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;

  // Recupera os dados do usuário armazenados
  const user = JSON.parse(localStorage.getItem('user'));

  // Verifica se o usuário existe e se os dados conferem
  if (user && email === user.email && password === user.password) {
    // Redireciona para a página principal (cinema)
    window.location.href = "CINEMA/cinema.html";
  } else {
    alert('Email ou senha incorretos.');
  }
});

// Recuperação de senha
const forgotForm = document.getElementById('forgot-form');
const forgotEmail = document.getElementById('forgot-email');
const newPassword = document.getElementById('new-password');
const confirmPassword = document.getElementById('confirm-password');
const forgotSubmit = document.getElementById('forgot-submit');

let etapa = 1; // 1 = validação de email, 2 = redefinição de senha

forgotForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Recupera os dados do usuário salvos localmente
  const user = JSON.parse(localStorage.getItem('user'));

  // Etapa 1: valida se o e-mail digitado existe no localStorage
  if (etapa === 1) {
    if (user && forgotEmail.value === user.email) {
      // E-mail válido: prossegue para redefinir senha
      forgotEmail.disabled = true;
      newPassword.style.display = 'block';
      confirmPassword.style.display = 'block';
      forgotSubmit.textContent = 'Redefinir Senha';
      etapa = 2;
    } else {
      alert('Email não encontrado.');
    }

  // Etapa 2: valida e salva a nova senha
  } else if (etapa === 2) {
    const novaSenha = newPassword.value.trim();
    const confirmarSenha = confirmPassword.value.trim();

    // Verifica o tamanho mínimo da senha
    if (novaSenha.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    // Verifica se as senhas coincidem
    if (novaSenha !== confirmarSenha) {
      alert('As senhas não coincidem.');
      return;
    }

    // Atualiza a senha do usuário no localStorage
    user.password = novaSenha;
    localStorage.setItem('user', JSON.stringify(user));

    alert('Senha redefinida com sucesso!');

    // Limpa e reseta o formulário para um novo uso
    etapa = 1;
    forgotEmail.disabled = false;
    forgotEmail.value = '';
    newPassword.value = '';
    confirmPassword.value = '';
    newPassword.style.display = 'none';
    confirmPassword.style.display = 'none';
    forgotSubmit.textContent = 'Validar Email';

    container.classList.remove('forgot'); // Retorna à tela de login
  }
});
