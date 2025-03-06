import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { database } from "./firebaseConfig";

const addTasks = async (title, date, time, category, priority) => {
  try {
    const task = {
      title,
      date,
      time,
      category,
      priority,
      isCompleted: false, // crossing out the tasks but in the start it is false
      createdAt: serverTimestamp(),
    };
    console.log(task);

    await addDoc(collection(database, "tasks"), task);
    console.log("task submitted sucessfully");
  } catch (error) {
    console.log(error, "Error adding the task");
  }
};

export default addTasks;
