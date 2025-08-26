import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '../assets/router'
import { Provider } from 'react-redux'
import setupStore from '../redux/setupStore'

const store = setupStore()

const App = () => {

  const isSelectedGamePage = window.location.href.includes('games/') || window.location.pathname === '/'

  return (
    <React.StrictMode>
      <Provider store={store}>
        <main id={`${isSelectedGamePage ? 'reset__padding' : ''}`} className={`${window.location.pathname === '/' ? 'home__page__padding' : ''}`}>
          <RouterProvider router={router}>
          </RouterProvider>
        </main>
      </Provider>
    </React.StrictMode>
  )
}

export default App
