import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Input, InputGroup, InputGroupAddon, InputGroupText, Row } from 'reactstrap';
import {gq, login} from '../../../graphql/queries';

class Login extends Component {

  constructor(props) {
    super(props);

    this.state = {
        username: '',
        password: '',
        error: ''
    };
  }

  onSignIn(e) {
      e.preventDefault()

      gq.client().request(login.query(), login.variables(this.state.username, this.state.password))
          .then(
              data => {
                if (data.login) {
                    gq.token =  data.login;
                    this.props.history.push('/');
                } else {
                    this.setState({error: 'Login bilgileri geçersiz!'});
                }
              },
          )
          .catch(err => {
              this.setState({error: err.response.errors[0].message});
          });
  }

  handleChange(e) {
      const { name, value } = e.target;
      this.setState({ [name]: value });
  }

  render() {
    return (
      <div className="app flex-row align-items-center">
        <Container>
          <Row className="justify-content-center">
            <Col md="8">
              <CardGroup>
                <Card className="p-4">
                  <CardBody>
                    <Form>
                      <h1>Login</h1>
                      <p className="text-muted">Sign In to your account</p>
                      <InputGroup className="mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-user"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="text" placeholder="Username" autoComplete="username" name="username"
                               value={this.state.username} onChange={e => this.handleChange(e)}/>
                      </InputGroup>
                      <InputGroup className="mb-4">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="icon-lock"></i>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input type="password" placeholder="Password" autoComplete="current-password" name="password"
                               value={this.state.password} onChange={e => this.handleChange(e)}/>
                      </InputGroup>
                      <Row>
                        <Col xs="6">
                          <Button color="primary" className="px-4"
                                  onClick={e => this.onSignIn(e)}>Login</Button>
                        </Col>
                        <Col xs="6" className="text-right">
                          <Button color="link" className="px-0">Forgot password?</Button>
                        </Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
                <Card className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                  <CardBody className="text-center">
                    <div>
                      <h2>Sign up</h2>
                      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                        labore et dolore magna aliqua.</p>
                      <Link to="/register">
                        <Button color="primary" className="mt-3" active tabIndex={-1}>Register Now!</Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </CardGroup>
            </Col>
          </Row>
            <Row className="justify-content-center">
                {this.state.error}
            </Row>
        </Container>
      </div>
    );
  }
}

export default Login;
