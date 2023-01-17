import './scss/style.scss';
import './App.css';
import Home from './components/Home';
import ResultStorefront from './components/ResultStorefront';
import ResultCheckout from './components/ResultCheckout';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OptionsProvider } from './context/optionsContextObject';
import { OptionZoneProvider } from './context/optionZoneContext';
import { OptionsCheckout } from './context/optionsContextCheckout';




function App() {
  return (
    <OptionsCheckout>
      <OptionZoneProvider>
        <OptionsProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={ <Home /> }/>
              <Route path="/result-storefront" element={ <ResultStorefront /> }/>
              <Route path="/result-checkout" element={ <ResultCheckout /> }/>
            </Routes>
          </BrowserRouter>
        </OptionsProvider>
      </OptionZoneProvider>
    </OptionsCheckout>

  );
}

export default App;
