/* eslint-disable class-methods-use-this */
/* eslint-disable no-console */
export default class Popovers {
  constructor(parentElement) {
    this.parentElement = parentElement;
    this.popup = document.createElement('div');
    this.savedTicket = '';
  }

  get htmlElement() {
    return `
      <div id="close"></div>
      <p id="title-popup">Добавить тикет</p>
      <p>Краткое описание</p>
      <input type="text" id="name" class="input" value="" placeholder="Поменять краску в принтере, ком.404">
      <p>Подробное описание</p>
      <input type="text" id="description" class="input" value="" placeholder="Принтер HP LJ1210, картриджи на складе">
      <div class="buttons">
        <div id="save-button" class="save button">ОК</div>
        <div id="cancel-button" class="cancel button">Отмена</div>
      </div>
    `;
  }

  addError(parentElement) {
    const error = document.createElement('div');
    error.id = 'error';
    error.className = 'error hidden';
    error.textContent = 'Some error text here';
    parentElement.appendChild(error);
  }

  saveTicket(callback) {
    this.savedTicket = callback;
  }

  bindToDOM() {
    this.popup.id = 'popup';
    this.popup.className = 'popup hidden';
    this.popup.innerHTML = this.htmlElement;
    this.addError(this.popup);
    this.parentElement.appendChild(this.popup);
    this.constants();
    this.eventsPopup();
  }

  showPopup() {
    this.selectPopup.classList.remove('hidden');
    this.selectPopup.style.top = `${(window.innerHeight - this.selectPopup.offsetHeight) / 2}px`;
    this.selectPopup.style.left = `${(window.innerWidth - this.selectPopup.offsetWidth) / 2}px`;
  }

  constants() {
    this.selectPopup = document.querySelector('#popup');
    this.ticketName = document.querySelector('#name');
    this.ticketDescription = document.querySelector('#description');
    this.saveButton = document.getElementById('save-button');
    this.cancelButton = document.getElementById('cancel-button');
    this.errorBlock = document.querySelector('#error');
    this.close = document.getElementById('close');
  }

  eventsPopup() {
    // close the ticket
    this.close.addEventListener('click', () => {
      this.selectPopup.classList.add('hidden');
      console.log('closed');
    });

    // save the ticket
    this.saveButton.addEventListener('click', () => {
      if (this.ticketName.value === '') {
        this.showError(this.ticketName, 'Введите краткое описание');
        console.log('error');
        return;
      }

      this.selectPopup.classList.add('hidden');
      console.log('saved');
      this.savedTicket();
      this.clearInput();
    });

    // cancel the ticket
    this.cancelButton.addEventListener('click', () => {
      this.selectPopup.classList.add('hidden');
      console.log('cancel');
      this.hidenError();
      this.clearInput();
    });

    // hide the error
    this.ticketName.addEventListener('input', () => {
      this.hidenError();
    });
  }

  hidenError() {
    if (!this.errorBlock.classList.contains('hidden')) {
      this.errorBlock.classList.add('hidden');
    }
  }

  clearInput() {
    this.ticketName.value = '';
    this.ticketDescription.value = '';
  }

  showError(element, message) {
    this.errorBlock.textContent = message;
    this.errorBlock.classList.remove('hidden');
    this.errorBlock.style.top = `${element.offsetTop + element.offsetHeight}px`;
    this.errorBlock.style.left = `${element.offsetLeft + ((element.offsetWidth - this.errorBlock.offsetWidth) / 2)}px`;
  }
}