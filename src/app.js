import { BookView } from "./views/book/book";
import { FavoritesView } from "./views/favorites/favorites";
import { MainView } from "./views/main/main";

class App {
  //  Куда идти
  routes = [
    { path: "", view: MainView },
    { path: "#favorites", view: FavoritesView },
    { path: "#book/:id", view: BookView },
  ];
  // Работает с favorites
  appState = { favorites: [] };

  constructor() {
    //   Точно нужен bind?
    //   Подписываемся на изменение hash
    window.addEventListener("hashchange", this.route.bind(this));
    this.route();
  }

  route() {
    //   Отписываемся, если уже есть view
    if (this.currentView) {
      this.currentView.destroy();
    }

    const view = this.routes.find(
      (r) => r.path.split("/")[0] == location.hash.split("?")[0]
    ).view;
    this.currentView = new view(this.appState);
    this.currentView.render();
  }
}

new App();
