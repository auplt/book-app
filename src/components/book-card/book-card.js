import { DivComponent } from "../../common/div-component";
import "./book-card.css";

export class Book extends DivComponent {
  constructor(appState, bookState, detailsState, parentState) {
    super();
    this.appState = appState;
    this.bookState = bookState;
    this.detailsState = detailsState;
    this.parentState = parentState;
  }

  #getTags() {
    if (!this.bookState.subject) {
      return undefined;
    }
    this.bookState.subject.sort((a, b) => a.length - b.length);
    let tags = "";
    for (const tag of this.bookState.subject.splice(
      0,
      this.bookState.subject.length <= 5 ? this.bookState.subject.length : 5
    )) {
      tags += `<div class="book__tag">${tag}</div>`;
    }
    return tags;
  }

  #addToFavorites() {
    this.appState.favorites.push(this.bookState);
  }

  #deleteFromFavorites() {
    this.appState.favorites = this.appState.favorites.filter(
      (b) => b.key !== this.bookState.key
    );
  }

  render() {
    if (this.parentState.loading == true) {
      this.el.innerHTML = `<div class="book-card__loader">Загрузка...</div>`;
      return this.el;
    }
    if (this.parentState.notFound == true) {
      this.el.innerHTML = `<h1 class="book-card__not-found">Информация по запрашиваемой книге не найдена</h1>`;
      return this.el;
    }
    this.el.classList.add("book-card");
    const existInFavorites = this.appState.favorites.find(
      (b) => b.key == this.bookState.key
    );

    const book_wrapper = document.createElement("div");
    book_wrapper.innerHTML = `
        <h1>${this.bookState.title}</h1>
        <div class="book__wrapper">
            <img class="book__image" src=${
              this.bookState.cover_edition_key
                ? `https://covers.openlibrary.org/b/olid/${this.bookState.cover_edition_key}-M.jpg`
                : "./static/icons/no-cover.png"
            }
             alt="Обложка" />
            <div class="book__info-wrapper">
                <div class="book__author">
                    Автор: 
                    <span class="book_bold">
                        ${
                          this.bookState.author_name
                            ? this.bookState.author_name[0]
                            : "Не задано"
                        }
                    </span>
                </div>
                <div class="book__subject">
                    Жанр: 
                    <span class="book_bold">
                        ${
                          this.bookState.subject
                            ? this.bookState.subject[0]
                            : "Не задано"
                        }
                    </span>
                </div>
                <div class="book__publish">
                    Первая публикация: 
                    <span class="book_bold">
                    ${
                      this.bookState.first_publish_year
                        ? this.bookState.first_publish_year
                        : "Не задано"
                    } 
                    </span>
                </div>
                <div class="book__pages">
                    Число страниц: 
                    <span class="book_bold">
                        ${
                          this.bookState.number_of_pages_median
                            ? this.bookState.number_of_pages_median
                            : "Не задано"
                        } 
                    </span>
                </div>
                <button class="book__button-add ${
                  existInFavorites ? "book__button_active" : ""
                }">
                    ${existInFavorites ? "В избранном" : "В избранное"}
                </button>
            </div>
        </div>
        <div class="book__discription">
            <div class="book__attribute">
                Описание: 
            </div>
            ${
              this.detailsState.description
                ? this.detailsState.description
                : "Не задано"
            }
        </div>
        <div class="book__tags">
            <div class="book__attribute">
                Теги:  
            </div>
            <div class="book__tags-list  ${
              this.bookState.subject ? "" : "book__tags-list_empty"
            }">
                ${this.bookState.subject ? this.#getTags() : "Не задано"}
            </div>
        </div>`;
    this.el.append(book_wrapper);
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
