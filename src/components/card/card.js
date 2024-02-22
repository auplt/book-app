import { DivComponent } from "../../common/div-component";
import "./card.css";

export class Card extends DivComponent {
  constructor(appSate, cardState) {
    super();
    this.appSate = appSate;
    this.cardState = cardState;
  }

  #addToFavorites() {
    this.appSate.favorites.push(this.cardState);
  }

  #deleteFromFavorites() {
    this.appSate.favorites = this.appSate.favorites.filter(
      (b) => b.key !== this.cardState.key
    );
  }

  render() {
    this.el.classList.add("card");
    const existInFavorites = this.appSate.favorites.find(
      (b) => b.key == this.cardState.key
    );
    this.el.innerHTML = `
        <div class="card__image">
        <img src=${
          this.cardState.cover_edition_key
            ? `https://covers.openlibrary.org/b/olid/${this.cardState.cover_edition_key}-M.jpg`
            : "./static/icons/no-cover.png"
        }
             alt="Обложка" />


        </div>
        <div class="card__info">
            <div class="card__tag">
                ${
                  this.cardState.subject
                    ? this.cardState.subject[0]
                    : "Не задано"
                }
            </div>
            <div class="card__title">
                ${this.cardState.title}
            </div>
            <div class="card__author">
                ${
                  this.cardState.author_name
                    ? this.cardState.author_name[0]
                    : "Не задано"
                }
            </div>
            <div class="card__footer">
                <button class="button__add ${
                  existInFavorites ? "button__active" : ""
                }">
                    ${
                      existInFavorites
                        ? '<img src="/static/icons/favorites.svg" alt="Удалить из избранного" />'
                        : '<img src="/static/icons/favorites_white.svg" alt="Добавить в избранное" />'
                    }
                </button>
                <a class="card__more" href="#book?id=${this.cardState.key}">
                Подробнее
                </a>
            </div>
        </div>
        `;
    if (existInFavorites) {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#deleteFromFavorites.bind(this));
    } else {
      this.el
        .querySelector("button")
        .addEventListener("click", this.#addToFavorites.bind(this));
    }

    return this.el;
  }
}
