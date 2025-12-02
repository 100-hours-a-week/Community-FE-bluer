import { BrowserRouter, Route, Routes } from "react-router";
import Button from "@/components/ui/Button";

function App() {
  return (
    <>
      <div className="app">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Button>123</Button>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
