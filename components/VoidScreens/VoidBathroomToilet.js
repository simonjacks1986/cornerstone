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

class VoidBathroomToilet extends Component {
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
					<CsAppTitle>Bathroom & Toilet</CsAppTitle>

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.1</Text> 
							<CsAppText>Provide sheet vinyl floor covering(as per bathroom replacement specification) where existing is damaged, cannot be satisfactorily cleaned to remove stains or in generally poor condition.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment1"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.2</Text> 
							<CsAppText>Wet room flooring - Prepare floor and shower tray generally. Supply and lay alto marine 20 or similar approved slip resistant vinyl flooring to entire area with 100mm skirting all around, fit aluminium edging strip to door threshold.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment2"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.3</Text> 
							<CsAppText>Thoroughly clean and de-scale all sanitary ware. Replace cracked or chipped sanitary ware, or that beyond being brought back to a clean standard.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm3')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm3 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment3"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.4</Text> 
							<CsAppText>Replace loose, missing or badly stained sanitary sealant.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment4"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.5</Text> 
							<CsAppText>Replace all missing or damaged miscellaneous items such as bath panels, plugs and chains.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm5')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm5 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment5"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.6</Text> 
							<CsAppText>Replace all toilets seats and covers with new to a reasonable standard and leave taped shut.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm6')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm6 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment6"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />
	 
					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.7</Text> 
							<CsAppText>Taps left clean, and not dripping. Taps and stopcock will turn freely.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm7')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm7 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment7"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.8</Text> 
							<CsAppText>Replace or overhaul damaged or seized tap handles and replace with short arm lever taps as standard.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm8')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm8 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment8"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.9</Text> 
							<CsAppText>Subject to electrical test and health and safety implications remove electric showers over baths, make good and terminate supply at consumer unit. Cap off water and make good affected tiling.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment9"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidBKGrade9')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidBKGrade9 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidBKGrade9 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidBKGrade9 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.10</Text> 
							<CsAppText>Clean and overhaul existing extractor fan and leave in full working order. Provide new Envirovent extractor fan with integral humidistat control where no openable window is present.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment10"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidBKGrade10')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidBKGrade10 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidBKGrade10 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidBKGrade10 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.11</Text> 
							<CsAppText>Tiling and grouting - Rake out and re-grout as required. Replace any broken / cracked tiles.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment11"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.12</Text> 
							<CsAppText>Mirrors - If in good condition leave and gift to tenant. If not then remove.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidBKConfirm12')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidBKConfirm12 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidBKComment12"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.13</Text> 
							<CsAppText>Bathroom hand shower specification - If bath tiles are only three tiles high , fit low level hand shower bracket. If bath tiles are full height, check for non slip bath and at correct end and fit high level riser. If bath is non slip fit low level bracket.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment13"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>3.14</Text> 
							<CsAppText>Shower rail and curtain :- supply and fit to bathrooms with correct shower specifications and wet rooms.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidBKComment14"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidBKGrade14')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidBKGrade14 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidBKGrade14 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidBKGrade14 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
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
export default VoidBathroomToilet;