import React, { Component } from 'react';
import { View, Text } from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner} from './components/common';
import LoginForm from './components/LoginForm';



firebase.initializeApp({
  apiKey: "AIzaSyD4-gEc1yRx4I-SPmqKuB9HCyDgfOLuDoU",
  authDomain: "authentication-8846b.firebaseapp.com",
  databaseURL: "https://authentication-8846b.firebaseio.com",
  projectId: "authentication-8846b",
  storageBucket: "authentication-8846b.appspot.com",
  messagingSenderId: "532711462386"
});

class App extends Component {
  state = { loggedIn: null };

  componentWillMount() {

  firebase.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({ loggedIn: true});
      } else {
        this.setState({ loggedIn: false});
      }
    });
}

renderContent() {
  switch (this.state.loggedIn) {
    case true:
    return(
    <CardSection>
      <Button onPress={() => firebase.auth().signOut()}>Log Out</Button>
    </CardSection>
  )

    case false:
      return <LoginForm />;

    default:
    return <View style={{ marginTop: 150 }}><Spinner size='large' /></View>
  }
}

  render() {
    return (
      <View>
        <Header headerText="Authentication" />
        {this.renderContent()}
      </View>
    );
  }
}

export default App;
