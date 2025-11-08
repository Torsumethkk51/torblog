import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router'
import CreatePost from './pages/CreatePost.tsx'
import AppLayout from './Layout.tsx'

function wrapLayout(pageComponent: React.ReactNode) {
  return <AppLayout>{pageComponent}</AppLayout>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: wrapLayout(<App/>)
  },
  {
    path: "/create-post",
    element: wrapLayout(<CreatePost/>)
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
