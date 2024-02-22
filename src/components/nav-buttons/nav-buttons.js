import { DivComponent } from "../../common/div-component";
import "./nav-buttons.css";

export class NavButtons extends DivComponent {
  constructor(state) {
    super();
    this.state = state;
  }

  previous() {
    this.state.offset -= 1 * this.state.limit;
  }

  next() {
    this.state.offset += 1 * this.state.limit;
  }

  render() {
    if (this.state.list.length) {
      const navButtons = document.createElement("div");
      navButtons.classList.add("nav__wrapper");
      this.el.append(navButtons);

      if (this.state.offset !== 0) {
        const buttonPrevious = document.createElement("button");
        buttonPrevious.classList.add("nav__button");
        buttonPrevious.classList.add("nav__button_previous");
        buttonPrevious.innerHTML = `
          <img src="/static/icons/arrow_left.svg" alt="Стрелка назад"/>
      Предыдущая страница`;
        navButtons.append(buttonPrevious);
        navButtons
          .querySelector(".nav__button_previous")
          .addEventListener("click", this.previous.bind(this));
      }
      if (this.state.numFound > this.state.offset + this.state.limit) {
        const buttonNext = document.createElement("button");
        buttonNext.classList.add("nav__button");
        buttonNext.classList.add("nav__button_next");
        buttonNext.innerHTML = `Следующая страница
      <img src="/static/icons/arrow_right.svg" alt="Стрелка вперед"/>`;
        navButtons.append(buttonNext);
        navButtons
          .querySelector(".nav__button_next")
          .addEventListener("click", this.next.bind(this));
        if (this.state.offset == 0) {
          navButtons.classList.remove("nav__wrapper");
          navButtons.classList.add("nav__wrapper_right");
        }
      }
    }
    return this.el;
  }
}
