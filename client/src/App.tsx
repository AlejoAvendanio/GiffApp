import { Route , Routes,BrowserRouter} from 'react-router-dom';
import './App.css';
import { Header } from './components/header';
import { Chat } from './components/pages/chat';
import { Details } from './components/pages/details';
import { FavoritePage } from './components/pages/favorite';
import { Home } from './components/pages/home';
import { LoginPage } from './components/pages/login';
import { RegisterPage } from './components/pages/register/inex';
import SearchResults from './components/pages/searchResults';


function App() {
  return(
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/detail/:id' element={<Details/>}/>
            <Route path='/search/:input/:rating' element={<SearchResults/>}/>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path='/chat' element={<Chat/>}/>
            <Route path='/favs' element={<FavoritePage/>}/>
          </Routes>
        </BrowserRouter>
      </div>
  )
}

export default App;
