
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Route from './Routes';
import Global from './styles/Global';
import { AuthProvider } from './Hooks/AuthContext';
import { StyledToastContainer } from './styles/StyledToastContainer';
import 'react-toastify/dist/ReactToastify.css';

const App =() => {
  return (
   <>
      <Global />
      <BrowserRouter>
      <AuthProvider>
          <Route />
          <StyledToastContainer
                position="bottom-right"
                autoClose={5000}
                limit={3}
                rtl={false}
                newestOnTop
                closeOnClick
                pauseOnFocusLoss
                draggable
              />
      </AuthProvider>
      </BrowserRouter>

   </>
  );
}

export default App;
