import './scss/style.scss';
import './App.css';
import Home from './components/Home';
import ResultStorefront from './components/ResultStorefront';
import ResultCheckout from './components/ResultCheckout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OptionsProvider } from './context/optionsContextObject';
import { OptionZoneProvider } from './context/optionZoneContext';
import { OptionsCheckout } from './context/optionsContextCheckout';
import { AuthContextProvider } from './context/googleAuth';
import SignIn from './components/userAuth/SignIn';




function App() {
  return (
    <AuthContextProvider>
      <OptionsCheckout>
        <OptionZoneProvider>
          <OptionsProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={ <Home /> }/>
                <Route path="/login" element={ <SignIn /> }/>
                <Route path="/result-storefront" element={ <ResultStorefront /> }/>
                <Route path="/result-checkout" element={ <ResultCheckout /> }/>
              </Routes>
            </BrowserRouter>
          </OptionsProvider>
        </OptionZoneProvider>
      </OptionsCheckout>
    </AuthContextProvider>

  );
}

export default App;
