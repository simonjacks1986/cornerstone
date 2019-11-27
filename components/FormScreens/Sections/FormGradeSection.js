import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import CsAppText from '../../CsAppText';
import CsAppLabel from '../../CsAppLabel';
import CsAppTitle from '../../CsAppTitle';
import CsInput from '../../CsInput';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import { Picker, Icon } from "native-base";

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
  
	render(){
		const { values, iteration, handleChange, setWhichGrade, setWhichImage, handleColours, setModalVisible, handlePicker, data1, handleImage } = this.props;
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
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
  },
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
  clickBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5
  },
  clickBoxWidth: {
    width:40,
  },
  clickBoxRed: {
  	backgroundColor: '#FC0000',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxOrange: {
  	backgroundColor: '#FCC400',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxGreen: {
  	backgroundColor: '#28A745',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
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
  picker: {
    backgroundColor: "#fff",
    borderColor:'#DDDDDD',
    borderWidth:1,
    marginTop: 16,
    borderRadius: 2,
    marginBottom:10,
    height:40
  },
});
export default FormGradeSection;