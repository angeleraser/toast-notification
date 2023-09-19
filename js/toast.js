class Toast {
  constructor({
    type = "success",
    title = "",
    message = "",
    closeDelay = 2000,
    autoClose = true,
  }) {
    this.type = type;
    this.title = title;
    this.message = message;
    this.toast = this.create();
    this.closeDelay = closeDelay;
    this.autoClose = autoClose;
    this.timeout = 300;
    this.toast.style.transitionDuration = `${this.timeout}ms`;
    if (this.autoClose) this.autoDestroy();
  }

  create() {
    const toastRoot = document.createElement("div");
    toastRoot.classList.add("toast");
    toastRoot.setAttribute("data-type", this.type);

    const title = document.createElement("h4");
    title.classList.add("toast-title");
    title.textContent = this.title;

    const message = document.createElement("p");
    message.classList.add("toast-message");
    message.textContent = this.message;

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("toast-close-btn");
    closeBtn.textContent = "+";

    closeBtn.addEventListener("click", () => this.destroy());

    toastRoot.append(title, message, closeBtn);

    return toastRoot;
  }

  show(rootElement) {
    setTimeout(() => {
      rootElement.appendChild(this.toast);
    }, this.timeout);
  }

  destroy() {
    this.toast.classList.add("toast-close");
    setTimeout(() => this.toast.remove(), this.timeout);
  }

  autoDestroy() {
    setTimeout(() => {
      this.destroy();
    }, this.closeDelay);
  }

  getElement() {
    return this.toast;
  }
}

class ToastProvider {
  constructor(app) {
    this.root = this.createToastContainer(app);
  }

  createToastContainer(app) {
    const toastContainer = document.createElement("div");
    toastContainer.classList.add("toast-container");
    app.append(toastContainer);
    return toastContainer;
  }

  showToast({ type, title, message, closeDelay, autoClose }) {
    const toast = new Toast({ type, title, message, closeDelay, autoClose });
    this.root.appendChild(toast.getElement());
  }
}

export { ToastProvider };
