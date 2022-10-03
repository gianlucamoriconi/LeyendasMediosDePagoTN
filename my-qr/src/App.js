import logo from './logo.svg';
import './scss/style.scss';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Footer from './components/Footer';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> }/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
