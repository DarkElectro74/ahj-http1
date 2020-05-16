/* eslint-disable no-console */
export default class DeleteTicket {
  init() {
    const deleteTicket = document.createElement('div');
    deleteTicket.id = 'delete-ticket';
    deleteTicket.className = 'popup hidden';
    deleteTicket.innerHTML = `
    <div id="close-delete"></div>
    <p id="title-popup">Удалить тикет?</p>
    <p class="text-popup">Вы уверены, что хотите удалить тикет? Это действие необратимо.</p>
    <div class="buttons">
      <div id="delete-button-delete" class="delete button">ОК</div>
      <div id="cancel-button-delete" class="cancel button">Отмена</div>
    </div>
    `;
    document.body.appendChild(deleteTicket);

    this.deleteTicketId = document.getElementById('delete-ticket');
    this.deleteButton = document.getElementById('delete-button-delete');
    this.cancelButton = document.getElementById('cancel-button-delete');
    this.close = document.getElementById('close-delete');
  }

  deleteElement(callback) {
    this.deleteTicketId.classList.remove('hidden');
    this.deleteTicketId.style.top = `${(window.innerHeight - this.deleteTicketId.offsetHeight) / 2}px`;
    this.deleteTicketId.style.left = `${(window.innerWidth - this.deleteTicketId.offsetWidth) / 2}px`;

    this.close.addEventListener('click', () => {
      this.deleteTicketId.classList.add('hidden');
      console.log('closed');
    });

    this.deleteButton.addEventListener('click', () => {
      this.deleteTicketId.classList.add('hidden');
      console.log('deleted');
      callback();
    });

    this.cancelButton.addEventListener('click', () => {
      this.deleteTicketId.classList.add('hidden');
      console.log('canceled');
    });
  }
}