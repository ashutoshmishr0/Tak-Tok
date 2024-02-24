import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';
// import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import Chatpage from './Pages/Chatpage';
import Homepage from './Pages/Homepage';





function App() {
  return (
     <BrowserRouter>
    <div className='App'>
      
              
      <Route path='/' component={Homepage} exact/>
       <Route
            className="ChatPageWrapper"
            path="/chats"
            component={Chatpage}
          />
        
    </div>
    </BrowserRouter>
  
  );
}

export default App;
