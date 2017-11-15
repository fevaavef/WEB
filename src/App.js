import React, { Component } from "react";
import { Segment, Form, Input, Button, Header } from "semantic-ui-react";
import FieldError from './components/fieldError'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: "",
      email: "",
      phone: "",
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d]{8,16}$/
  emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/
  phoneRegex = /^((8|(\+7))(\d){10,10})$|^((8|(\+7))[-(](\d){3,3}[-)](\d){3,3}[-](\d){2,2}[-](\d){2,2})$/

  handleChange = function(event) {
    event.preventDefault()
    event.persist()
    this.setState( { [event.target.name]: event.target.value },
      function(){
        if (event.target.name === "username") {
          const error = this.validateName(this.state.username)
          this.setState({
            errors: { ...this.state.errors, username: error }
          })
        }
        if (event.target.name === "password") {
          const error = this.validatePassword(this.state.password)
          this.setState({
            errors: { ...this.state.errors, password: error }
          })
        }
        if (event.target.name === "phone") {
          const error = this.validatePhone(this.state.phone)
          this.setState({
            errors: { ...this.state.errors, phone: error }
          })
        }
        if (event.target.name === "email") {
          const error = this.validateEmail(this.state.email)
          this.setState({
            errors: { ...this.state.errors, email: error }
          })
        }
      },
      function() {}
    )
  }

  handleSubmit = function(event) {
    event.preventDefault()
    const payload = {
      username: this.state.username,
      password: this.state.password,
      phone: this.state.phone,
      email: this.state.email
    }
    //const errors = this.finalValidate(payload)
    //this.setState({ errors })
  }

  validateName = function(username) {
    let error = ""
    if (username.length === 0) {
      error = "Это поле не может быть пустым."
    }
    return error
  }
  validatePassword = function(password) {
    let error = ""
    if (!this.passwordRegex.test(password)) {
      if (!/^[a-zA-Z\d]+$/.test(password)) {
        error = "Вы ввели недопустимый символ."
      }
      if (password.length < 8 || password.length > 16) {
        error = "Пароль должен включать в себя от 8 до 16 символов."
      }
      if (password.length === 0) {
        error = "Это поле не может быть пустым."
      }
      if (/^[a-z\d]+$/.test(password)) {
        error = "Пароль должен включать в себя хотя бы одну заглавную букву."
      }
      if (/^[A-Z\d]+$/.test(password)) {
        error = "Пароль должен включать в себя хотя бы одну строчную букву."
      }
    }
    return error
  }

  validateEmail = function(email) {
    let error = ""
    if (!this.emailRegex.test(email)) {
      error = "Указан некорректный E-mail."
    }
    return error
  }

  validatePhone = function(phone) {
    let error = ""
    if (!this.phoneRegex.test(phone)) {
      error = "Указан некорректный номер телефона."
    }
    return error
  }

  /*finalValidate = function(data) {
    const errors = {}
    errors.username = this.validateName(data.username)
    errors.password = this.validatePassword(data.password)
    errors.email = this.validateEmail(data.email)
    errors.phone = this.validatePhone(data.phone)
    return errors
  }*/
  render() {
    const {errors} = this.state
    return (
      <div className="container">
        <div className="row">
          <Segment className="large" stacked>
            <Header as="h2" className="blue">Регистрация</Header>
            <Form onSubmit={this.handleSubmit}>
              <Form.Field error={!!errors.username}>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Имя пользователя"
                  className="large"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                {errors.username && <FieldError errText={ errors.username }/>}
              </Form.Field>
      
              <Form.Field error={!!errors.password}>
                <Input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  className="large"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                {errors.password && <FieldError errText={ errors.password }/>}
              </Form.Field>
      
              <Form.Field error={!!errors.phone}>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="Телефон"
                  className="large"
                  value={this.state.phone}
                  onChange={this.handleChange}
                />
                {errors.phone && <FieldError errText={ errors.phone }/>}
              </Form.Field>
      
              <Form.Field error={!!errors.email}>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="large"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                {errors.email && <FieldError errText={ errors.email }/>}
              </Form.Field>
              <Button
                disabled={
                !(
                  errors.username === "" &&
                  errors.password === "" &&
                  errors.email === "" &&
                  errors.phone === ""
                )}
                fluid
                className="large"
                color='vk'
              >
                Зарегистрироваться
              </Button>
            </Form>
          </Segment>
        </div>
      </div>
    )
  }
}

export default App
