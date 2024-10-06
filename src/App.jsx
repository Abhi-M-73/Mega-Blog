import React from "react"

function App() {

  console.log(import.meta.env.VITE_APPWRITE_URL);

  return (
    <>
    <div className="min-h-screen w-full bg-black text-white">
      <h1 className="text-center text-5xl">A blog app in appwrite</h1>
    </div>
    </>
  )
}

export default App
