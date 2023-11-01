import "./App.css";
import LoginForm from "./components/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";
import PersonCard from "./components/PersonCard";

function App() {
  const [users, setUsers] = useState(null);

  const fetchData = () => {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log("fetched data", response.data.data);
        setUsers(response.data.data);
      })
      .catch((error) => {
        alert("Can not reach server", error);
      })
      .finally(() => {
        console.log("fetch request is completed");
      });
  };
  const addNewUser = (user) => {
    setUsers([user, ...users]);
  };
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("users =>", users);
  }, [users]);

  return users ? (
    <div className="App">
      <LoginForm addNewUser={addNewUser} />
      <div className="users">
        {users.map((user, index) => (
          <PersonCard key={index} user={user} />
        ))}
      </div>
    </div>
  ) : (
    <div>loading data....</div>
  );
}

export default App;
