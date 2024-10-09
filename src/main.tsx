import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouteObject, RouterProvider } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import BookManage from './pages/BookManage';

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
