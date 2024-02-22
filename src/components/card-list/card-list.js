import { DivComponent } from "../../common/div-component";
import { Card } from "../card/card";
import "./card-list.css";

export class CardList extends DivComponent {
  constructor(appSate, parentState) {
    super();
    this.appSate = appSate;
    this.parentState = parentState;
  }

  render() {
    if (this.parentState.loading == true) {
      this.el.innerHTML = `<div class="card-list__loader">Загрузка...</div>`;
      return this.el;
    }
    const cardGrid = document.createElement("div");
    cardGrid.classList.add("card_grid");
    this.el.append(cardGrid);
    for (const card of this.parentState.list) {
      cardGrid.append(new Card(this.appSate, card).render());
    }

    return this.el;
  }
}
