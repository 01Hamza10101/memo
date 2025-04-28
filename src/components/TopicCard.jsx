import Icon from "./Icons";

const IconWrapper = ({ children }) => (
  <div className="p-1 rounded z-10 cursor-pointer">
    {children}
  </div>
);

function TopicCard({ topic, onDisplayImg, onCompleted, onCancel }) {
  const { title = "Title", id = "ID123", imageFile } = topic || {};

  const handleOpenImage = () => {
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
    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md bg-gray-700 rounded-lg overflow-hidden text-white m-2 flex flex-col shadow-lg">
      {/* Title */}
      <div className="p-3">
        <h2 className="text-lg font-semibold truncate">{title}</h2>
        <div className="font-mono text-xs text-gray-300">{id}</div>
      </div>

      {/* Image */}
      <div className="relative w-full h-48 bg-gray-400">
        <img
          src={typeof imageFile === "string" ? imageFile : ""}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* View Icon */}
        <div
          className="absolute top-2 right-2 bg-gray-700 bg-opacity-50 rounded-md hover:bg-opacity-70 transition"
          onClick={handleOpenImage}
        >
          <IconWrapper>
            <Icon.See />
          </IconWrapper>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between h-16 p-3">
        <button
          className="flex-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white py-2 rounded-l-lg"
          onClick={onCompleted}
        >
          <Icon.Correct />
        </button>
        <button
          className="flex-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white py-2 rounded-r-lg"
          onClick={onCancel}
        >
          <Icon.Cancel />
        </button>
      </div>
    </div>
  );
}

export default TopicCard;
