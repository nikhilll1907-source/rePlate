import { createBrowserRouter } from 'react-router';
import { Root } from './Root';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ProductShowcase } from './pages/ProductShowcase';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'login',
        Component: Login,
      },
      {
        path: 'signup',
        Component: SignUp,
      },
      {
        path: 'products',
        Component: ProductShowcase,
      },
    ],
  },
]);
