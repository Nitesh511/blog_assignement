import { BrowserRouter } from "react-router";
import "./App.css";
import AppRoute from "./components/routes/Route";

function App() {
  return (
    <>
      <BrowserRouter>
        <AppRoute />
      </BrowserRouter>
    </>
  );
}

export default App;
