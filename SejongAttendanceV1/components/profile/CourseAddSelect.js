import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {height, width, scale} from '../../config/globalStyles';
import Entypo from 'react-native-vector-icons/Entypo';

import {connect} from 'react-redux';

const mapStateToProps = state => ({
  courseCollege: state.courseCollege,
  courseDept: state.courseDept,
  courseCollegeName: state.courseCollegeName,
  courseDeptName: state.courseDeptName,
});

const CourseAddSelect = ({
  header,
  footer,
  navi,
  navigation,
  selectType,
  courseCollege,
  courseDept,
  courseCollegeName,
  courseDeptName,
}) => {
  if (selectType === 'college') {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => {
            navigation.navigate(navi);
          }}>
          {courseCollege === -1 ? (
            <Text style={{...styles.collegeNameBefore, ...styles.collegeName}}>
              선택하기...
            </Text>
          ) : (
            <Text style={styles.collegeName}>{courseCollegeName}</Text>
          )}
          <Entypo name={'chevron-thin-right'} style={styles.chevronIcon} />
        </TouchableOpacity>
        {footer === null ? null : <Text style={styles.footer}>{footer}</Text>}
      </View>
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>{header}</Text>
        <TouchableOpacity
          style={styles.boxContainer}
          onPress={() => {
            navigation.navigate(navi);
          }}
          disabled={courseCollege === -1 ? true : false}>
          {courseDept === -1 ? (
            <Text style={{...styles.collegeNameBefore, ...styles.collegeName}}>
              선택하기...
            </Text>
          ) : (
            <Text style={styles.collegeName}>{courseDeptName}</Text>
          )}
          <Entypo name={'chevron-thin-right'} style={styles.chevronIcon} />
        </TouchableOpacity>
        {footer === null ? null : <Text style={styles.footer}>{footer}</Text>}
      </View>
    );
  }
};
const styles = StyleSheet.create({
  container: {
    width: width * 358,
    alignSelf: 'center',
    backgroundColor: '#f4f3f6',
  },
  header: {
    fontSize: scale * 12,
    color: '#86858c',
    marginTop: height * 18,
    marginLeft: width * 16,
  },
  boxContainer: {
    width: width * 358,
    height: height * 44,
    borderRadius: 14,
    backgroundColor: '#fff',
    marginTop: height * 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  collegeName: {
    marginLeft: width * 16,
    fontSize: scale * 17,
  },
  collegeNameBefore: {
    color: '#007afe',
  },
  courseInput: {
    marginLeft: width * 10,
    fontSize: scale * 17,
  },
  footer: {
    fontSize: scale * 12,
    color: '#86858c',
    width: width * 358,
    marginTop: height * 6,
    marginLeft: width * 10,
  },
  chevronIcon: {
    color: '#c4c4c6',
    fontSize: scale * 16,
    alignSelf: 'center',
    marginRight: width * 16,
  },
});
export default connect(mapStateToProps)(CourseAddSelect);
