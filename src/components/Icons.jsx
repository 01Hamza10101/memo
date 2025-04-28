const Icon = {
  Add: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M16 4c6.6 0 12 5.4 12 12s-5.4 12-12 12S4 22.6 4 16S9.4 4 16 4m0-2C8.3 2 2 8.3 2 16s6.3 14 14 14s14-6.3 14-14S23.7 2 16 2"/><path fill="currentColor" d="M24 15h-7V8h-2v7H8v2h7v7h2v-7h7z"/></svg>
  ),
  Result: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32"><path fill="currentColor" d="M14 23h8v2h-8zm-4 0h2v2h-2zm4-5h8v2h-8zm-4 0h2v2h-2zm4-5h8v2h-8zm-4 0h2v2h-2z"/><path fill="currentColor" d="M25 5h-3V4a2 2 0 0 0-2-2h-8a2 2 0 0 0-2 2v1H7a2 2 0 0 0-2 2v21a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2M12 4h8v4h-8Zm13 24H7V7h3v3h12V7h3Z"/></svg>
  ),
  See: () => (
    <svg className="w-8 h-8 p-1 rounded cursor-pointer" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path d="M16,7C9.934,7,4.798,10.776,3,16c1.798,5.224,6.934,9,13,9s11.202-3.776,13-9C27.202,10.776,22.066,7,16,7z" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      <circle cx="16" cy="16" r="5" fill="none" stroke="#FFFFFF" strokeWidth="2" />
    </svg>
  ),
  
  Delete: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 17H11V8H9V17ZM13 17H15V8H13V17ZM5 21V6H4V4H9V3H15V4H20V6H19V21H5Z" fill="#FFFFFF" />
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
  ),
  Correct: () => (
    <svg viewBox="0 0 30 30" fill="white" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <path d="M26.25 8.75L11.25 23.75 4.375 16.875 6.138 15.113 11.25 20.213 24.488 6.988 26.25 8.75z" />
    </svg>
  ),
};

export default Icon;