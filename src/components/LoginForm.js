import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";

const LoginForm = ({ fetchData }) => {
  const [userInfo, setUserInfo] = useState({
    avatar: "",
    email: "",
    first_name: "",
    id: "",
    last_name: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit handler", userInfo);

    axios
      .post("https://reqres.in/api/users", userInfo)
      .then(function (response) {
        console.log("post request is succesful", response);
        fetchData();
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log(userInfo);
  }, [userInfo]);

  return (
    <Form onSubmit={onSubmitHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            onChange={onChangeHandler}
            name="first_name"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Surname"
            onChange={onChangeHandler}
            name="last_name"
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            name="email"
          />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter a valid url"
            onChange={onChangeHandler}
            name="avatar"
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check type="checkbox" label="Terms of Servives" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default LoginForm;
