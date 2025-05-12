import { useState, useEffect, useRef } from "react";
import "./App.css";
import TopicCard from "./components/TopicCard";
import { saveTodo, getTodos, deleteTodo, getTodayTodos, CancelTodos, completedTodos } from "./components/indexedDB";
import TodoTable from "./components/todoTable";
import Icon from "./components/Icons";

function App() {
  const [topicData, setTopicData] = useState([]);
  const [todayTopicData, setTodayTopicData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState("");
  const [isAddingTopic, setIsAddingTopic] = useState(false);
  const [isTodoTable, setIsTodoTable] = useState(false);

  const fileInputRef = useRef()

  useEffect(() => {
    loadTodos();
  }, []);

 const loadTodos = async () => {
  try {
    const [allTodos, todayTodos] = await Promise.all([
      getTodos(),
      getTodayTodos(),
    ]);
    setTopicData(allTodos || []);
    setTodayTopicData(todayTodos || []);
  } catch (err) {
    console.error("loadTodos error:", err);
    setTopicData([]);          
    setTodayTopicData([]);      
  }
};


  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setImageData(reader.result);
    reader.readAsDataURL(file);

    if (selectedImage) URL.revokeObjectURL(selectedImage);
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleClickImage = () => {
    fileInputRef.current?.click()
  }

  const handleTopicAdd = async () => {
    if (!title.trim() || !imageData) return;
    await saveTodo(title, imageData);
    setTitle("");
    setImageData(null);
    setSelectedImage(null);
    setIsAddingTopic(false);
    loadTodos();
  };

  const handleOpenImage = async (imageFile) => {
    if (!imageFile || typeof imageFile !== "string") {
      return;
    }

    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`
        <html>
          <head><title>Image</title></head>
          <body style="margin:0; display:flex; align-items:center; justify-content:center; background:black;">
            <img src="${imageFile}" style="max-width:100%; max-height:100%;" />
          </body>
        </html>
      `);
      newTab.document.close();
    } else {
      console.error("Failed to open a new tab.");
    }
  };
  return (
    <div className="h-screen w-screen overflow-x-scroll hide-scrollbar bg-gray-900 text-white relative">
      {/* Add Topic Modal */}
      {isAddingTopic && (
        <div className="absolute flex flex-col bg-gray-700 border border-gray-700 rounded z-20 right-4 top-3 sm:w-96 p-4">
          <button className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsAddingTopic(false)}>
            <Icon.Cancel />
          </button>
          <div className="flex flex-col items-center justify-center h-full gap-4">
            {!selectedImage ? (
              <>
                <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageChange} />
                <div onClick={handleClickImage}>
                  <Icon.ImageAdd />
                </div>
              </>
            ) : (
              <img className="h-40 object-contain" src={imageData} alt="Selected" />
            )}
            <input
              className="outline-0 border-0 bg-gray-600 text-white p-2 w-full"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
            />
            <button className="p-2 bg-green-500 font-bold text-white w-full cursor-pointer" onClick={handleTopicAdd}>
              Add
            </button>
          </div>
        </div>
      )}

      {
        isTodoTable && (
          <div className="absolute flex flex-col bg-gray-800 z-20 w-screen sm:w-96 sm:right-0 border border-gray-700 p-4">
            <button className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsTodoTable(false)}>
              <Icon.Cancel />
            </button>
            <div className="mt-10">
              <TodoTable todos={topicData} />
            </div>
          </div>
        )
      }
      {/* Main Content */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-center items-center gap-2">
          <button className="bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setIsTodoTable(true)}>
            <Icon.Result />
          </button>
          <input className="p-2 outline-0 bg-gray-700 rounded disabled:cursor-not-allowed " disabled placeholder="Topic" type="text" />
          <button className="bg-gray-700 p-2 rounded cursor-pointer" onClick={() => setIsAddingTopic(true)}>
            <Icon.Add />
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {todayTopicData.length > 0 ? (
            todayTopicData.map(({ title, id, date, imageFile }) => (
              <TopicCard
                key={id}
                topic={{ title, id, imageFile }}
                onDisplayImg={() => {
                  setImageData(imageFile);
                  setIsViewingImage(true);
                }}
                onCompleted={async () => {
                  await completedTodos(id);
                  loadTodos();
                }}
                onCancel={async () => {
                  await CancelTodos(id);
                  loadTodos();
                }}
              />
            ))
          ) : (
            <div className="font-bold text-3xl text-gray-500">No topics for today.</div>
          )}
        </div>

        <div className="flex flex-wrap justify-center gap-4">
          {topicData.length > 0 && topicData.map(({ title, imageFile, id }) => (
            <div key={id} className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gray-700 rounded overflow-hidden shadow p-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{title}</div>
                  <div className="text-xs text-gray-400">Uploaded on {new Date(id).toLocaleString()}</div>
                </div>
                <button
                  className="hover:opacity-75 cursor-pointer"
                  onClick={async () => {
                    if (window.confirm("Are you sure you want to delete this item?")) {
                      try {
                        await deleteTodo(id);
                        await loadTodos(); // ✅ Awaited
                      } catch (err) {
                        console.error("Error after deleting todo:", err);
                        alert("Failed to reload todos. See console for details.");
                      }
                    }
                  }}
                >
                  <Icon.Delete />
                </button>

              </div>
              <div className="relative mt-2">
                <button
                  className="absolute top-2 right-2 bg-gray-700 rounded p-1"
                  onClick={() => {
                    handleOpenImage(imageFile);
                  }}
                >
                  <Icon.See />
                </button>
                <img src={imageFile} alt={title} className="w-full h-40 object-cover rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
