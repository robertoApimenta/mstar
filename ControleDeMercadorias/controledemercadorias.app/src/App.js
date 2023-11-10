import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar'

import Home from './pages/Home'
import Produtos from './pages/Produtos'
import Entradas from './pages/Entradas'
import Saidas from './pages/Saidas'
import Relatorios from './pages/Relatorios'

import GlobalStyles from './assets/styles/global'
import {Container} from './styles'

function App() {
  return (
    <Router>
      <Container>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/produtos' element={<Produtos />} />
          <Route path='/entradas' element={<Entradas />} />
          <Route path='/saidas' element={<Saidas />} />
          <Route path='/relatorios' element={<Relatorios />} />
        </Routes>
      </Container>
      
    </Router>
  );
}

export default App;
