import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Social from './pages/Social';
import Corporate from './pages/Corporate';

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/social" element={<Social />} />
        <Route path="/corporativo" element={<Corporate />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;