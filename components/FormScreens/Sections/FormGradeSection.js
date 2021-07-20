import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import CsAppText from '../../Parts/CsAppText';
import CsAppLabel from '../../Parts/CsAppLabel';
import CsAppTitle from '../../Parts/CsAppTitle';
import CsInput from '../../Parts/CsInput';
import FormModalCamera from '../../Modal/FormModalCamera';
import FormModalImage from '../../Modal/FormModalImage';
import { Picker, Icon } from "native-base";
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import theme from '../../../assets/styles/common.js';

class FormGradeSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCameraVisible: false,
      modalImageVisible: false,
      whichImage: "notSet",
      hasCameraPermission: null,
    };
    this.setModalCameraVisible = this.setModalCameraVisible.bind(this);
    this.setModalImageVisible = this.setModalImageVisible.bind(this);
    this.setWhichImage = this.setWhichImage.bind(this);
  }

	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
  setModalImageVisible = visible => this.setState({modalImageVisible: visible});
  setWhichImage = which => this.setState({whichImage: which});
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

	render(){
		const { values, iteration, handleChange, setWhichGrade, setWhichImage, handleColours, setModalVisible, handlePicker, data1, handleImage, removeImage } = this.props;
		return(
			<View style={styles.row}>
        <FormModalCamera 
          isOpen={this.state.modalCameraVisible}
          setModalCameraVisible={this.setModalCameraVisible}
          handleImage={handleImage}
          identifier={this.state.whichImage}
        />

        <FormModalImage
          isOpen={this.state.modalImageVisible}
          setModalVisible={this.setModalImageVisible}
          imageUri={values.photos[this.state.whichImage]}
          removeImage={removeImage}
          identifier={this.state.whichImage}
        />

				<View style={styles.rowFirst}>
          <CsAppLabel>Title</CsAppLabel>
          <CsInput
            handleChange={handleChange}
            values={values}
            identifier={"suTitle" + iteration}
          />

          <View style={styles.photoRow}>
            <Text 
              style={styles.photoButton}
              onPress={() => {
                this.setWhichImage('suImage' + iteration);
                this.setModalCameraVisible(true);
                }
              }
            >
              Take Photo</Text>
            <Text 
              style={styles.photoButton}
              onPress={() => {
                this.setWhichImage('suImage' + iteration);
                this._pickImage();
                }
              }
            >
              Pick Photo
            </Text>
            { values.photos['suImage' + iteration] && 
            <Text 
              style={styles.photoButton}
              onPress={() => {
                  this.setWhichImage('suImage' + iteration);
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
						  identifier={"suComment" + iteration}
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
							{ (values['suGrade'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
							{ (values['suGrade'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
							{ (values['suGrade'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
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
export default FormGradeSection;