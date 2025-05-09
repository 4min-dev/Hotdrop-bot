import React, { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '../assets/router'

const App = () => {

  return (
    <React.StrictMode>
      <main>
        <RouterProvider router={router}>
        </RouterProvider>
      </main>
    </React.StrictMode>
  )
}

export default App
