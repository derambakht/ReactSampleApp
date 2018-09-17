import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'

class Login extends Component {
    constructor() {
        super();
        this.state = {authenticate : false, userName:'', password:''};
        this.login = this.login.bind(this);
        this.changeValue = this.changeValue.bind(this);
    }
    changeValue(e){
        this.setState({
            [e.target.name] : e.target.value
        });
    }
    login() {
        // let userName = this.refs.userName.value;
        // let password = this.refs.password.value;
        let url = 'http://localhost:4373/api/token';
        fetch(url + '?userName=' + this.state.userName + '&password=' + this.state.password)
            .then(response => response.json())
            .then(data => {
                this.setState({authenticate : true});
                window.localStorage.setItem('token', data);
                //this.props.history.push("/products");
            });
    }
    render() {
        if(this.state.authenticate)
        {
            return <Redirect to='/products' />
        }
        return (
            <div className='login-form'>
            <style>{`
              body > div,
              body > div > div,
              body > div > div > div.login-form {
                height: 100%;
              }
            `}</style>
            <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
              <Grid.Column style={{ maxWidth: 450 }}>
                <Header as='h2' color='teal' textAlign='center'>
                  <Image src='/logo.png' /> Log-in to your account
                </Header>
                <Form size='large'>
                  <Segment stacked>
                    <Form.Input name="userName" onChange={this.changeValue}  fluid icon='user' iconPosition='left' placeholder='user name' />
                    <Form.Input
                     name="password"
                      onChange={this.changeValue}
                      fluid
                      icon='lock'
                      iconPosition='left'
                      placeholder='Password'
                      type='password'
                    />
        
                    <Button onClick={this.login} color='teal' fluid size='large'>
                      Login
                    </Button>
                  </Segment>
                </Form>
                <Message>
                  New to us? <a href='#'>Sign Up</a>
                </Message>
              </Grid.Column>
            </Grid>
          </div>
        );
    }
}

export default Login;