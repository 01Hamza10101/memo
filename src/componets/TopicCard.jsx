const IconWrapper = ({ children }) => (
  <div className="w-8 h-8 p-1 rounded z-10 cursor-pointer">
    {children}
  </div>
);

const Icon = {
  See:() => (
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
}


function TopicCard({ topic, onDisplayImg, onCompleted, onCancel }) {
  const { title = "Title", id = "ID123", imageFile } = topic || {};

  const handleOpenImage = () => {
    if (!imageFile) {
      console.log("No image available");
      return;
    }
    const blob = new Blob([imageFile], { type: "image/png" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <div className="w-72 h-80 m-1 bg-gray-700 rounded text-white overflow-hidden">
      <div className="p-2">
        <h2>{title}</h2>
        <div className="font-mono text-xs">{id}</div>
      </div>

      <div className="h-2/3 w-full bg-gray-400 relative">
        <img
          src={typeof imageFile === "string" ? imageFile : ""}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute hover:opacity-85 top-0 right-0 bg-gray-700"
          onClick={handleOpenImage}
        >
          <IconWrapper>
            <Icon.See />
          </IconWrapper>
        </div>
      </div>

      <div className="flex space-x-2 p-2">
        <button
          className="bg-green-500 hover:bg-green-600 w-1/2 flex justify-center items-center px-4 py-1 rounded cursor-pointer"
          onClick={onCompleted}
        >
          <Icon.Correct />
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 w-1/2 flex justify-center items-center px-4 py-1 rounded cursor-pointer"
          onClick={onCancel}
        >
          <Icon.Cancel />
        </button>
      </div>
    </div>
  );
}

export default TopicCard;
