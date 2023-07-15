import Icon from './assets/reload.png';

const button = document.createElement('button');
button.textContent = 'Reload !';

const reloadIcon = document.createElement('img');
reloadIcon.src = Icon;

button.appendChild(reloadIcon);
button.classList.add('reload');
button.addEventListener('click', () => {
  location.reload();
});
export default button;
