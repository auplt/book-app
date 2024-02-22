import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";
import { Search } from "../../components/search/search";
import { CardList } from "../../components/card-list/card-list";
import { NavButtons } from "../../components/nav-buttons/nav-buttons";

export class MainView extends AbstractView {
  // Parametres that describe main view state
  state = {
    list: [],
    numFound: 0,
    loading: false,
    searchQuery: undefined,
    offset: 0,
    limit: 12,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    // Listener on App state changes
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    // Listener on Main view changes
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      this.render();
    }
  }

  async stateHook(path) {
    if (path === "searchQuery" || path === "offset") {
      this.state.loading = true;
      const data = await this.loadList(
        this.state.searchQuery,
        this.state.offset,
        this.state.limit
      );
      this.state.loading = false;
      this.state.numFound = data.numFound;
      this.state.list = data.docs;
    }

    if (path === "list" || path === "loading") {
      this.render();
    }
  }

  // Gets list of books
  async loadList(q, offset, limit) {
    const res = await fetch(
      `https://openlibrary.org/search.json?q=${q}&offset=${offset}&limit=${limit}`
    );
    return res.json();
  }

  render() {
    const main = document.createElement("div");
    const header = document.createElement("h1");
    header.innerText = `Найдено книг - ${this.state.numFound}`;
    main.append(new Search(this.state).render());
    main.append(header);
    main.append(new CardList(this.appState, this.state).render());
    main.append(new NavButtons(this.state).render());
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
