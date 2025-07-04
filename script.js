// Função para marcar presença com feedback visual
function marcarPresenca(aula) {
  // Verifica se já está marcado
  if (localStorage.getItem(aula)) {
    alert('Você já marcou presença nesta aula!');
    return;
  }

  // Adiciona animação
  const btn = event.target;
  btn.innerHTML = '<i class="bi bi-check2-all"></i> Presente';
  btn.classList.remove('btn-success');
  btn.classList.add('btn-secondary');
  btn.disabled = true;

  // Salva no localStorage
  localStorage.setItem(aula, 'presente');
  
  // Mostra notificação
  showNotification('Presença registrada com sucesso!', 'success');
}

// Alternar modo escuro com ícone dinâmico
function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  const isDarkMode = document.body.classList.contains('dark-mode');
  localStorage.setItem('darkMode', isDarkMode);
  
  // Atualiza ícone
  const darkModeToggle = document.getElementById('darkModeToggle');
  if (isDarkMode) {
    darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
  } else {
    darkModeToggle.innerHTML = '<i class="bi bi-moon-fill"></i>';
  }
}

// Mostrar notificação estilizada
function showNotification(message, type) {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.classList.add('show');
  }, 10);
  
  setTimeout(() => {
    notification.classList.remove('show');
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

// Carregar presenças na página de presenças
function loadPresencas() {
  const lista = document.getElementById('lista-presenca');
  if (lista) {
    // Limpa lista antes de carregar
    lista.innerHTML = '';
    
    // Cria array de aulas
    const aulas = [
      { id: 'aula1', nome: 'O que é Gnosis' },
      { id: 'aula2', nome: 'Personalidade e Ego' },
      { id: 'aula3', nome: 'Os Três Cérebros' },
      { id: 'aula4', nome: 'Os Quatro Caminhos' },
      { id: 'aula5', nome: 'Auto-observação' }
    ];
    
    // Filtra apenas aulas com presença
    const aulasComPresenca = aulas.filter(aula => localStorage.getItem(aula.id));
    
    if (aulasComPresenca.length === 0) {
      const li = document.createElement('li');
      li.className = 'list-group-item text-muted';
      li.textContent = 'Nenhuma presença registrada ainda.';
      lista.appendChild(li);
    } else {
      aulasComPresenca.forEach(aula => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <span><i class="bi bi-check-circle-fill text-success me-2"></i> ${aula.nome}</span>
          <small class="text-muted">${new Date().toLocaleDateString()}</small>
        `;
        lista.appendChild(li);
      });
    }
  }
}

// Inicialização quando a página carrega
window.onload = function () {
  // Modo escuro
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
    const darkModeToggle = document.getElementById('darkModeToggle');
    if (darkModeToggle) {
      darkModeToggle.innerHTML = '<i class="bi bi-sun-fill"></i>';
    }
  }
  
  // Carrega presenças se estiver na página certa
  loadPresencas();
  
  // Adiciona estilos para notificações
  const style = document.createElement('style');
  style.textContent = `
    .notification {
      position: fixed;
      bottom: 20px;
      right: 20px;
      padding: 15px 25px;
      border-radius: 5px;
      color: white;
      transform: translateY(100px);
      opacity: 0;
      transition: all 0.3s ease;
      z-index: 1000;
    }
    
    .notification.show {
      transform: translateY(0);
      opacity: 1;
    }
    
    .notification-success {
      background-color: var(--success-color);
    }
    
    .notification-error {
      background-color: var(--danger-color);
    }
  `;
  document.head.appendChild(style);
}