export class AbstractView {
  constructor() {
    this.app = document.getElementById("root");
  }

  setTitle(title) {
    document.title = title;
  }

  // Отображение view
  render() {
    return;
  }

  // Отмена всех необходимых подписок
  destroy() {
    return;
  }
}
