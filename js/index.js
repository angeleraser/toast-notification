import { ToastProvider } from "./toast.js";

const toastButtons = Array.from(document.querySelectorAll("[data-toast-type]"));
const toastProvider = new ToastProvider(document.getElementById("app"));

toastButtons.forEach(function (btn) {
  btn.addEventListener("click", function ({ target: { dataset } }) {
    toastProvider.showToast({
      type: dataset.toastType,
      title: dataset.toastType.toUpperCase(),
      message: "Lorem ipsum dolor sit, amet consectetur adipisicing elit",
      closeDelay: 3000,
      autoClose: true,
    });
  });
});
