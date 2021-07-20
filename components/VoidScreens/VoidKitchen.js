import React, { Component } from 'react';
import { StyleSheet, View, TouchableHighlight, Image, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class VoidKitchen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalColourVisible: false,
		    whichGrade: 1,
		};
	}

	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	handleColours = which =>{
		const { handleChoice } = this.props;
		handleChoice(this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}

	handleTickBox = which => {
		const { handleChoice, values } = this.props;
		if(values[which]) {
			handleChoice(which, 0);
		} else {
			handleChoice(which, 1);
		}
		
	}

	render(){
		const {values, handleChange, handlePicker, handleImage, handleChoice } = this.props;
		return(
			<Container style={styles.container}>
				<ScrollView>
					<FormModalColourPicker
						isOpen={this.state.modalColourVisible}
						setModalVisible={this.setModalColourVisible}
						handleColours={this.handleColours}
					/>
					<CsAppTitle>Kitchen</CsAppTitle>
					
					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.1</Text> 
							<CsAppText>Provide sheet vinyl floor covering (as per kitchen replacement specification) where existing is damaged , cannot be satisfactorily cleaned to remove stains or in generally poor condition.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment1"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />
	 
					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.2</Text> 
							<CsAppText>ALL Kitchen units to be left in a clean, hygienic and serviceable condition. Drawers to open and close freely, missing shelves replaced and lipped.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidKConfirm2')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidKConfirm2 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidKComment2"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.3</Text> 
							<CsAppText>Work tops CLEAN and SEALED. Kitchen cupboards and units washed and left clean, minor chips in laminate to be filled and finished with appropriate filler.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidKConfirm3')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidKConfirm3 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidKComment3"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.4</Text> 
							<CsAppText>Sink clean and free from rust, fitted with a plug and chain?</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidKConfirm4')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidKConfirm4 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidKComment4"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.5</Text> 
							<CsAppText>Taps left clean, and not dripping. Taps and stopcock will turn freely. Replacement taps must be lever mixer.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment5"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.6</Text> 
							<CsAppText>Gas supplies to be capped off.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment6"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.7</Text> 
							<CsAppText>Clean and overhaul existing extractor fan and leave in full working order. Provide new Envirovent extractor fan with integral humidistat control where no openable window is present.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment7"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidKGrade7')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidKGrade7 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidKGrade7 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidKGrade7 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.8</Text> 
							<CsAppText>Kitchen Fire Door - Ease and adjust to operate correctly. Supply and fit half hour fire check door where previously fitted (for example if stops are 44mm) , missing or damaged.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment8"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidKGrade8')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidKGrade8 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidKGrade8 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidKGrade8 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>2.9</Text> 
							<CsAppText>Tiling and grouting - Rake out and re-grout as required. Replace any broken / cracked tiles.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidKComment9"}
									  />
								</View>
							</View>
						</View>
					</View>

				</ScrollView>

				<FormControls
					nextStep={this.props.nextStep}
					prevStep={this.props.prevStep}
				/>
			</Container>
		)
	}
}
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  button: {
  	backgroundColor: theme.PRIMARY_COLOR,
  	width:140,
	height: 48,
	alignSelf: 'flex-end',
	justifyContent: 'center',
	borderRadius: 1,
	marginTop:40,
  },
  title: {
  	fontSize: theme.FONT_SIZE_LARGE,
  	marginBottom:10,
  },
  divider: {
  	borderBottomWidth: 1,
  	borderBottomColor: '#ddd',
  	height:1,
  	marginTop:20,
  	marginBottom:20,
  },
  rowContainer: {
  	flex: 1,
    flexDirection:'row',
  },
  row: {
    flex: 1,
    flexDirection:'row',
    justifyContent: 'space-between',
    marginBottom:5,
  },
  rowText: {
  	flex:2,
  	paddingRight:40,
  },
  rowControls: {
  	flex:4,
  },
  rowFirst: {
  	flex:3,
  	margin:5
  },
  rowSecond: {
  	margin:5
  },
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
  confirmBoxWidth: {
    width:40,
    marginBottom: 20,
  },
  confirmBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5,
  	paddingTop:10,
  }
});
export default VoidKitchen;