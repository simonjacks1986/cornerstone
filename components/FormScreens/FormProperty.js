import React, { Component } from 'react';
import { Text, Image, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight} from 'react-native';
import { Icon } from "native-base";
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsBigInput from '../CsBigInput';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';

class FormProperty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			modalImageVisible: false,
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			pictureUri: undefined,
		};
	}

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	}

	setModalVisible = visible => {
	    this.setState({modalVisible: visible});
	}
	setModalImageVisible = visible => {
	    this.setState({modalImageVisible: visible});
	}

	render(){
		const { values, handleChange, handleImage } = this.props;
		const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return(
				<View style={styles.container}>
					<FormModalCamera
						isOpen={this.state.modalVisible}
						handleImage={handleImage}
						setModalCameraVisible={this.setModalVisible}
						identifier="propertyImage"
					/>
					<FormModalImage
						isOpen={this.state.modalImageVisible}
						setModalVisible={this.setModalImageVisible}
						imageUri={values.photos.propertyImage}
					/>

					<CsAppTitle>1.0 Property</CsAppTitle>
					<CsAppText>Enter the survey details below;</CsAppText>
					<View>
						<View style={styles.row}>
							<View style={styles.one1}>
								<CsAppLabel>Photo of the Property</CsAppLabel>
								<TouchableOpacity 
									onPress={() => this.setState({modalVisible: true})}
									style={styles.cameraButton}
								>
									<Icon name="camera" style={{fontSize: 50, color: '#aaa'}}/>
									<Text>Click here to take a photo of the property</Text>
							    </TouchableOpacity>
							    { values.photos.propertyImage && 
							    <Text 
									style={styles.photoButton}
									onPress={() => {
										this.setModalImageVisible(true);
						    			}
									}
								>
									View Photo
								</Text>
								}
						    </View>
						</View>
						<View style={styles.row}>
							<View style={styles.one1}>
								<CsAppLabel>Description</CsAppLabel>
								<CsBigInput
								  	handleChange={handleChange}
									values={values}
									identifier="propertyDescription"
								/>
							</View>
							
						</View>
						
						
						
					</View>
					<FormControls
						nextStep={this.props.nextStep}
						prevStep={this.props.prevStep}
					/>
				</View>
			)
		}
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
  },
  one1: {
  	flex:1,
  	margin:5
  },
  cameraButton: {
  	backgroundColor: "#fff",
  	borderColor:'#DDDDDD',
  	borderWidth:1,
  	marginTop: 20,
  	borderRadius: 2,
  	height:140,
  	flex:1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	flexDirection: 'column',
  	textAlign: 'center',
  	paddingLeft: 20,
  	paddingRight: 20,
  },
  photoButton : {
	marginTop: 5,
  	color: '#2187FF',
  	textDecorationLine: 'underline',
  },
});
export default FormProperty;