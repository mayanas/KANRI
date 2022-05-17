import React, { Component } from 'react';
import SelectDropdown from 'react-native-select-dropdown';
import { DataTable, Portal, Dialog, Provider } from 'react-native-paper';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import ProgressCircle from 'react-native-progress-circle'

// import { SafeAreaView } from 'react-native-safe-area-context';
import { LogBox } from "react-native";
import GanttChart from 'react-native-gantt-chart';
// import GanttChart from 'pimpos-react-native-gantt-chart';
import Loading from '../../../Components/Loading';
// import Loading from './Loading';
import { serverLink } from '../../serverLink';
import LinearGradient from 'react-native-linear-gradient';
import firestore from '@react-native-firebase/firestore';
// import {

//   ProgressChart,

// } from "react-native-chart-kit";
LogBox.ignoreLogs([
  "ViewPropTypes will be removed",
  "ColorPropType will be removed",
])

LogBox.ignoreLogs(['Require cycle:']);
// const serverLink = "http://192.168.1.15:3001";

// const data = {
//   labels: ["Swim", "Bike", "Run"], // optional
//   data: [0.4, 0.6, 0.8]
// };

class ViewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Email: this.props.Email,
      NickName: this.props.NickName,
      ProjectName: this.props.ProjectName,
      ProjectID: this.props.ProjectID,
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

      tasksApproved: [],
      tasksnotApproved: [],
      minDate: new Date(),
      maxDate: new Date(),
      tasks1: [
        { _id: "1", name: "Task 1", "start": new Date(2018, 0, 1), "end": new Date(2018, 0, 5), progress: 0.25 },
        { _id: "2", name: "Task 2", "start": new Date(2018, 0, 3), "end": new Date(2018, 0, 4), progress: 1 },
        { _id: "3", name: "Task 3", "start": new Date(2018, 0, 5), "end": new Date(2018, 0, 8), progress: 0.5 }
      ],
      flag: false,
    }

  }

  componentDidMount() {
    this.load();
  }
  load = async () => {
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
          "ProjectID": this.state.ProjectID,
        }
      )
    }).then(async response => { return response.json() }).then(async resp => {
      if(resp!=="null"){
        await this.setState({ data: resp })
      this.setState({
        dataLength: this.state.data.length,
        tasksApproved: [],
        projectProgress: 0,
        tasksnotApproved: [],
        tasks: []

      })
      await this.state.data.map(async item => {


        if (item.Approved) {
          this.setState({
            projectProgress: ++this.state.projectProgress,

            tasksApproved: [...this.state.tasksApproved, item]

          })

        }
        else {
          this.setState({


            tasksnotApproved: [...this.state.tasksnotApproved, item]

          })
        }

        await this.setState({
          tasks: [...this.state.tasks, {
            _id: item._id.toString(),
            name: item.Title,
            progress: this.datediff(this.parseDate(this.state.currentDate), this.parseDate(item.DeadLine)) <= 0 ? 1 :
              this.datediff(this.parseDate(item.StartDate), this.parseDate(this.state.currentDate)) / this.datediff(this.parseDate(item.StartDate), this.parseDate(item.DeadLine)),

            start: this.parseDate(item.StartDate),
            end: this.parseDate(item.DeadLine),
            MemberEmail: item.MemberEmail

          }],



        })

      }

      )
      console.log(this.state.tasks.length)
      this.setState({ projectProgress: Math.round(this.state.projectProgress / this.state.dataLength * 100) })
      }
    })

    return

  }
  updateStatus = async (Status, row) => {
    await fetch(serverLink + '/updateStatus', {

      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(
        {
          "Status": Status,
          "id": row._id,
        }
      )
    })
      .then(response => { return response.json() }).then(resp => {
        console.log(resp);
      })



    this.state.data.map(member => {
      if (member.MemberEmail !== row.MemberEmail) {
        firestore()
          .collection('NOTIFICATIONS')
          .doc(member.MemberEmail)
          .collection('NOTIFICATIONS')
          .add({
            Boolean: false,
            Type: "TaskStatusUpdated",
            SenderNickName: this.state.NickName,
            message: "The status of " + row.Title + " task from " + this.state.ProjectName + " has been modified => " + Status,
            projectId: this.state.ProjectID,
            ProjectName: this.state.ProjectName,
            // leaderEmail: item.Email,
            Date: new Date().toDateString(),
            createdAt: new Date().getTime(),
            user: {
              _id: this.state.Email,
              email: this.state.Email
            }
          });
      }
    })

    return;

  }
  render() {

    return (
      // <ScrollView style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }}> 

      <SafeAreaView style={{
        width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2", flex: 1,
        justifyContent: 'center', alignItems: 'center'
      }}>

        {this.state.loaded ?
          <ScrollView style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }} showsVerticalScrollIndicator={false}>
            <SafeAreaView style={{ width: "100%", height: "100%", paddingLeft: 0, backgroundColor: "#bfcfb2" }}>
              <View style={{ paddingTop: 10 }}>
                <Text style={styles.textstyle}>
                  Project Tasks Tracker
                </Text>

              </View>
              <Provider>

                <DataTable style={{ width: "100%", marginLeft: 0, marginTop: "3%" }}  >

                  <DataTable.Header style={{ width: "100%", marginLeft: 0,height:50 }} >
                    <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} >Task Name</Text> </DataTable.Title>
                    <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}><Text style={styles.text} >Priority</Text></DataTable.Title>
                    <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} >Status</Text></DataTable.Title>
                    <DataTable.Title style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} ><Text style={styles.text} > Budget</Text></DataTable.Title>

                  </DataTable.Header>

                  {this.state.data
                    .slice(
                      this.state.page * this.state.perPage,
                      this.state.page * this.state.perPage + this.state.perPage,
                    )
                    .map(row => (
                      <DataTable.Row key={row._id} >
                        <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }} >
                          <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}>
                            {row.Title}
                          </Text>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}><Text style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}>{row.Priority}</Text></DataTable.Cell>
                        <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center", alignContent: "center", alignItems: "center" }}>
                          <View style={{
                            //   width: 92,
                            width: 88,
                            height: 46,
                            borderColor: "#bc9855",
                            borderWidth: 1,

                          }}>
                            <SelectDropdown

                              dropdownBackgroundColor={"#98a988"}
                              disabled={this.state.Email === row.MemberEmail ? false : true}
                              //disabled={true}

                              styleInput={{ fontFamily: 'SairaSemiCondensed-Regular' }}
                              defaultButtonText={row.Status}
                              // rowTextForSelection={"hello"}
                              data={this.state.StatusArray}
                              rowTextStyle={{ fontSize: 15, fontFamily: 'SairaSemiCondensed-Regular', }}
                              buttonTextStyle={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 16, }}
                              buttonStyle={{
                                backgroundColor: '#98a988', width: "100%",
                                height: '100%'
                                ,
                              }}
                              // rowStyle={{width:"100%"}}
                              dropdownStyle={{
                                width: 170, backgroundColor: "#98a988", borderColor: "#bc9855",
                                borderWidth: 1
                              }}

                              onSelect={async (selectedItem, index) => {
                                let newMarkers = this.state.data.map(el => (
                                  el._id === row._id ? { ...el, Status: selectedItem } : el
                                ))
                                await this.setState({ data: newMarkers });
                                this.setState({ loaded: false })
                                await this.updateStatus(selectedItem, row)

                                await this.getAllTasks()
                                this.setState({ loaded: true })
                              }}
                              buttonTextAfterSelection={(selectedItem, index) => {

                                return selectedItem
                              }
                              }

                            />
                          </View>
                        </DataTable.Cell>
                        <DataTable.Cell style={{ borderWidth: 1, borderColor: "#bc9855", justifyContent: "center" }} >
                          <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 15 }}>
                            {row.Budget}$
                          </Text>

                        </DataTable.Cell>

                      </DataTable.Row>

                    ))}



                  <DataTable.Pagination
                    page={this.state.page}
                    numberOfPages={Math.ceil(this.state.data.length / this.state.perPage)}
                    onPageChange={page => { this.setState({ page: page }) }}
                    numberOfItemsPerPage={2}
                    selectPageDropdownLabel={'Rows per page'}
                    
                  />

                </DataTable >
                <LinearGradient
                  colors={['#98a988', '#98a988', '#98a988']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 1,
                    width: '100%',
                    marginTop: 5,
                  }}
                ></LinearGradient>

                <View style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  padding: 10,
                  paddingTop: 2
                }}>

                  <Portal style={{ width: '100%', height: '100%', }}>
                    <Dialog
                      visible={this.state.showDialog}
                      onDismiss={this.hideDialog}

                      style={{
                        borderRadius: 10,
                        backgroundColor: '#bfcfb2',
                        justifyContent: 'center', alignItems: 'center'
                      }}
                    >
                      <Dialog.Title style={{ fontFamily: 'SairaSemiCondensed-Regular', fontSize: 18, textAlign: 'center' }}>
                        {this.state.pressedTaskName}

                      </Dialog.Title>
                      <Dialog.Content style={{ alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', textAlign: 'center' }}>

                          Assigned To : {this.state.pressedTaskAssignedTo}</Text>
                        <Text style={{ fontFamily: 'SairaSemiCondensed-Regular', }}> Remaining Days:  {this.datediff(this.parseDate(this.state.currentDate), this.state.pressedTaskEnd)}
                        </Text>

                      </Dialog.Content>
                    </Dialog>
                  </Portal>

                </View>
                <View>
                  <Text style={styles.textstyle}>
                    Project Progress
                  </Text>

                </View>

                <View style={{ width: "80%", justifyContent: "center", flexDirection: "row", alignContent: "center", alignItems: "center", marginHorizontal: "10%" }} >

                  <View style={{ flexDirection: "column" }}>


                    {this.state.tasksnotApproved.map(item => (
                      <View style={{ flexDirection: "row" }} key={item._id}>
                        <View style={styles.Notsquare} >

                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                          <Text>{item.Title}</Text>
                          <Text style={{ fontSize: 9 }}>{item.Status}</Text>
                        </View>

                      </View>

                    )
                    )}



                  </View>


                  <View>

                    <ProgressCircle
                      percent={this.state.projectProgress}
                      radius={80}
                      borderWidth={15}
                      color="#bc9855"
                      shadowColor="#98a988"
                      bgColor="#bfcfb2"
                    >

                      <Text style={{ fontSize: 18 }}>{this.state.projectProgress + '%'}</Text>
                    </ProgressCircle>
                  </View>
                  <View style={{ flexDirection: "column", paddingLeft: "3%" }}>


                    {this.state.tasksApproved.map(item => (
                      <View style={{ flexDirection: "row" }} key={item._id}>
                        <View style={styles.square} >

                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                          <Text>{item.Title}</Text>
                          <Text style={{ fontSize: 9 }}>{item.Status}</Text>
                        </View>

                      </View>

                    )
                    )}



                  </View>

                </View>

                <LinearGradient
                  colors={['#98a988', '#98a988', '#98a988']}
                  style={{
                    left: 0,
                    right: 0,
                    height: 1,
                    width: '100%',
                    marginTop: 10,
                  }}
                ></LinearGradient>

                <SafeAreaView style={{ marginTop: "1%", marginLeft: "5%", marginRight: "5%" }}>
     
                 {this.state.tasks.length? <GanttChart
                    data={this.state.tasks}
                    numberOfTicks={5}
                    onPressTask={task => {
                      this.setState({
                        pressedTaskAssignedTo: task.MemberEmail,
                        pressedTaskEnd: task.end,
                        pressedTaskName: task.name,
                        showDialog: true,
                      })
                    }}

                    colors={{
                      barColorPrimary: '#bc9855',
                      barColorSecondary: '#98a988',
                      textColor: '#000',
                      backgroundColor: '#bfcfb2'
                    }}
                  />:console.log('hello')}


                </SafeAreaView>


              </Provider>
            </SafeAreaView>
          </ScrollView>
          : <Loading />}
      </SafeAreaView>
      //  {/* </ScrollView> */}

    );
  }
}
const styles = StyleSheet.create({
  text: {
    color: 'black',
    textAlign: 'center',
    fontSize: 15,
    fontFamily: "SairaSemiCondensed-Bold",
  },
  square: {
    width: 10,
    height: 10,
    backgroundColor: "#bc9855",
    marginTop: "2%"
  },
  Notsquare: {
    width: 10,
    height: 10,
    backgroundColor: "#98a988",
    marginTop: "2%"
  },
  textstyle: {
    marginTop: 0,
    fontFamily: "ArimaMadurai-Regular",
    fontSize: 16,
    color: 'black',
    paddingLeft: "3%",
    paddingBottom: "3%"
  },

});
export default ViewProject;

