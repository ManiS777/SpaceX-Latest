import logo from './logo.svg';
import './App.css';
import MainPage from "../src/components/MainPage"
import SideBar from "../src/components/Sidebar"
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App-parent">
      <div style={{fontWeight:'bold', fontSize:18 }}>
      <p>SpaceX Launch Program</p>
      </div>
      
      
      <div className="main-page-parent">
      <MainPage/>
      
      </div>
    </div>
  );
}

export default App;
