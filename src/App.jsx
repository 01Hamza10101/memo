import { useState, useEffect, useRef } from "react";
import "./App.css";
import TopicCard from "./componets/TopicCard";
import { saveTodo, getTodos, deleteTodo, getTodayTodos, CancelTodos, completedTodos } from "./componets/indexedDB";

// SVG Icon components
const Icon = {
  Add: () => (
    <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.25 16.3333H0V12.25H12.25V0H16.3333V12.25H28.5833V16.3333H16.3333V28.5833H12.25V16.3333Z" fill="#6753FF" />
    </svg>
  ),
  See: () => (
    <svg className="w-8 h-8 p-1 rounded cursor-pointer" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="16" cy="16" r="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  ),
  Delete: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17H11V8H9V17ZM13 17H15V8H13V17ZM5 21V6H4V4H9V3H15V4H20V6H19V21H5Z" fill="#fff" />
    </svg>
  ),
  ImageAdd: () => (
    <svg className="cursor-pointer" width="28" height="28" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15 12V15H12V17H15V20H17V17H20V15H17V12H15ZM10.3 18H2C0.9 18 0 17.1 0 16V2C0 0.9 0.9 0 2 0H16C17.1 0 18 0.9 18 2V10.3C17.4 10.1 16.7 10 16 10C14.9 10 13.8 10.3 12.9 10.9L11.5 9L8 13.5L5.5 10.5L2 15H10.1C10 15.3 10 15.7 10 16C10 16.7 10.1 17.4 10.3 18Z" fill="white" />
    </svg>
  ),
  Cancel: () => (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M24.275 6.775L22.5 5l-7.863 7.875L6.775 5 5 6.775 12.875 14.638 5 22.5l1.775 1.775L14.638 16.4l7.862 7.875L24.275 22.5 16.4 14.638 24.275 6.775z" fill="white" />
    </svg>
  )
};

function App() {
  const [topicData, setTopicData] = useState([]);
  const [todayTopicData, setTodayTopicData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageData, setImageData] = useState(null);
  const [title, setTitle] = useState("");
  const [isAddingTopic, setIsAddingTopic] = useState(false);

  const fileInputRef = useRef()

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const [allTodos, todayTodos] = await Promise.all([getTodos(), getTodayTodos()]);
    console.log("All Todos:", allTodos);
    setTopicData(allTodos);
    setTodayTopicData(todayTodos);
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
    console.log("Image clicked");
    fileInputRef.current?.click()
  }

  const handleTopicAdd = async () => {
    if (!title.trim() || !imageData) return;
    console.log("Adding topic:", title, imageData);
    await saveTodo(title, imageData);
    setTitle("");
    setImageData(null);
    setSelectedImage(null);
    setIsAddingTopic(false);
    loadTodos();
  };

  const handleOpenImage = () => {
    if (!imageData || typeof imageData !== "string") {
      console.log("No valid image available");
      return;
    }
  
    const newTab = window.open();
    if (newTab) {
      newTab.document.write(`
        <html>
          <head><title>Image</title></head>
          <body style="margin:0; display:flex; align-items:center; justify-content:center; background:black;">
            <img src="${imageData}" style="max-width:100%; max-height:100%;" />
          </body>
        </html>
      `);
      newTab.document.close();
    } else {
      console.error("Failed to open a new tab.");
    }
  };
  return (
    <div className="h-screen w-screen overflow-x-scroll hide-scrollbar bg-gray-800 text-white relative">
      {/* Add Topic Modal */}
      {isAddingTopic && (
        <div className="absolute flex flex-col bg-gray-600 z-20 right-4 top-3 sm:w-96 p-4">
          <button className="absolute top-2 right-2" onClick={() => setIsAddingTopic(false)}>
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
            <button className="p-2 bg-green-500 font-bold text-white w-full" onClick={handleTopicAdd}>
              Add
            </button>
          </div>
        </div>
      )}


      {/* Main Content */}
      <div className="p-4 flex flex-col gap-4">
        <div className="flex justify-center items-center gap-2">
          <input className="p-2 outline-0 bg-gray-700 rounded" placeholder="Topic" type="text" />
          <button className="bg-gray-700 p-2 rounded" onClick={() => setIsAddingTopic(true)}>
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
                onCompleted={() => {
                  completedTodos(id);
                  loadTodos();
                }}
                onCancel={() => {
                  CancelTodos(id);
                  loadTodos();
                }}
              />
            ))
          ) : (
            <div className="font-bold text-3xl text-gray-500">No topics for today.</div>
          )}
        </div>

        <div className="flex flex-wrap justify-start gap-4">
          {topicData.map(({ title, imageFile, id }) => (
            <div key={id} className="w-72 bg-gray-700 rounded overflow-hidden shadow p-2">
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-bold">{title}</div>
                  <div className="text-xs text-gray-400">Uploaded on {id}</div>
                </div>
                <button className="hover:opacity-75" onClick={() => { deleteTodo(id); loadTodos(); }}>
                  <Icon.Delete />
                </button>
              </div>
              <div className="relative mt-2">
                <button
                  className="absolute top-2 right-2 bg-gray-700 rounded p-1"
                  onClick={() => {
                    setImageData(imageFile);
                    handleOpenImage();
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
