import "./App.css";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log("fetched data", response.data.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        alert("Can not reach server", error);
      })
      .finally(() => {
        console.log("fetch request is completed");
      });
  }, []);

  return (
    <div className="App">
      <LoginForm />
    </div>
  );
}

export default App;
