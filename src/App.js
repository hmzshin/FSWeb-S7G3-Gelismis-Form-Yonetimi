import "./App.css";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);

  const fetchData = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log("fetched data", response.data);
        setUser(response.data.data);
      })
      .catch((error) => {
        alert("Can not reach server", error);
      })
      .finally(() => {
        console.log("fetch request is completed");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <LoginForm fetchData={fetchData} />
    </div>
  );
}

export default App;
