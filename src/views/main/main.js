import { AbstractView } from "../../common/view";
import onChange from "on-change";
import { Header } from "../../components/header/header";

export class MainView extends AbstractView {
  // Параметры состояния оснвного view
  state = {
    list: [],
    loading: false,
    searchQuery: undefined,
    offset: 0,
  };

  constructor(appState) {
    super();
    // Спустили состояние из корневого приложения наверх
    this.appState = appState;
    this.appState = onChange(this.appState, this.appStateHook.bind(this));
    this.setTitle("Поиск книг");
  }

  appStateHook(path) {
    console.log(path);
    if (path === "favourates") {
      console.log(path);
      // this.render();
    }
  }

  render() {
    const main = document.createElement("div");
    this.app.innerHTML = "";
    this.app.append(main);
    this.renderHeader();
    this.appState.favourates.push("d");
  }

  renderHeader() {
    const header = new Header(this.appState).render();
    this.app.prepend(header);
  }
}
