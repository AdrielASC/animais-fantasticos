export default class ToolTip {
  constructor(toolTips) {
    this.toolTips = document.querySelectorAll(toolTips);

    //bind do objeto da classe aos callbacks
    this.onMouseMove = this.onMouseMove.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onMouseOver = this.onMouseOver.bind(this);
  }

  //move a tooltip com base em seus estilos
  //de acordo com a posição do mouse
  onMouseMove(event) {
    this.toolTipBox.style.top = `${event.pageY + 20}px`;
    if (event.pageX + 240 > window.innerWidth) {
      this.toolTipBox.style.left = `${event.pageX - 190}px`;
    } else {
      this.toolTipBox.style.left = `${event.pageX + 20}px`;
    }
  }

  //remove a tooltip e os eventos de mousemove e mouseleave
  onMouseLeave({ currentTarget }) {
    this.toolTipBox.remove();
    currentTarget.removeEventListener("mouseleave", this.onMouseLeave);
    currentTarget.removeEventListener("mousemove", this.onMouseMove);
  }

  //cria a tooltipbox e coloca no body
  criarTooltipBox(element) {
    const toolTipBox = document.createElement("div");
    const text = element.getAttribute("aria-label");
    toolTipBox.classList.add("tooltip");
    toolTipBox.innerText = text;
    document.body.appendChild(toolTipBox);
    this.toolTipBox = toolTipBox;
  }

  //cria a tooltip e adiciona os eventos
  //de mousemove e mouseleave ao target
  onMouseOver({ currentTarget }) {
    //criar a tooltipbox e coloca em uma propriedade
    this.criarTooltipBox(currentTarget);

    currentTarget.addEventListener("mousemove", this.onMouseMove);
    currentTarget.addEventListener("mouseleave", this.onMouseLeave);
  }

  //adiciona os eventos de mouseover a cada tooltip
  addToolTipsEvent() {
    this.toolTips.forEach((item) => {
      item.addEventListener("mouseover", this.onMouseOver);
    });
  }

  init() {
    if (this.toolTips.length) {
      this.addToolTipsEvent();
    }
    return this;
  }
}
