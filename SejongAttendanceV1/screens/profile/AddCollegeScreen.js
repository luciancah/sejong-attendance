import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
//import {Section, TableView} from 'react-native-tableview-simple';
import Table, {Section} from 'react-native-js-table';
import CollegeTable from '../../components/profile/CollegeTable';
import {height, width, scale} from '../../config/globalStyles';

//import colleges from '../../data/college.json';

const AddCollegeScreen = () => {
  const [colleges, setColleges] = useState([]);
  useEffect(() => {
    setColleges([
      {id: 0, college: '인문과학대학'},
      {id: 1, college: '소프트웨어융합대학'},
      {id: 2, college: '인문과학대학'},
      {id: 3, college: '소프트웨어융합대학'},
      {id: 4, college: '인문과학대학'},
    ]);
  }, []);
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      alwaysBounceVertical={false}
      style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <View style={styles.innerContainer}>
        <Table
          style={styles.tableview}
          // json="colleges"
          // selectedValue="ES53"
          // //filter={`country=='${colleges}'`}
          //tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
          //onPress={event => alert(JSON.stringify(event))}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f6',
  },
  innerContainer: {
    alignItems: 'center',
  },
  tableview: {
    width: width * 358,
    // alignSelf: 'center',
    marginTop: height * 18,
  },
});

export default AddCollegeScreen;
