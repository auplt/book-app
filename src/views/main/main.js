import { AbstractView } from "../../common/view";

export class MainView extends AbstractView {
  constructor() {
    super();
    this.setTitle("Поиск книг");
  }

  render() {
    const main = document.createElement("div");
    main.innerHTML = "Test";
    this.app.innerHTML = "";
    this.app.append(main);
  }
}
