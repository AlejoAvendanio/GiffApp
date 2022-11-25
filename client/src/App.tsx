import { Route , Routes,BrowserRouter} from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Details } from './components/pages/details';
import { Home } from './components/pages/home';
import { Login } from './components/pages/login';
import SearchResults from './components/pages/searchResults';


function App() {
  return(
      <div className='App'>
        <BrowserRouter>
            <Header/>
          <Routes>
            <Route path='/detail/:id' element={<Details/>}/>
            <Route path='/search/:input/:rating' element={<SearchResults/>}/>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<Login/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
