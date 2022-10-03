import './App.scss';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Home from './views/Home';
import Pricing from './views/Pricing';
import SearchCrypto from './views/Search';
import TokenDetail from './views/TokenDetail';
import Login from './views/Login';
import Signup from './views/Signup';
import Setting from './views/Setting';
import PrivateRoute from './components/routing/PrivateRoute';
import { LanguageProvider } from './components/containers/Language';

// Redux
import { ethers } from 'ethers';
import { Web3ReactProvider } from '@web3-react/core';
import { Provider } from 'react-redux';
import { LOGOUT } from './actions/types';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const getLibrary = (provider) => {
  const gottenProvider = new ethers.providers.Web3Provider(provider, 'any');
  return gottenProvider;
}

const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      store.dispatch(loadUser());
    }

    window.addEventListener('storage', () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Web3ReactProvider getLibrary={getLibrary}>

          <Router>
          <LanguageProvider>
            <ToastContainer />
            <Routes>
              <Route path='/' element={
                <>
                  <Navbar />
                  <Home />
                  <Footer />
                </>
              } />
              <Route path='price' element={
                <>
                  <Navbar />
                  <Pricing />
                  <Footer />
                </>
              } />
              <Route path='search' element={<PrivateRoute component=
                {
                  <>
                    <Navbar />
                    <SearchCrypto />
                    <Footer />
                  </>
                } />
              } />
              <Route path='token/:chain/:address' element={<PrivateRoute component=
                {
                  <>
                    <Navbar />
                    <TokenDetail />
                    <Footer />
                  </>
                } />
              } />
              <Route path='setting' element={<PrivateRoute component=
                {
                  <>
                    <Navbar />
                    <Setting />
                    <Footer />
                  </>
                } />
              } />
              <Route path='login' element={<Login />} />
              <Route path='signup' element={<Signup />} />
            </Routes>
        </LanguageProvider>
          </Router>
      </Web3ReactProvider>
    </Provider>
  );
}

export default App;
