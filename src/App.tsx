import { useState } from 'react';
import './App.css';
import Navbar from './components/navbar/navbar.component';
import Interactive from './pages/interactive/interactive.page';
import Batch from './pages/batch/batch.page';
import Results from './pages/results/results.page';
import NotFound from './pages/notfound/notfound.page';
import {Routes,Route} from 'react-router-dom';
function App() {
  const [Count, setCount] = useState(0);

  return (
    <div className="App">

     <Navbar />
     
     <Routes>
      <Route path='/' element={<Interactive/>}></Route>
      <Route path='interactive' element={<Interactive/>}></Route>
      <Route path='batch' element={<Batch/>}></Route>
      <Route path='results' element={<Results/>}></Route>
      <Route path='*' element={<NotFound/>}></Route>
     </Routes>

    </div>
  );
}

export default App;
