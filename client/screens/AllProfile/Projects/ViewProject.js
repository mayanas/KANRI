

import React, { Component } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { ProgressBar, DataTable, Portal, Dialog, Provider } from 'react-native-paper';
import { TouchableOpacity, View, Text, StyleSheet, Button, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ProgressCircle from 'react-native-progress-circle'
import { LogBox } from "react-native";
import GanttChart from 'react-native-gantt-chart'
import Loading from '../../../Components/Loading';
import {serverLink} from '../../serverLink';
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])
class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
      perPage: 2,
      StatusArray: ["Stuck", "Need Help", "Done", "Working on it", "Bug", "Negotiation", "Not started yet"],
      Counter: 0,
      // Title 
      //Status
      //MemberEmail
      ChosenStatus: "",
      data: [],
      //{ _id: "1", name: "Task 1", "start":new Date(2018, 0, 5), "end": new Date(2018, 0, 5), progress: 0.25 }],

      showDialog: false,
      tasks: [],
      projectProgress: 0,
      pressedTaskAssignedTo: "",
      pressedTaskEnd: "",
      Remaining: "",
      pressedTaskName: "",
      currentDate: new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate(),

      dataLength: 0,
      loaded: true,
    }

  }
  async componentDidMount() {
    this.setState({ loaded: false })
    await this.getAllTasks()
    this.setState({ loaded: true })
  }

  hideDialog = () => {
    this.setState({ showDialog: false });
  }
  showDialog = () => {
    this.setState({ showDialog: true });
  }
  parseDate(str) {
    var mdy = str.split('-');
    console.log(mdy[2]);
    return new Date(mdy[0], mdy[1] - 1, mdy[2]);

  }
  datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.         
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
  }

  getAllTasks = async () => {
    await fetch(serverLink + '/loadTasks', {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "ProjectID": this.props.ProjectID,
        }
      )
    }).then(async response => { return response.json() }).then(async resp => {
      await this.setState({ data: resp })
      this.setState({ dataLength: this.state.data.length })
      await this.state.data.map(item => {

        if (item.Approved) {
          this.setState({ projectProgress: ++this.state.projectProgress })
        }

        this.setState({
          tasks: [...this.state.tasks, {
            _id: item._id
            , name: item.Title,
            start: this.parseDate(item.StartDate),
            end: this.parseDate(item.DeadLine),
            progress: 0.25,
            MemberEmail: item.MemberEmail

          }]

        })
      }

      )
      this.setState({ projectProgress: this.state.projectProgress / this.state.dataLength * 100 })
    })
    // console.log(this.state.data);

  }

  render() {
    return (
/* <View style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }}> */
      <SafeAreaView style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }}>
      
        <Provider>
        {this.state.loaded ?  
        <SafeAreaView style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }}>
          <DataTable style={{ width: "100%", marginLeft: 0, marginTop: "5%" }}  >

            <DataTable.Header style={{ width: "100%", marginLeft: 0 }} >
              <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} >Task Name</Text> </DataTable.Title>
              <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}><Text style={styles.text} >Priority</Text></DataTable.Title>
              <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} >Status</Text></DataTable.Title>
              <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} > Pudget</Text></DataTable.Title>

            </DataTable.Header>


            {this.state.data.slice(
              this.state.page * this.state.perPage,
              this.state.page * this.state.perPage + this.state.perPage,
            ).map(row => (

              <DataTable.Row key={row._id} >
                <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} >{row.Title}</DataTable.Cell>
                <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}>{row.Priority}</DataTable.Cell>
                <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                  <View style={{
                    width: 88,
                    height: 46,
                    borderColor: "#bc9855",
                    borderWidth: 1,

                  }}>
                    <SelectDropdown

                      dropdownBackgroundColor={"#98a988"}

                      styleInput={{ fontFamily: 'SairaSemiCondensed-Regular' }}
                      defaultButtonText={row.Status}
                      // rowTextForSelection={"hello"}
                      data={this.state.StatusArray}
                      rowTextStyle={{ fontSize: 15, fontFamily: 'SairaSemiCondensed-Regular', }}
                      buttonTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 10 }}
                      buttonStyle={{
                        backgroundColor: '#98a988', width: "100%",
                        height: '100%'
                        ,
                      }}
                      // rowStyle={{width:"100%"}}
                      dropdownStyle={{
                        width: 110, backgroundColor: "#98a988", borderColor: "#bc9855",
                        borderWidth: 1
                      }}
                      onSelect={(selectedItem, index) => {
                        let newMarkers = this.state.data.map(el => (
                          el.name === row.name ? { ...el, Status: selectedItem } : el
                        ))
                        this.setState({ data: newMarkers });
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {

                        return selectedItem
                      }
                      }

                    />
                  </View>



                  {/* {row.Status} */}
                </DataTable.Cell>
                <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center" }} >
                  {/* {this.datediff(this.parseDate(this.state.currentDate), this.parseDate(row.DeadLine))}  */}
                  {/* { this.datediff(new Date().getDate(), this.parseDate(row.DeadLine))} */}
                  { }

                </DataTable.Cell>

              </DataTable.Row>

            ))}



            <DataTable.Pagination
              page={this.state.page}
              numberOfPages={Math.ceil(this.state.data.length / this.state.perPage)}
              onPageChange={page => { this.setState({ page: page }) }}
              //  label={`1-to of ${this.state.data.length}`}
              //  showFastPaginationControls
              //  numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={this.state.numberOfItemsPerPage}
              //  onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={'Rows per page'}

            />

          </DataTable >

          <View style={{
            flex: 1,
            width: '100%',
            height: '100%',
            padding: 10
          }}>

            <Portal style={{ width: '100%', height: '100%' }}>
              <Dialog
                visible={this.state.showDialog}
                onDismiss={this.hideDialog}

                style={{
                  borderRadius: 10,
                  backgroundColor: '#bfcfb2'
                }}
              >
                <Dialog.Title style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 18, textAlign: 'center' }}>
                  {this.state.pressedTaskName}

                </Dialog.Title>
                <Dialog.Content style={{ alignItems: 'center' }}>
                  <Text>

                    Assigned To : {this.state.pressedTaskAssignedTo}
                    <Text> Remaining Days:  {this.datediff(this.parseDate(this.state.currentDate), this.state.pressedTaskEnd)}
                    </Text>
                  </Text>





                </Dialog.Content>
              </Dialog>
            </Portal>

          </View>


          <View style={{ width: "80%", justifyContent: "center", alignContent: "center", alignItems: "center", marginHorizontal: "10%"}} >
            <ProgressCircle
              percent={this.state.projectProgress}
              radius={70}
              borderWidth={10}
              color="#bc9855"
              shadowColor="#98a988"
              bgColor="#bfcfb2"
            >

              <Text style={{ fontSize: 18 }}>{this.state.projectProgress + '%'}</Text>
            </ProgressCircle>


          </View>



          <View style={{ marginTop: "1%", marginLeft: "5%", marginRight: "5%" }}>



            <GanttChart
              data={this.state.tasks}
              numberOfTicks={4}
              onPressTask={task => {
                this.setState({
                  pressedTaskAssignedTo: task.MemberEmail,
                  pressedTaskEnd: task.end,
                  pressedTaskName: task.name,
                  showDialog: true,
                })
              }}
              gridMin={new Date(2022, 4, 1).getTime()}
              gridMax={new Date(2022, 4, 20).getTime()}

              colors={{
                barColorPrimary: '#bc9855',
                barColorSecondary: '#98a988',
                textColor: 'black',
                backgroundColor: '#bfcfb2'
              }}
            // width={100}
            />


          </View>

</SafeAreaView>:<Loading/>}
        </Provider>
       
      </SafeAreaView>
      // </View>

    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: "SairaSemiCondensed-Regular",
  },

});
export default ViewProject;