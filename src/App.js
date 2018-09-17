import React, { Component } from 'react';
import { BrowserRouter, Link, Redirect } from 'react-router-dom';
import Routes from './Routes';
import Login from './Login';
import logo from './logo.svg';
import './App.css';
import {
  Container,
  Divider,
  Dropdown,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Modal,
  Button
} from 'semantic-ui-react'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isAuthenticate: false };
  }
  componentWillMount() {
    if (window.localStorage.getItem('token')) {
      this.setState({ isAuthenticate: true });
    } else {
      this.setState({ isAuthenticate: false });
    }
  }

  render() {
    return (
      // Check for Git Commits
      <BrowserRouter>
        <div>
          <Menu fixed='top' inverted>
            <Container>
              <Menu.Item as='a' header>
                <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
                Project Name
        </Menu.Item>
              <Menu.Item as='a'>
                <Link to='/'>Home</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Link to='/notes'>My Notes</Link>
              </Menu.Item>
              <Menu.Item as='a'>
                <Link to='/products'>Products</Link>
              </Menu.Item>
              <Menu.Item as='a'>
              <Modal trigger={<Button>Login</Button>}>
              <Modal.Header>Login Form</Modal.Header>
              <Modal.Content image>
                  <Login />
              </Modal.Content>
            </Modal>
              </Menu.Item>
            </Container>
          </Menu>

          <Container text style={{ marginTop: '7em' }}>
           
            <Routes />
          </Container>

          <Segment inverted vertical style={{ margin: '5em 0em 0em', padding: '5em 0em' }}>
            <Container textAlign='center'>
              <Grid divided inverted stackable>
                <Grid.Row>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 1' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 2' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Group 3' />
                    <List link inverted>
                      <List.Item as='a'>Link One</List.Item>
                      <List.Item as='a'>Link Two</List.Item>
                      <List.Item as='a'>Link Three</List.Item>
                      <List.Item as='a'>Link Four</List.Item>
                    </List>
                  </Grid.Column>
                  <Grid.Column width={3}>
                    <Header inverted as='h4' content='Footer Header' />
                    <p>
                      Extra space for a call to action inside the footer that could help re-engage users.
              </p>
                  </Grid.Column>
                </Grid.Row>
              </Grid>

              <Divider inverted section />
              <Image centered size='mini' src='/logo.png' />
              <List horizontal inverted divided link>
                <List.Item as='a' href='#'>
                  Site Map
          </List.Item>
                <List.Item as='a' href='#'>
                  Contact Us
          </List.Item>
                <List.Item as='a' href='#'>
                  Terms and Conditions
          </List.Item>
                <List.Item as='a' href='#'>
                  Privacy Policy
          </List.Item>
              </List>
            </Container>
          </Segment>
        </div>


      </BrowserRouter>
    );
  }
}

export default App;
