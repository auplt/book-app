import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { Book } from "../../components/book-card/book-card.js";

export class BookView extends AbstractView {
  // Parametres that describe books' view state
  state = {
    id: undefined,
    loading: false,
    notFound: false,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Книга");
    this.getId();
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  async stateHook(path) {
    if (path === "id") {
      this.state.loading = true;
      try {
        await this.getData();
      } catch {
        this.state.notFound = true;
      }
      this.state.loading = false;
    }

    if (path === "loading") {
      this.render();
    }
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  getId() {
    const route = document.location.hash.split("?");
    if (route.length >= 2) {
      const searchParams = new URLSearchParams(
        document.location.hash.split("?")[1]
      );
      if (!searchParams.has("id")) {
        this.state.notFound = true;
        return;
      }
      const idString = searchParams.get("id");

      this.state.id = idString.slice(1, idString.length);
    }
  }

  // Gets main data
  async loadDetails(q) {
    const res = await fetch(`http://openlibrary.org/${q}.json`);
    return res.json();
  }

  // Gets description of the book
  async loadBook(q) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=0&limit=1`
    );
    return res.json();
  }

  async getData() {
    const data = await this.loadBook(this.state.id);
    this.bookState = data.docs[0];
    this.detailsSate = await this.loadDetails(this.state.id);
  }

  render() {
    const book = new Book(
      this.appState,
      this.bookState,
      this.detailsSate,
      this.state
    ).render();
    this.app.innerHTML = "";
    this.app.append(book);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
