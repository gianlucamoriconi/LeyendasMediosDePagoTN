import './scss/style.scss';
import './App.css';
import Home from './components/Home';
import Result from './components/Result';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OptionsProvider } from './context/optionsContextObject';



function App() {
  return (
    <OptionsProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home /> }/>
          <Route path="/result" element={ <Result /> }/>
        </Routes>
      </BrowserRouter>
    </OptionsProvider>
  );
}

export default App;
