import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Login from './pages/Login/index.tsx';
import Register from './pages/Register/index.tsx';
import BookManage from './pages/BookManage/index.tsx';

const routes: RouteObject[] = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/',
    element: <BookManage />,
  }
];

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
