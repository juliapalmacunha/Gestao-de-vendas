import { Outlet } from 'react-router-dom';
import LayoutPrincipal from './layouts/LayoutPrincipal';
import { ToastContainer } from 'react-toastify';
import AuthProvider from './contextos/AuthContext';





function App() {






  return (

    <>



      <AuthProvider>
        <LayoutPrincipal>
          <Outlet />
          
        </LayoutPrincipal>
      </AuthProvider>
      <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />


    </>




  )
}

export default App
