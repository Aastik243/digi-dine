import Layout from './pages/Layout/Layout';
import User from './pages/User/User';
import Admin from './pages/Admin/Admin';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import NotFound from './components/NotFound';
import Login from './pages/login/login';
 import Signup from './pages/login/signup';
import { CartProvider, UserProvider } from './components/ContextReducer/ContextReducer';
import FeedbackForm from './pages/feedback/feedback.jsx';
import Order from './pages/Order/orderhistory.jsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route path="/user" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/order" element={<Order />} />
        <Route path="/feedback" element={<FeedbackForm />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

const App = () => {
  return(
    <>   <UserProvider> <CartProvider>
     <RouterProvider router={router} />
     </CartProvider>
     </UserProvider>
     </>
  )
}

export default App;
