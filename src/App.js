import './scss/style.scss';
import './App.css';
import Home from './components/Home';
import Result from './components/Result';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OptionsProvider } from './context/optionsContextObject';
import { OptionZoneProvider } from './context/optionZoneContext';



function App() {
  return (
    <OptionZoneProvider>
      <OptionsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home /> }/>
            <Route path="/result" element={ <Result /> }/>
          </Routes>
        </BrowserRouter>
      </OptionsProvider>
    </OptionZoneProvider>

  );
}

export default App;
