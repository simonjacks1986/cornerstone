import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, ActivityIndicator, Image, ScrollView, Alert } from 'react-native';
import { Button, Text, Footer, FooterTab, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import CsBigInput from '../Parts/CsBigInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';
import SignatureScreen from '../Parts/PartsSignature';
import DateTimePickerModal from "react-native-modal-datetime-picker";

class FormAdvisories extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			whichGrade: 1,
			isDatePickerVisible: false,
		};
	}
	
	showDatePicker = () => {
		this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
	};

	handleDatePicked = date => {
		const { handleChoice } = this.props;
		this.showDatePicker();
		handleChoice('signedDate', date.getDate() + "/" + (date.getMonth() + 1 ) + "/" + date.getFullYear());
	};

	setModalVisible = visible => this.setState({modalVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});

	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('advGrade' + this.state.whichGrade, which);
		this.setModalVisible(!this.state.modalVisible);
	}

	render(){
		const { values, handleChange, handlePicker, handleSignature, handleChoice, handleFormSubmit, prevStep } = this.props;
		return(
			<Container style={styles.container}>
				<ScrollView>
					<FormModalColourPicker
						isOpen={this.state.modalVisible}
						setModalVisible={this.setModalVisible}
						handleColours={this.handleColours}
					/>

					<DateTimePickerModal
						isVisible={this.state.isDatePickerVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.showDatePicker}
						mode="date"
					/>

					<CsAppTitle>8.0 Advisories</CsAppTitle>
					<CsAppText>Enter the survey details below.</CsAppText>
					<View>
						<View style={styles.whiteBlock}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Advisory</CsAppLabel>
									<CsBigInput
									  	handleChange={handleChange}
										values={values}
										identifier="advFinal1"
									/>
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
										style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalVisible(true);
											this.setWhichGrade(1);
										}}
									>
										<View style={styles.clickBox}>
											{ (values.advGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.advGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.advGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>

						<View style={styles.whiteBlock}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Advisory</CsAppLabel>
									<CsBigInput
									  	handleChange={handleChange}
										values={values}
										identifier="advFinal2"
									/>
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
										style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalVisible(true);
											this.setWhichGrade(2);
										}}
									>
										<View style={styles.clickBox}>
											{ (values.advGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.advGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.advGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>

						<View style={styles.whiteBlock}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Advisory</CsAppLabel>
									<CsBigInput
									  	handleChange={handleChange}
										values={values}
										identifier="advFinal3"
									/>
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
										style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalVisible(true);
											this.setWhichGrade(3);
										}}
									>
										<View style={styles.clickBox}>
											{ (values.advGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.advGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.advGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
						
						<View style={styles.divider}></View>
						
						<View style={styles.sigBlock}>
							<View style={styles.rowSig}>
								<View style={styles.rowSig1}>
									<Text style={styles.textSig}>Author</Text>
								</View>
								<View style={styles.rowSig3}>
									<SignatureScreen 
										handleSignature={handleSignature}
										testProps="This is a test"
									/>
								</View>
								<View style={styles.rowSig1}>
									<Text style={styles.textSig}>Date</Text>
								</View>
								<View style={styles.rowSig2}>
									<TouchableHighlight 
										onPress={() => {
											this.showDatePicker();
										}}
										style={styles.datePicker}
									>
										<Text>{ (values.signedDate) && values.signedDate }</Text>
									</TouchableHighlight>
								</View>
							</View>
						</View>

						<View style={styles.divider}></View>

						<View>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<Text style={styles.subTitle}>Survey Equipment:</Text>
									<Text style={styles.margBottomSmall}>Air moisture readings have been obtained using a Tramex MRH, Protimeter Hygromaster or MMS2 measuring temperature in °C, % relative humidity and specific moisture content in g/Kg</Text>
									<Text style={styles.margBottomSmall}>Non-destructive Protimeter Surveymaster using radio frequency with readings given numerically between 0 to 999 REL.</Text>
									<Text style={styles.margBottomSmall}>Tramex MRH uses electrcial impedance method in non-wood materials with readings given numerically between 0 to 99.</Text>
									<Text style={styles.margBottom}>Invasive Moisture Readings taken using a Protimeter Surveymaster reading %Mositure in wood and % wood moisture equivalent in other materials.</Text>
									<Text style={styles.subTitle}>Note:</Text>
									<Text style={styles.margBottom}>All readings taken with electronic metering are a guide and should be viewed with all the available information to gauge the true condition. However for the purposes of this report the following readings can be taken as an indication that the material checked could be said to be dry to a satisfactory level.</Text>
								</View>
							</View>
						</View>
					</View>
				</ScrollView>
		        <Footer>
		          <FooterTab style={styles.buttons}>
				  	<Button
				  		bordered
				  		style={styles.buttonPrev}
						title="Previous"
						type="outline"
						onPress = {() => {prevStep()}}
					>
						<Text style={styles.titlePrev}>Back</Text>
					</Button>
					<Button></Button>
					<Button
						style={styles.button}
						onPress = {() => { 
							Alert.alert(
								'Are you sure you want to submit this survey?', '', [ 
								  { text: 'Yes', onPress: () => handleFormSubmit() },
								  { text: 'Cancel', onPress: () => console.log('Cancelled'), style: 'cancel'},
								],{cancelable: false},
								);
							}
						}
					>
						{(this.props.isUploading == true) ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Text style={styles.title}>Finish & Upload</Text>}
					</Button>
		          </FooterTab>
		        </Footer>
      		</Container>
		)
	}
}
let {Platform} = React;
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  whiteBlock: theme.WHITEBLOCK,
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
  row: theme.ROW,
  subTitle: {
  	fontSize: 18, 
  	marginBottom: 16, 
  	color: '#15354E', 
  	fontWeight: 'bold'
  },
  margBottom: {
  	marginBottom:40,
  },
  margBottomSmall: {
  	marginBottom:16,
  }, 
  rowFirst: {
  	flex:5,
  	margin:5,
  	paddingRight:10,
  },
  rowSecond: {
  	margin:5
  },
  rowSig: {
  	flex: 1,
    flexDirection:'row',
    alignItems:'center',
  },
  rowSig1: {
  	flex:1,
  	margin:5,
  	alignContent:'flex-end',
  	marginLeft: 'auto'
  },
  rowSig2: {
  	flex:2,
  	margin:5
  },
  rowSig3: {
  	flex:3,
  	margin:5
  },
  buttons: {
  	paddingTop: (Platform.OS === 'ios') ? 10 : 0,
  	backgroundColor: '#F4F6FC',
  },
  buttonPrev: {
  	borderColor: theme.PRIMARY_COLOR,
  	backgroundColor: '#fff',
  	width:140,
	height: 48,
	justifyContent: 'center',
	borderRadius: 1,
  },
  button: {
  	backgroundColor: theme.PRIMARY_COLOR,
  	width:140,
	height: 48,
	justifyContent: 'center',
	borderRadius: 1,
  },
  title: {
  	fontSize: theme.FONT_SIZE_SMALL,
  	color: 'white'
  },
  titlePrev: {
  	fontSize: theme.FONT_SIZE_SMALL,
  	color: theme.PRIMARY_COLOR,
  },
  divider: {
  	height:1,
  	backgroundColor: "#122F45",
  	marginTop:30,
  	marginBottom:30,
  },
  datePicker: {
  	height: 100,
  	backgroundColor:'#FFF',
    borderColor:'#DDD',
    borderWidth:1,
    justifyContent:'center',
    alignItems: 'center'
  },
  textSig: {
  	fontSize: 18,
  	fontWeight: 'bold',
  	textAlign: 'right',
  	paddingRight:10
  }
});
export default FormAdvisories;