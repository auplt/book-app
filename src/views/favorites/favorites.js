import { AbstractView } from "../../common/view.js";
import onChange from "on-change";
import { Header } from "../../components/header/header.js";
import { CardList } from "../../components/card-list/card-list.js";
import { NavButtons } from "../../components/nav-buttons/nav-buttons.js";

export class FavoritesView extends AbstractView {
  // Parametres that describe favorites' view state
  state = {
    list: [],
    offset: 0,
    limit: 12,
    numFound: 0,
  };

  constructor(appState) {
    super();
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.state.list = this.appState.favorites;
    this.state.numFound = this.appState.favorites.length;
    this.state = onChange(this.state, this.stateHook.bind(this));
    this.setTitle("Мои книги");
  }

  destroy() {
    onChange.unsubscribe(this.appState);
    onChange.unsubscribe(this.state);
  }

  appStateHook(path) {
    if (path === "favorites") {
      // Change of parametres of favorites' view state
      this.state.list = this.appState.favorites;
      this.state.numFound = this.appState.favorites.length;

      // Check weater this is the last page
      if (this.state.numFound <= this.state.offset) {
        // Check weather an empty page will be loaded
        if (this.state.numFound % this.state.limit === 0) {
          // Check weather only the first page is left
          if (this.state.offset > 0) {
            this.state.offset -= this.state.limit;
          }
        }
      }
      this.render();
    }
  }

  stateHook(path) {
    if (path === "offset") {
      this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = `
    		<h1>Избранное</h1>
    	`;

    main.append(
      /* list contains a slice of book list
      if the number of books in the last portion is lower than limit, the right 
      border equals the number of books */
      new CardList(this.appState, {
        list: this.appState.favorites.slice(
          this.state.offset,
          this.state.offset + this.state.limit > this.appState.favorites.length
            ? this.appState.favorites.length
            : this.state.offset + this.state.limit
        ),
      }).render()
    );
    this.app.innerHTML = "";
    main.append(new NavButtons(this.state).render());
    this.app.append(main);
    this.renderHeader();
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
