import { BrowserRouter, Route, Routes } from "react-router";
import Button from "@/components/ui/Button";

import "./App.css";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Button />}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
