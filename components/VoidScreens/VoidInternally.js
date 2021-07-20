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

class VoidInternally extends Component {
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
					<CsAppTitle>Internally</CsAppTitle>

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.1 : Walls</Text> 
							<CsAppText>Repair and make good damaged plaster finishes including plasterboard panels. All walls are to be left suitable for redecoration, including the making good of holes within the walls. Remove all polystyrene wall coverings and make good.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidIntComment1"}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.2 : Ceilings</Text> 
							<CsAppText>Remove all suspended ceilings, polystyrene tiles and coving, timber cladding and any other finishes. Make good and repair plaster finishes following removal.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidIntComment2"}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.3 : Floors</Text> 
							<CsAppText>Remove existing floor finishes in other areas unless in good and serviceable condition.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidIntComment3"}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.4 : Floors</Text> 
							<CsAppText>Subject to asbestos survey remove gripper rods following carpet removal, make good any damage to tiled area with latex screeding, ensure surface is left suitable to receive new floor covering.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidIntComment4"}
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.5 : Stairs</Text> 
							<CsAppText>Make good loose or uneven treads and eliminate any health and safety hazards. Reinstate missing handrails to provide safe access, balustrades compliant with building regs (max gap 100mm).</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
										handleChange={handleChange}
										values={values}
										identifier={"voidIntComment5"}
									/>
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidIntGrade5')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidIntGrade5 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidIntGrade5 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidIntGrade5 == 1) && <View style={styles.clickBoxRed}></View> }
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
										identifier="voidIntAdv5"
									/>
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.6 : Cleanliness</Text> 
							<CsAppText>Fully clear and clean the property throughout from top bottom. All washable surfaces shall be fully washed, sanitised, disinfected and left clean.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidIntConfirm6')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidIntConfirm6 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidIntComment6"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.7 : Cleanliness</Text> 
							<CsAppText>Treat vermin and insect infestation, clean and treat as appropriate.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidIntComment7"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.8 : Cleanliness</Text> 
							<CsAppText>Clean all windows internally and externally with appropriate cleaning agent.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidIntConfirm8')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidIntConfirm8 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidIntComment8"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.9 : Cleanliness</Text> 
							<CsAppText>Sweep, vacuum and clean all floor areas with appropriate cleaning agent.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidIntConfirm9')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidIntConfirm9 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidIntComment9"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.10 : Tenants fittings</Text> 
							<CsAppText>Residents fixtures or fittings left at the property should be removed and area made good.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowSecond}>
									<View>
									 	<CsAppLabel>Done</CsAppLabel>
										<TouchableHighlight
											style={styles.confirmBoxWidth}
											onPress={() => {
											  this.handleTickBox('voidIntConfirm10')
											}}
										>
										<View style={styles.confirmBox}>
										  	{ (values.voidIntConfirm10 == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
										</View>
										</TouchableHighlight>
									</View>
								</View>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										values={values}
										identifier={"voidIntComment10"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.11 :</Text> 
							<CsAppText>Check radiator / heating fixing brackets are securely fitted. Replace / re-secure as required.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidIntComment11"}
									  />
								</View>
							</View>
						</View>
					</View>

					<View style={styles.divider} />

					<View style={styles.rowContainer}>
						<View style={styles.rowText}>
							<Text style={styles.title}>5.12 : Loft and Cupboards</Text> 
							<CsAppText>Full clearance of any items.</CsAppText>
						</View>
						<View style={styles.rowControls}>
							<View style={styles.row}>
								<View style={styles.rowFirst}>
									<CsAppLabel>Comment</CsAppLabel>
								    <CsInput
									  	handleChange={handleChange}
										  values={values}
										  identifier={"voidIntComment12"}
									  />
								</View>
								<View style={styles.rowSecond}>
									<CsAppLabel>Grade</CsAppLabel>
									<TouchableHighlight
				            			style={styles.clickBoxWidth}
										onPress={() => {
											this.setModalColourVisible(true)
											this.setWhichGrade('voidIntGrade12')
										}}
									>
										<View style={styles.clickBox}>
											{ (values.voidIntGrade12 == 3) && <View style={styles.clickBoxGreen}></View> }
											{ (values.voidIntGrade12 == 2) && <View style={styles.clickBoxOrange}></View> }
											{ (values.voidIntGrade12 == 1) && <View style={styles.clickBoxRed}></View> }
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
export default VoidInternally;