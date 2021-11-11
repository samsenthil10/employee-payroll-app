import PayrollForm from './components/payroll-form/PayrollForm'
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
        <Route path="/" element={<PayrollForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
