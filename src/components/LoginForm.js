import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import * as Yup from "yup";
const emptyData = {
  avatar: "",
  email: "",
  first_name: "",
  id: "",
  last_name: "",
  terms_of_use: false,
};

const LoginForm = ({ addNewUser }) => {
  const [userInfo, setUserInfo] = useState(emptyData);

  const [formError, setFormError] = useState(emptyData);

  const [formValid, setFormValid] = useState(true);

  const formSchema = Yup.object().shape({
    first_name: Yup.string()
      .required("Can not be empty")
      .min(3, "Can not be less then 3 characters")
      .max(20, "Can not be more then 20 characters")
      .required("Required!"),
    last_name: Yup.string()
      .required("Can not be empty")
      .min(3, "Can not be less then 3 characters")
      .max(20, "Can not be more then 20 characters")
      .required("Required!"),
    email: Yup.string().email("Invalid email!").required("Can not be empty"),
    avatar: Yup.string().url("Invalid url").required("Can not be empty"),
    terms_of_use: Yup.boolean().oneOf([true], "Required!"),
  });

  const onChangeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setUserInfo({ ...userInfo, [name]: type != "checkbox" ? value : checked });

    console.log("checked:", checked);

    Yup.reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        console.log("valid", valid);
        if (name == "terms_of_use") {
          setFormError({ ...formError, [name]: false });
        } else {
          setFormError({ ...formError, [name]: "" });
        }
      })
      .catch((error) => {
        console.log("error", error);
        setFormError({ ...formError, [name]: error.errors[0] });
      });
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("submit handler", userInfo);

    // const eror_arr = Object.values(formError).map((value) =>
    //   console.log("map ", value)
    // );

    axios
      .post("https://reqres.in/api/users", userInfo)
      .then(function (response) {
        console.log("post request is succesful", response.data);
        addNewUser(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    console.log("user info", userInfo);
  }, [userInfo]);

  useEffect(() => {
    formSchema.isValid(userInfo).then((valid) => {
      console.log("valid", valid);
      setFormValid(valid);
    });
  }, [userInfo]);

  useEffect(() => {
    console.log("form error: ", formError);
  }, [formError]);
  return (
    <Form onSubmit={onSubmitHandler}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Name</Form.Label>
          <Form.Control
            className="form_name_area"
            type="text"
            placeholder="Name"
            onChange={onChangeHandler}
            name="first_name"
            isInvalid={!!formError["first_name"]}
          />
          <Form.Control.Feedback
            className="form_name_area_validty"
            type="invalid"
          >
            {formError["first_name"]}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Surname</Form.Label>
          <Form.Control
            className="form_surname_area"
            type="text"
            placeholder="Surname"
            onChange={onChangeHandler}
            name="last_name"
            isInvalid={!!formError["last_name"]}
          />
          <Form.Control.Feedback
            className="form_surname_area_validty"
            type="invalid"
          >
            {formError["last_name"]}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            className="form_email_input"
            type="email"
            placeholder="Enter email"
            onChange={onChangeHandler}
            name="email"
            isInvalid={!!formError.email}
          />
          <Form.Control.Feedback className="form_email_validty" type="invalid">
            {formError.email}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Profile Picture</Form.Label>
          <Form.Control
            type="url"
            placeholder="Enter a valid url"
            onChange={onChangeHandler}
            name="avatar"
            isInvalid={!!formError.avatar}
          />
          <Form.Control.Feedback type="invalid">
            {formError.avatar}
          </Form.Control.Feedback>
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" id="formGridCheckbox">
        <Form.Check
          name="terms_of_use"
          type="checkbox"
          label="Terms of Servives"
          onChange={onChangeHandler}
        />
      </Form.Group>

      <Button className="submitButton" variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
};

export default LoginForm;
