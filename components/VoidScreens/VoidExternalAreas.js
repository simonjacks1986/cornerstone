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

class VoidExternalAreas extends Component {
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
					<CsAppTitle>External areas</CsAppTitle>

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.1 : Fencing</Text> 
							<CsAppText>Replace fencing when found to be in poor condition. Replacement is to be be carried out to the following standard.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm1')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm1 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment1"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.2 : Fencing</Text> 
							<CsAppText>Front - 900mm high close board timber on concrete post with concrete gravel boards.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm2')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm2 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment2"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.3 : Fencing</Text> 
							<CsAppText>Rear / Side - where the boundary is to to private residential garden x 1 1800mm high close board privacy panel to each adjacent side to rear property on concrete posts with concrete gravel board; chain link to remainder.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm3')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm3 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment3"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.4 : Fencing</Text> 
							<CsAppText>Where boundary is adjacent to area accessed by public or commercial premises: 1800mm high close boarded privacy panels on concrete posts with concrete gravel boards.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm4')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm4 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment4"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.5 : Site Clearance</Text> 
							<CsAppText>Remove and clear from site all loose items, discarded furniture, builders rubble, general debris and garden rubbish. Remove and clear all discarded items from within sheds, outhouses and external stores.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm5')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm5 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment5"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.6 : Sheds / Outhouses</Text> 
							<CsAppText>Remove existing sheds / outhouses when found to be in poor condition.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm6')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm6 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment6"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.7 : Conservatories</Text> 
							<CsAppText>Is conservatory in good condition.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm7')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm7 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment7"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.8 : Greenhouses / Cold frames or equivalent structures</Text> 
							<CsAppText>Remove in all cases.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm8')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm8 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment8"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.9 : Pathways / Steps / Ramps / Patios</Text> 
							<CsAppText>Make good any cracks or defects that present a trip hazard.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidExtComment9"}
									/>
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidExtGrade9')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidExtGrade9 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidExtGrade9 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidExtGrade9 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Advisory</CsAppLabel>
									<CsInput
									  	handleChange={handleChange}
										values={values}
										identifier="voidExtAdv9"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.10 : Gardens</Text> 
							<CsAppText>Cut back hedges, bushes, shrubs from pathways, entrance doors and gates to provide easy access, remove all wall or climbing growth.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm10')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm10 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment10"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.11 : Trees</Text> 
							<CsAppText>Report any issues noted with trees around property.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidExtComment11"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.12 : Ponds</Text> 
							<CsAppText>Drain and infill with hardcore. Turf / pave as necessary to match surrounding.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidExtComment12"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.13 : Roofs</Text> 
							<CsAppText>Pitched / flat roof - left in good watertight condition. Repair or replace cracked, slipped or missing roof tiles or slates.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidExtComment13"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidExtGrade13')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidExtGrade13 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidExtGrade13 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidExtGrade13 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.14 : Rainwater Goods</Text> 
							<CsAppText>Clear and clean gutters and downpipes of all vegetation. Unblock or clear all gullies. Repair all defects to to rainwater goods including the repair and replacement of broken fixings, leaks and blockages.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidExtComment14"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidExtGrade14')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidExtGrade14 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidExtGrade14 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidExtGrade14 == 1) && <View style={styles.clickBoxRed}></View> }
										</View>
									</TouchableHighlight>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>7.15 : Decking / Fake Grass</Text> 
							<CsAppText>Remove and make good.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidExtConfirm15')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidExtConfirm15 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidExtComment15"}
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
export default VoidExternalAreas;