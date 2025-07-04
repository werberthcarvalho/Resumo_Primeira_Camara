function marcarPresenca(aula) {
  localStorage.setItem(aula, 'presente');
  alert('Presença marcada com sucesso!');
}

function toggleDarkMode() {
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

window.onload = function () {
  if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
  }
  const lista = document.getElementById('lista-presenca');
  if (lista) {
    for (let i = 1; i <= 10; i++) {
      let aula = 'aula' + i;
      if (localStorage.getItem(aula)) {
        const li = document.createElement('li');
        li.className = 'list-group-item';
        li.textContent = `Aula ${i}: Presente`;
        lista.appendChild(li);
      }
    }
  }
}