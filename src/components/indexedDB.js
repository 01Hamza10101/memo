import { openDB } from "idb";

const DB_NAME = "todoDB";
const STORE_NAME = "todos";

// Open IndexedDB
const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id", autoIncrement: true });
      }
    },
  });
};

const today = new Date();
const formattedDate = today.toLocaleDateString("en-GB");

// Save a new To-Do
export const saveTodo = async (title, imageFile) => {
  const db = await initDB();
  const todo = {
    id: Date.now(),
    date: "28/04/2025",
    title,
    Cancel: 0,
    completed: [],
    imageFile: null,
  };
  if (imageFile) {
    if (imageFile instanceof Blob || imageFile instanceof File) {
      const reader = new FileReader();

      return new Promise((resolve, reject) => {
        reader.onload = async () => {
          try {
            todo.imageFile = reader.result;
            await db.add(STORE_NAME, todo);
            resolve("To-Do saved!");
          } catch (error) {
            reject(error);
          }
        };
        reader.onerror = reject;
        reader.readAsDataURL(imageFile);
      });
    } 
    else if (typeof imageFile === "string" && imageFile.startsWith("data:image/")) {
      // if it's already a base64 string
      todo.imageFile = imageFile;
    }
  }

  await db.add(STORE_NAME, todo);
  return "To-Do saved!";
};




export const deleteTodo = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
  return `To-Do with ID ${id} deleted!`;
};

// Get all To-Dos
export const getTodos = async () => {
  const db = await initDB();
  return db.getAll(STORE_NAME);
};

export const CancelTodos = async (id) => {
  const db = await initDB();
  const todo = await db.get(STORE_NAME, id);

  if (!todo) {
    throw new Error(`To-Do with ID ${id} not found.`);
  }

  todo.Cancel += 1; // Increment Cancel value
  await db.put(STORE_NAME, todo);
  return `To-Do with ID ${id} updated!`;
};

export const completedTodos = async (id) => {
  const db = await initDB();
  const todo = await db.get(STORE_NAME, id);

  if (!todo) {
    throw new Error(`To-Do with ID ${id} not found.`);
  }

  if (!Array.isArray(todo.completed)) {
    todo.completed = []; // Ensure it's an array
  }

  todo.completed.push(formattedDate);
  await db.put(STORE_NAME, todo);
  return `To-Do with ID ${id} updated!`;
};

// Parse date from "DD/MM/YYYY" format and return only the day
const parseDate = (dateString) => {
  const [day] = dateString.split("/").map(Number);
  return day; // Returns only the day
};

// Check if the upload date is within the selected days
const isSelectedDay = (uploadDate, todayDate, Cancel) => {
  const selectedDays = [1, 2, 3, 5, 7, 9, 12, 15, 19, 23, 25];
  const diff = todayDate - uploadDate - Cancel;
  return diff >= 0 && selectedDays.includes(diff);
};

// Fetch todos that match today's date or the selected days
export const getTodayTodos = async () => {
  const db = await initDB();
  const todos = await db.getAll(STORE_NAME);

  if (!todos || todos.length === 0) {
    throw new Error("No To-Do found");
  }

  const todayDate = parseDate(formattedDate);

  const filteredTodos = todos.filter((item) => {
    if (Array.isArray(item.completed) && item.completed.includes(formattedDate)) {
      return false;
    }
    const uploadDate = parseDate(item.date);
    return isSelectedDay(uploadDate, todayDate, item.Cancel);
  });

  return filteredTodos;
};
