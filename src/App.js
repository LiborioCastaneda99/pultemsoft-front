import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Registro from './components/Registro';


function App() {
  return (
    <div >
  <Router>
    <Switch>
      <Route exact path="/"><Home/></Route>
      <Route exact path="/register"><Registro/></Route>
    </Switch>
</Router>
</div>
  );
}
export default App;
