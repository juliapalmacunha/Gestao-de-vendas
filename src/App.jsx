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
          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </LayoutPrincipal>
      </AuthProvider>


    </>




  )
}

export default App
