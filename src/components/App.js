import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Header from "./Header";
import Form from "./Form";
import List from "./List";
import { ListContext } from "./ListContext.js";
import { useState } from "react";
import Footer from "./Footer";

export default function App() {
  const [list, setList] = useState([]);
  const [done, setDone] = useState(0);

  return (
    <div className=" App d-flex flex-column">
      <Header />
      <ListContext.Provider value={[list, setList, done, setDone]}>
        <Form />
        <List />
        <Footer />
      </ListContext.Provider>

    </div>
  );
}
