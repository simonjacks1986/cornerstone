import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Modal, TouchableHighlight, SafeAreaView, AsyncStorage, Alert } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Root } from "native-base";
import UserForm from './components/UserForm';
import CsLogo from './components/CsLogo';
import CsMenuToggle from './components/CsMenuToggle';
import { Font, AppLoading } from "expo";
import FormModalHeaderMenu from './components/FormScreens/Modal/FormModalHeaderMenu';


const propertyId = "PROP" + [...Array(10)].map(i=>(~~(Math.random()*36)).toString(36)).join('');
const initialState = {
  loading: true,
  menuVisible: false,
  loggedOut: 0,
  propertyId: propertyId.toUpperCase(),
  isUploading: false,
  validating: false,
  photos: {},
  suAmountOfSections: 2,
  moAmountOfSections: 1,
  simAmountOfSections: 2,
  venAmountOfSections: 1,
  intAmountOfSections: 1,
  atsAmountOfSections: 1,
  obsgAmountOfSections: 2,
  obstAmountOfSections: 2,
  menuVisible: false,
  loadScreen: false,
  user: {
    isLoggedIn: false,
    authToken: null,
    id: null,
    name: null
  },
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  setMenuVisible = (visible) => {
      this.setState({menuVisible: visible});
  }

  logOutUser = async () => {
    await AsyncStorage.setItem('user', JSON.stringify(
      {
        isLoggedIn: false,
        authToken: null,
        id: null,
        name: null,
      })
    );
    this.setState({loggedOut: 1});
    this.setState({user:{isLoggedIn: false}});
    this.setState({menuVisible: false});
    return true;
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
    });
    this.setState({ loading: false });
  }

  componentDidMount = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        let userInfo = JSON.parse(value)
        this.setState({
          user: {
            isLoggedIn: userInfo.isLoggedIn,
            authToken: userInfo.authToken,
            id: userInfo.id,
            name: userInfo.name
          }
        })
      }
    } catch (error) { /* Do nowt and go to login screen */ }

    try {
      const listOfSessions = await AsyncStorage.getItem('savedSessions');
      if (listOfSessions !== null) {
        let arrayOfSessions = JSON.parse(listOfSessions);
        this.setState({savedSessions: arrayOfSessions});
      }
    } catch (error) { console.log('No saved sessions'); }
  }

  validate = () => {
    this.setState({ validating: true });
    let formData = new FormData();
    formData.append('type', 'login');
    formData.append('login', this.state.username);
    formData.append('password', this.state.password);
    return fetch('http://digital-dev.co.uk/cornerstone/client-login/', {
      method: 'POST',
      body: formData, 
    })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      let returnData = response.data;
      if(response.status) {
        if (this.saveUserStorage(returnData)){
          this.setState({
            validating: false,
            user: { isLoggedIn: true }
          });
        } else { 
          console.log('Failed to store auth'); 
          this.setState({ validating: false });
        }
      } else { 
        Alert.alert('Incorrect details');
        this.setState({ validating: false });
      } 
    }).catch((error) => { console.error(error); });
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
    const listOfSessions = await AsyncStorage.getItem('savedSessions');
    arrayOfSessions = JSON.parse(listOfSessions);
    arrayOfSessions.map((item, key) => 
      (sessionKey !== item) && newArrayOfSessions.push(item)
    );
    await AsyncStorage.setItem('savedSessions', JSON.stringify(newArrayOfSessions));
    this.setState({savedSessions: newArrayOfSessions});
  }

  saveSessionStorage = async () => {
    const dataToSave = JSON.stringify(this.state);
    await AsyncStorage.setItem(this.state.propertyId, dataToSave);
    arrayOfSessions = [];
    const listOfSessions = await AsyncStorage.getItem('savedSessions');
    if (listOfSessions !== null) {
      arrayOfSessions = JSON.parse(listOfSessions);
      if (arrayOfSessions.indexOf(this.state.propertyId) == -1) {
        arrayOfSessions.push(this.state.propertyId);
        const arrayToAdd = JSON.stringify(arrayOfSessions);
        await AsyncStorage.setItem('savedSessions', arrayToAdd);
      }
    } else {
      arrayOfSessions = [this.state.propertyId];
      await AsyncStorage.setItem('savedSessions', JSON.stringify(arrayOfSessions));  
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
    const listOfSessions = await AsyncStorage.getItem('savedSessions');
    if (listOfSessions !== null) {
      let arrayOfSessions = JSON.parse(listOfSessions);
      this.setState({savedSessions: arrayOfSessions});
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



 
  render() {
    const values = this.state;
    const loadItems = this.state.savedSessions;

    if (this.state.loading) {
      return <AppLoading />;
    }

    if (this.state.loadScreen) {
      return (
        <View style={styles.container}>
          <FormModalHeaderMenu 
            isOpen={this.state.menuVisible}
            logOut={this.logOutUser}
            saveSession={this.saveSessionStorage}
            loadSession={this.switchLoadPage}
            setMenuVisible={this.setMenuVisible}
          />
          <Header style={styles.header}>
            <Left />
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
      <View style={styles.container}>
        <FormModalHeaderMenu 
          isOpen={this.state.menuVisible}
          logOut={this.logOutUser}
          saveSession={this.saveSessionStorage}
          loadSession={this.switchLoadPage}
          setMenuVisible={this.setMenuVisible}
        />
        
        <Header style={styles.header}>
          <Left />
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
          <UserForm 
            key={this.state.loggedOut} 
            values={values}
            validate={this.validate}
            isLoggedIn={this.state.user.isLoggedIn}
            handleImage={this.handleImage}
            handleChange={this.handleChange}
            handlePicker={this.handlePicker}
            handleChoice={this.handleChoice}
            handleSignature={this.handleSignature}
            handleFormSubmit={this.handleFormSubmit}
          />
        </ScrollView>
      </View>
    );
  }




  handleImageSubmit = async (post_id, base_url) => {
    const phots = Object.entries(this.state.photos)
    let uploadData = new FormData();
    uploadData.append('type', 'formImages');
    uploadData.append('propID', post_id);
    uploadData.append('suAmount', this.state.suAmountOfSections);
    uploadData.append('obsgAmount', this.state.obsgAmountOfSections);
    uploadData.append('obstAmount', this.state.obstAmountOfSections);
    uploadData.append('submit', 'ok');
    uploadData.append('Content-Type', 'image/jpg');   
    phots.forEach((item, i) => {
      uploadData.append("files" + i, {
        uri: item[1],
        type: "image/jpg",
        name: item[0] + '.jpg' || `filename${i}.jpg`,
        filename: item[0] + '.jpg',
      });
    });

    fetch(base_url, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: uploadData,
    })
    .then((response) => response.text())
    .then((response) => {
      if(response.status) {
        this.setState({isUploading: false});
        console.log(response.status);
        Alert.alert(
          'Form submitted',
          response
        );
      } else {
        this.setState({isUploading: false});
        Alert.alert(
          'Form submitted',
          'Successfully uploaded'
        );
        console.log(response);
      }
    }).catch((error) => {
      this.setState({isUploading: false});
    });
  }

  handleFormSubmit = async (image_uri) => {
    let formDataComplete = this.state;
    this.setState({isUploading: true});
    let base_url = 'http://digital-dev.co.uk/cornerstone/form-submit/';
    let formData = new FormData();
    formData.append('type', 'formContent');
    formData.append('data', JSON.stringify(formDataComplete));
    let postId = "";
    fetch(base_url, {
      method: 'POST',
      body: formData,
      headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded', }),
    })
    .then((response) => response.text())
    .then((responseText) => {
      postId = responseText;
      this.handleImageSubmit(postId, base_url);
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