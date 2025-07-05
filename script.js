// Funções existentes
function marcarPresenca(aula) {
  alert('Presença registrada: ' + aula);
  
  // Adiciona ao localStorage
  let presencas = JSON.parse(localStorage.getItem('presencas') || '[]');
  if (!presencas.includes(aula)) {
    presencas.push(aula);
    localStorage.setItem('presencas', JSON.stringify(presencas));
  }
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Carrega as presenças na página de presenças
function carregarPresencas() {
  if (document.getElementById('lista-presenca')) {
    const presencas = JSON.parse(localStorage.getItem('presencas') || '[]');
    const lista = document.getElementById('lista-presenca');
    const total = document.getElementById('total-presencas');
    
    lista.innerHTML = '';
    
    if (presencas.length === 0) {
      lista.innerHTML = '<li class="list-group-item text-muted">Nenhuma presença registrada ainda</li>';
    } else {
      presencas.forEach(aula => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.innerHTML = `
          <span>Aula ${aula.replace('aula', '')}</span>
          <span class="badge bg-success rounded-pill">Presente</span>
        `;
        lista.appendChild(li);
      });
    }
    
    total.textContent = presencas.length;
  }
}

// Inicialização
window.onload = () => {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  
  carregarPresencas();
};