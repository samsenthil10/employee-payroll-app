import PayrollForm from './components/payroll-form/PayrollForm'
import HomePage from './components/home-page/HomePage';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom"


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/payroll-form" element={<PayrollForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
