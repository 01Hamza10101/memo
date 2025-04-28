const IconWrapper = ({ children }) => (
  <div className="w-8 h-8 p-1 rounded z-10 cursor-pointer">
    {children}
  </div>
);

const Icon = {
  See: () => (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
    >
      <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" />
      <circle cx="16" cy="16" r="5" />
    </svg>
  ),
  Cancel: () => (
    <svg viewBox="0 0 30 30" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path fillRule="evenodd" clipRule="evenodd" d="M24.275 6.775L22.5 5 14.638 12.875 6.775 5 5 6.775 12.875 14.638 5 22.5 6.775 24.275 14.638 16.4 22.5 24.275 24.275 22.5 16.4 14.638 24.275 6.775z" />
    </svg>
  ),
  Correct: () => (
    <svg viewBox="0 0 30 30" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M26.25 8.75L11.25 23.75 4.375 16.875 6.138 15.113 11.25 20.213 24.488 6.988 26.25 8.75z" />
    </svg>
  ),
};

function TopicCard({ topic, onDisplayImg, onCompleted, onCancel }) {
  const { title = "Title", id = "ID123", imageFile } = topic || {};

  const handleOpenImage = () => {
    if (!imageFile || typeof imageFile !== "string") {
      console.log("No valid image available");
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
