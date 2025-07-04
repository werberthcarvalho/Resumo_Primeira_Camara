
function marcarPresenca(aula){alert('Presença registrada: ' + aula);}
function toggleDarkMode(){
  document.body.classList.toggle('dark-mode');
  localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}
window.onload = () => {
  if(localStorage.getItem('darkMode')==='true'){
    document.body.classList.add('dark-mode');
  }
}
