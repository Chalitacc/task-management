import addTasks from "./addTasks";
import app, { database } from "./firebaseConfig";
import { closeModal, openModal } from "./modal";
import renderTasks from "./renderTasks";

console.log(app, database);

// SELECTING DOM ELEMENTS

// for the add task
const formModal = document.querySelector(".form-modal");
const form = document.querySelector(".form");
const openModalButton = document.querySelector(".tools__button--add");
const closeModalButton = document.querySelector(".form__close-button");
const titleInput = document.querySelector(".form__title-input");
const dateInput = document.querySelector(".form__date-input");
const timeInput = document.querySelector(".form__time-input");
const cateogrySelect = document.querySelector(".form__category-select");
const prioritySelect = document.querySelector(".form__priority-select");

// for the chart
const filterSelect = document.querySelector(".tools__filter-month");
const openChartButton = document.querySelector(".tools__button--chart");
const submitButton = document.querySelector(".form__submit-button");
const formSubmissionFeedback = document.querySelector(
  ".form__submission-feedback"
);

// ADDING EVENT LISTENERS
document.addEventListener("DOMContentLoaded", () => {
  openModal(formModal, openModalButton);
  closeModal(formModal, closeModalButton);
  renderTasks(); // when dom is loaded you will be able to see it right away
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addTasks(
    titleInput.value,
    dateInput.value,
    timeInput.value,
    cateogrySelect.value,
    prioritySelect.value
  ); // do not trim them yet as we want to implement validation, as if it is empty it wont pass the validation
  renderTasks(); // call it here to so that it is connected to the submit button
});
