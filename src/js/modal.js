const openModal = (formModal, openModalButton) => {
  //adding the function for the displaying form modal
  openModalButton.addEventListener("click", (e) => {
    e.preventDefault();
    formModal.classList.add("form-modal--display");
  });
};

const closeModal = (form, closeModalButton) => {
  closeModalButton.addEventListener("click", () => {
    formModal.classList.remove("form-modal--display");
  });
};
export { openModal, closeModal };
