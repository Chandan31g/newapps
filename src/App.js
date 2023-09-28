import "./App.css";
import NavBar from "./component/NavBar";
import News from "./component/News";

function App() {
  return (
    <>
      <NavBar />
      <News pageSize={5} />
    </>
  );
}

export default App;
