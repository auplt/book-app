import { MainView } from "./views/main/main";

class App {
  //  Куда идти
  routes = [{ path: "", view: MainView }];
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
    // console.log(this);
    const view = this.routes.find((r) => r.path == location.hash).view;
    this.currentView = new view();
    this.currentView.render();
  }
}

new App();
