import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import CountryDetails from './pages/CountryDetails.jsx'
import Header from "./components/Header";



function App() {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-[#202c37]">        
            <Header />
            <div className="flex-grow">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/details" element={<CountryDetails />} />
                </Routes>
            </div>

        </div>
    )
}

export default App;
