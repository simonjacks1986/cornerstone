import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Modal, TouchableHighlight, SafeAreaView, Alert } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Root, Container } from "native-base";
import FormVoid from './components/FormVoid';
import CsLogo from './components/Parts/CsLogo';
import CsMenuToggle from './components/Parts/CsMenuToggle';
import { Font, AppLoading } from "expo";
import FormModalHeaderMenu from './components/Modal/FormModalHeaderMenu';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class VoidApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      menuVisible: false,
      propertyId: "PROP" + [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('').toUpperCase(),
      isUploading: false,
      validating: false,
      menuVisible: this.props.menuVisible,
      loadScreen: false,
      user: {
        id: this.props.values.user.id
      }
    };
  }

  setMenuVisible = (visible) => {
      this.setState({menuVisible: visible});
  }

  async saveUserStorage(userData){
    if (userData) {
      await AsyncStorage.setItem('user', JSON.stringify({
          isLoggedIn: true,
          authToken: userData.auth_token,
          id: userData.user_id,
          name: userData.user_login
        })
      );
      return true;
    }
    return false;
  }

  // Saving state functions
  confirmRemoveSessionStorage = (sessionKey) => {
    Alert.alert(
      'Are you sure you want to delete this saved session?', '', [ 
        { text: 'Yes', onPress: () => this.removeSessionStorage(sessionKey)},
        { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
      ],{cancelable: false},
    );
  }

  removeSessionStorage = async (sessionKey) => {
    newArrayOfSessions = [];
    await AsyncStorage.removeItem(sessionKey);
    const listOfSessions = await AsyncStorage.getItem('savedVoidSessions');
    arrayOfSessions = JSON.parse(listOfSessions);
    arrayOfSessions.map((item, key) => 
      (sessionKey !== item) && newArrayOfSessions.push(item)
    );
    await AsyncStorage.setItem('savedVoidSessions', JSON.stringify(newArrayOfSessions));
    this.setState({savedVoidSessions: newArrayOfSessions});
  }

  saveSessionStorage = async () => {
    const dataToSave = JSON.stringify(this.state);
    await AsyncStorage.setItem(this.state.propertyId, dataToSave);
    arrayOfSessions = [];
    const listOfSessions = await AsyncStorage.getItem('savedVoidSessions');
    if (listOfSessions !== null) {
      arrayOfSessions = JSON.parse(listOfSessions);
      if (arrayOfSessions.indexOf(this.state.propertyId) == -1) {
        arrayOfSessions.push(this.state.propertyId);
        const arrayToAdd = JSON.stringify(arrayOfSessions);
        await AsyncStorage.setItem('savedVoidSessions', arrayToAdd);
      }
    } else {
      arrayOfSessions = [this.state.propertyId];
      await AsyncStorage.setItem('savedVoidSessions', JSON.stringify(arrayOfSessions));  
    }
    this.setState({menuVisible: false});
    Alert.alert(
      'Form saved'
    );
  }

  loadSessionStorage = async (sessionKey) => {
    const stateKeys = Object.keys(this.state);
    for (const key of stateKeys) {
      this.setState({[key]: undefined});
    }
    const initialState = {loading: true, menuVisible: false, isUploading: false, validating: false, menuVisible: false, loadScreen: false,}
    this.setState(initialState);
    this.setState({ loading: false });
    const retrievedState = await AsyncStorage.getItem(sessionKey);
    this.setState(JSON.parse(retrievedState));
    this.setState({menuVisible: false});
    this.setState({loadScreen: false});
    Alert.alert(
      'Form loaded'
    );
  }

  switchLoadPage = async () => {
    const listOfSessions = await AsyncStorage.getItem('savedVoidSessions');
    if (listOfSessions !== null) {
      let arrayOfSessions = JSON.parse(listOfSessions);
      this.setState({savedVoidSessions: arrayOfSessions});
    } else {
      this.setState({savedVoidSessions: []});
    }
    this.setState({loadScreen: !this.state.loadScreen});
    this.setState({menuVisible: false});
  }

  handleChange = (text) => (event) => {
      this.setState({[text]: event.nativeEvent.text });
  }
  handlePicker = (name) => (event) => {
    this.setState({[name]: event});
  }
  handleChoice = (name, value) => {
    this.setState({[name]: value});
  }
  handleSignature = ({base64DataUrl}) => {
    this.setState({signature: base64DataUrl});
  }
  handleImage = (name, value) => {
    this.setState({
      photos: {
          ...this.state.photos,
          [name]: value
        }
    });
  }

  removeImage = (name) => {
    let newImageObject = {photos:{}};
    for (let [key, value] of Object.entries(this.state.photos)) {
      if(key !== name) newImageObject.photos[key] = value;
    }
    this.setState(newImageObject);
  }

 
  render() {
    const values = this.state;
    const loadItems = this.state.savedVoidSessions;
    const { switchStep, logOutUser } = this.props;

    if (this.state.loadScreen) {
      return (
        <View style={styles.container}>
          <FormModalHeaderMenu 
            isOpen={this.state.menuVisible}
            logOut={logOutUser}
            saveSession={this.saveSessionStorage}
            loadSession={this.switchLoadPage}
            setMenuVisible={this.setMenuVisible}
          />
          <Header style={styles.header}>
            <Left style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {switchStep(1)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='home'
                />
              </Button>
            </Left>
            <Body>
              <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
            </Body>
            <Right style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {this.setMenuVisible(true)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='menu'
                />
              </Button>
            </Right>
          </Header>
          <ScrollView>
            <View style={styles.loadList}>
              { loadItems.map((item, key)=>(
                <View key={key} style={styles.loadListItem}>
                  <Icon 
                    style={styles.loadMenuIcon}
                    name='upload'
                    type='FontAwesome5'
                  />
                  <Text style={styles.loadListItemText} onPress={()=>{this.loadSessionStorage(item)}}> { item.toUpperCase() } </Text>
                  <Text style={styles.loadListDeleteText} onPress={()=>{this.confirmRemoveSessionStorage(item)}}>Delete</Text>
                </View>
                )
              )}
            </View>
          </ScrollView>
          <View style={styles.backButtonContainer}>
            <Text style={styles.backButton} onPress={()=>{this.switchLoadPage()}}>Close</Text>
          </View>  
        </View>
      )
    }

    return (
      <Container style={styles.container}>
        <FormModalHeaderMenu 
          isOpen={this.state.menuVisible}
          logOut={logOutUser}
          saveSession={this.saveSessionStorage}
          loadSession={this.switchLoadPage}
          setMenuVisible={this.setMenuVisible}
        />
        
        <Header style={styles.header}>
          <Left style={styles.headerRight}>
              <Button style={styles.headerMenu}
                onPress={() => {switchStep(1)}}
              >
                <Icon 
                  style={styles.headerMenuIcon}
                  name='home'
                />
              </Button>
            </Left>
          <Body>
            <Image style={styles.logo} source={require('./assets/cmm-logo.png')} />
          </Body>
          <Right style={styles.headerRight}>
            <Button style={styles.headerMenu}
              onPress={() => {this.setMenuVisible(true)}}
            >
              <Icon 
                style={styles.headerMenuIcon}
                name='menu'
              />
            </Button>
          </Right>
        </Header>

        
        <FormVoid 
          key={this.state.loggedOut} 
          values={values}
          validate={this.validate}
          removeImage={this.removeImage}
          handleImage={this.handleImage}
          handleChange={this.handleChange}
          handlePicker={this.handlePicker}
          handleChoice={this.handleChoice}
          handleSignature={this.handleSignature}
          handleFormSubmit={this.handleFormSubmit}
        />
        
      </Container>
    );
  }

  handleFormSubmit = async (image_uri) => {
    let formDataComplete = this.state;
    this.setState({isUploading: true});
    let base_url = 'https://dashboard.propertymot.uk/void-submit/';
    let formData = new FormData();
    formData.append('type', 'formContent');
    formData.append('data', JSON.stringify(formDataComplete));
    fetch(base_url, {
      method: 'POST',
      body: formData,
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', }),
    })
    .then((response) => {
      response.text();
      console.log(response);
    })
    .then((responseText) => {
      console.log(responseText);
      this.setState({isUploading: false});
    }).catch((error) => {});
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FC',
  },
  header: {
    height:80,
    padding:0,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  headerMenu: {
    borderRadius:0,
    backgroundColor:'#002163',
    height:60,
  },
  headerRight: {
    alignSelf: 'flex-end',
  },
  headerMenuIcon: {
    color:'white',
  },
  loadList: {
    margin:30,
  },
  loadListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom:20,
    marginBottom:20,
    marginLeft:10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    borderStyle: "solid",
  },
  loadListItemText: {
    marginLeft:20,
    fontSize:18,
    flex:1,
  },
  loadListDeleteText: {
    color:'#FC0000',
  },
  loadMenuIcon: {
    color:'#002163',
    fontSize:20,
  },
  logo: {
    width:122,
    height:36,
  },
  menuModalContainer: {
    alignItems:'flex-end',
    justifyContent: 'flex-start',
    height:'100%',
    backgroundColor:'transparent'
  },
  menuModal: {
    backgroundColor: '#002163',
    width:240,
    height:240,
    padding:15,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginRight:10,
    marginTop:-1,
  },
  menuItems: {
    padding:10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  menuItemText: {
    color: '#FFFFFF',
    fontSize:20,
  },
  menuItemIcon: {
    color: '#FFFFFF',
    fontSize:16,
    marginRight:20,
  },
  closeButton: {
    height:30,
    width:30,
    alignItems:'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'flex-end',
    lineHeight: 1,
    padding:0,
    marginRight:2,
  },
  closeButtonIcon: {
    fontSize: 30,
    color:'white',
    marginTop: -1,
  },
  backButtonContainer:{
    padding:10,
    justifyContent: 'center',
  },
  backButton: {
    justifyContent: 'center',
    textAlign: 'center',
    fontSize: 18,
  },
});