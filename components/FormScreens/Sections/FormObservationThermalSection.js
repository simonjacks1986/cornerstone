import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import { Picker, Icon } from "native-base";
import CsAppText from '../../Parts/CsAppText';
import CsAppLabel from '../../Parts/CsAppLabel';
import CsAppTitle from '../../Parts/CsAppTitle';
import CsInput from '../../Parts/CsInput';
import FormModalImage from '../../Modal/FormModalImage';
import Constants from 'expo-constants';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import theme from '../../../assets/styles/common.js';

class FormObservationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCameraVisible: false,
      modalImageVisible: false,
      whichImage: "notSet",
      hasCameraPermission: null,
    };
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Camera.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to pick an image.');
      }
    }
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.cancelled) {
      const manipResult = await ImageManipulator.manipulateAsync(
          result.uri,
          [{resize: { width: theme.compWidth }}],
          { compress: theme.compression, format: ImageManipulator.SaveFormat.JPEG }
        );
        let saveResult = await MediaLibrary.createAssetAsync(manipResult.uri);

      this.setState({ image: saveResult.uri });
      const { handleImage } = this.props;
      handleImage(this.state.whichImage, saveResult.uri);
    }
  };

  setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
  setModalImageVisible = visible => this.setState({modalImageVisible: visible});
  setWhichImage = which => this.setState({whichImage: which});

	render(){
		const { values, iteration, handleChange, setWhichGrade, setWhichImage, handleColours, setModalVisible, handlePicker, data1, handleImage, removeImage } = this.props;
		return(
			<View style={styles.row}>
        
        <FormModalImage
          isOpen={this.state.modalImageVisible}
          setModalVisible={this.setModalImageVisible}
          imageUri={values.photos[this.state.whichImage]}
          removeImage={removeImage}
          identifier={this.state.whichImage}
        />

				<View style={styles.rowFirst}>
          <CsAppLabel>Location</CsAppLabel>
          <Picker
            note
            mode="dropdown"
            style={styles.picker}
            placeholder="- Select -"
            iosIcon={<Icon name="chevron-down" />}
            selectedValue={values['obsTherLocation' + iteration]}
            onValueChange={handlePicker('obsTherLocation' + iteration)}
          >
            <Picker.Item label="Exterior Front" value="Exterior Front" />
            <Picker.Item label="Exterior Side" value="Exterior Side" />
            <Picker.Item label="Exterior Rear" value="Exterior Rear" />
            <Picker.Item label="Lounge" value="Lounge" />
            <Picker.Item label="Diner" value="Diner" />
            <Picker.Item label="Lounge/Diner" value="Lounge/Diner" />
            <Picker.Item label="Kitchen" value="Kitchen" />
            <Picker.Item label="Kitchen/Diner" value="Kitchen/Diner" />
            <Picker.Item label="Study" value="Study" />
            <Picker.Item label="Hallway" value="Hallway" />
            <Picker.Item label="Landing" value="Landing" />
            <Picker.Item label="Bed 1" value="Bed 1" />
            <Picker.Item label="Bed 2" value="Bed 2" />
            <Picker.Item label="Bed 3" value="Bed 3" /> 
            <Picker.Item label="Bed 4" value="Bed 4" /> 
            <Picker.Item label="Bed 5" value="Bed 5" /> 
            <Picker.Item label="Bathroom" value="Bathroom"/>
            <Picker.Item label="Ensuite" value="Ensuite" />
            <Picker.Item label="Utility" value="Utility" />
            <Picker.Item label="Conservatory" value="Conservatory" />
            <Picker.Item label="WC" value="WC" />
            <Picker.Item label="Cupboard" value="Cupboard" />
            <Picker.Item label="Boiler Room" value="Boiler Room" />
            <Picker.Item label="Office" value="Office" />
            <Picker.Item label="Other" value="Other" />
            <Picker.Item label="None" value="None" />
          </Picker>

          <View style={styles.photoRow}>
            <Text 
              style={styles.photoButton}
              onPress={() => {
                this.setWhichImage('obsTherImage' + iteration);
                this._pickImage();
                }
              }
            >
              Pick Photo</Text>
            { values.photos['obsTherImage' + iteration] && 
            <Text 
              style={styles.photoButton}
              onPress={() => {
                  this.setWhichImage('obsTherImage' + iteration);
                  this.setModalImageVisible(true);
                  }
              }
            >
              View Photo
            </Text>
            }
          </View>
				</View>
				<View style={styles.rowSecond}>
					<CsAppLabel>Comment</CsAppLabel>
				    <CsInput
					  	handleChange={handleChange}
						  values={values}
						  identifier={"obsTherComment" + iteration}
              multiline={true}
					  />
				</View>
				<View style={styles.rowThird}>
					<CsAppLabel>Grade</CsAppLabel>
					<TouchableHighlight
            style={styles.clickBoxWidth}
						onPress={() => {
							setModalVisible(true)
							setWhichGrade(iteration)
						}}
					>
						<View style={styles.clickBox}>
							{ (values['obsTherGrade'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
							{ (values['obsTherGrade'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
							{ (values['obsTherGrade'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
						</View>
					</TouchableHighlight>
				</View>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  row: theme.ROW,
  rowFirst: {
  	flex:3,
  	margin:5
  },
  rowSecond: {
  	flex:4,
  	margin:5
  },
  rowThird: {
  	margin:5
  },
  picker: {
  	padding:0,
  	margin:0
  },
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
  photoRow : {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  photoButton : {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#2187FF',
    textDecorationLine: 'underline',
    marginTop:5
  },
  picker: theme.PICKER,
});
export default FormObservationSection;