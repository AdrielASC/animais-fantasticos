import outsideClick from "./outsideclick.js";

export default class DropDownMenu {
  constructor(dropdownMenus, events) {
    this.dropdownMenus = document.querySelectorAll(dropdownMenus);

    //define touchstart e click como argumento padrão
    //de events caso o usuário não defina
    if (events === undefined) this.events = ["touchstart", "click"];
    else this.events = events;

    this.activeClass = "active";
    this.activeDropDownMenu = this.activeDropDownMenu.bind(this);
  }

  //ativa o dropdownmenu e adiciona
  //a função que observa o clique fora dele
  activeDropDownMenu(event) {
    event.preventDefault();
    const element = event.currentTarget;
    element.classList.add(this.activeClass);
    outsideClick(element, this.events, () => {
      element.classList.remove(this.activeClass);
    });
  }

  addDropDownMenusEvent() {
    this.dropdownMenus.forEach((menu) => {
      this.events.forEach((userEvent) => {
        menu.addEventListener(userEvent, this.activeDropDownMenu);
      });
    });
  }

  init() {
    if (this.dropdownMenus.length) {
      this.addDropDownMenusEvent();
    }
    return this;
  }
}
