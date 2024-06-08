import Home from "./components/Home";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-3">
        <Navbar />
        <Home />
      </div>
    </>
  );
}

export default App;
