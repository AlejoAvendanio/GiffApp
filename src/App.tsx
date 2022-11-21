import { Route , Routes,BrowserRouter} from 'react-router-dom';
import './App.css';
import { Details } from './components/pages/details';
import { Home } from './components/home';
import SearchResults from './components/pages/searchResults';


function App() {
  return(
    <div className='App'>
    <BrowserRouter>
      <Routes>
        <Route path='/detail/:id' element={<Details/>}/>
        <Route path='/search/:input' element={<SearchResults/>}/>
        <Route path="/" element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App;
