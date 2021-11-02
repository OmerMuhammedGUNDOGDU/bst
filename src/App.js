import "./App.css";

import  Home  from './Home/Home';
import  DataItem  from "./Data Item/DataItem";

// import GainItem from "./Gain Item/GainItem";
// import  Gain  from "./Gain/Gain";

// import  Loss  from "./Loss/Loss";
// import  LossItem  from "./Loss Item/LossItem";

// import  Debt  from "./Debt/Debt";
// import  DebtItem  from "./Debt Item/DebtItem";

// import  Asset  from "./Asset/Asset";
// import  AssetItem  from "./Asset Item/AssetItem";

import  Navigation  from "./Navigation";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="container">

<Router>
      <div>
      <Navigation />
        <hr />
        <Route exact path="/" component={Home} />
        <Route path="/Data Item" component={DataItem} />
      </div>
    </Router>
    </div>
  );
}
export default App;
