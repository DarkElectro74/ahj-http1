/* eslint-disable class-methods-use-this */
export default class Display {
  constructor() {
    this.tickets = document.querySelector('#tickets');
  }

  displayTickets(arrayTickets) {
    this.tickets.innerHTML = '';
    for (const item of arrayTickets) {
      const newDate = new Date(item.created);
      const date = this.convertDate(newDate.getDate());
      const month = this.convertDate(newDate.getMonth() + 1);
      const year = this.convertDate(newDate.getFullYear());
      const hours = this.convertDate(newDate.getHours());
      const minutes = this.convertDate(newDate.getMinutes());
      const fullDate = `${date}.${month}.${year} ${hours}:${minutes}`;

      const ticket = document.createElement('div');
      ticket.className = 'ticket';
      ticket.dataset.id = item.id;
      ticket.innerHTML = `
      <div class="status"><span class="change-status pointer" data-status="${item.status}"></span></div>
      <div class="ticket-name">${item.name}
      </div>
      <div class="ticket-date">${fullDate}</div>
      <div class="editor">
        <span class="edit-ticket pointer"></span>
        <span class="delete-ticket pointer"></span>
      </div>
      `;
      this.tickets.appendChild(ticket);
    }
  }

  convertDate(value) {
    const convertedValue = value < 10 ? `0${value}` : value;
    return convertedValue;
  }
}