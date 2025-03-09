import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { database } from "./firebaseConfig";

const renderTasks = async (tasks = "all") => {
  const tableBody = document.querySelector(".table__body");
  tableBody.innerHTML = ""; // remember to clear the inner html so it wont be duplicated

  let renderCollection; //holds the data that will be rendered

  //render for all
  if ((tasks = "all")) {
    const tasksCollection = collection(database, "tasks");
    // order - by time and date
    const q = query(tasksCollection, orderBy("createdAt"));
    const taskSnapshot = await getDocs(q);
    renderCollection = taskSnapshot.docs;
  } else {
    renderCollection = tasks;
  }
  // for each ot iterate
  renderCollection.forEach((doc, index) => {
    const task = doc.data(); // by adding .data you can render it, as it it creates an object that we can work with

    // CREATING ELEMENTS
    const tableRow = document.createElement("tr");
    const taskNumber = document.createElement("td");
    const taskTitle = document.createElement("td");
    const taskDate = document.createElement("td");
    const taskTime = document.createElement("td");
    const taskCategory = document.createElement("td");
    const taskPriority = document.createElement("td");
    const taskTools = document.createElement("td");

    //BUTTONS INSIDE TABLE
    const crossTaskButton = document.createElement("button");
    const deleteTaskButton = document.createElement("button");
    const editTaskButton = document.createElement("button");

    // APPENDING ELEMENTS
    tableBody.append(tableRow); //attach it to the highest level first
    tableRow.append(
      taskNumber,
      taskTitle,
      taskDate,
      taskTime,
      taskCategory,
      taskPriority,
      taskTools
    );

    taskTools.append(crossTaskButton, deleteTaskButton, editTaskButton);

    // POPULATE THE ELEMENTS WITH TASKS DETAILS
    taskNumber.textContent = index + 1; // as it is an array so it wont show 0 so that it adds 1 each time
    taskTitle.textContent = task.title;
    taskDate.textContent = task.date;
    taskTime.textContent = task.time ? task.time : "−"; //using turnery if they do not choose a time
    taskCategory.textContent = task.category;
    taskPriority.textContent = task.priority;
    crossTaskButton.innerHTML = "<i class='fa-solid fa-check'></i>"; // from fontawsome
    deleteTaskButton.innerHTML = "<i class='fa-solid fa-trash-can'></i>";
    editTaskButton.innerHTML = "<i class='fa-solid fa-pen-to-square'></i>";

    // ADD CLASS NAMES

    // if class is checked, it will be a faded color - therefore adding a class based on the condition - by using short circuting: and (&&) / or (de to strekene)
    task.isCompleted && tableRow.classList.add("task-completed");

    tableRow.classList.add("table__body-row");
    taskNumber.classList.add("table__body-number");
    taskTitle.classList.add("table__body-title");
    taskDate.classList.add("table__body-date");
    taskTime.classList.add("table__body-time");
    taskCategory.classList.add("table__body-category");
    taskPriority.classList.add("table__body-priority");
    taskTools.classList.add("table__body-tools");
    crossTaskButton.classList.add("tools__button");
    deleteTaskButton.classList.add("tools__button");
    editTaskButton.classList.add("tools__button");
  });
};

export default renderTasks;
