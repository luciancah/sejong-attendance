import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {height, width, scale} from '../../config/globalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';

const AttendanceCard = ({
  course,
  courseId,
  classId,
  lectures,
  unpassCount,
  thisWeek,
  navigation,
}) => {
  return (
    <View style={styles.component}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('single', {
            names: [course, courseId, classId, lectures],
          });
        }}
        style={styles.card}>
        <View flexDirection="row" style={styles.row1}>
          {(!thisWeek ? unpassCount.this_week : unpassCount.all) ? (
            <View style={styles.badgeUnpass}>
              <Text style={styles.badgeTextUnpass}>미완료</Text>
            </View>
          ) : (
            <View style={styles.badgePass}>
              <Text style={styles.badgeTextPass}>완료</Text>
            </View>
          )}
          <Ionicons name={'ios-chevron-forward'} style={styles.chevronIcon} />
        </View>
        <View style={styles.row2}>
          <View style={styles.courseNameContainer}>
            <Text
              style={styles.classNameText}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {course}
            </Text>
          </View>
          {!thisWeek ? (
            unpassCount.this_week ? (
              <View style={styles.attendanceNumberContainer}>
                <Text style={styles.numOfAtendanceCaption}>미수강</Text>
                <Text style={styles.numOfAttendanceText}>
                  {unpassCount.this_week}개
                </Text>
              </View>
            ) : (
              <View style={styles.attendanceNumberContainer}>
                <Text style={styles.numOfAtendanceCaption2}>수강완료</Text>
                <Text style={styles.numOfAtendanceCaptionEmoji}>🙌🏻</Text>
              </View>
            )
          ) : unpassCount.all ? (
            <View style={styles.attendanceNumberContainer}>
              <Text style={styles.numOfAtendanceCaption}>미수강</Text>
              <Text style={styles.numOfAttendanceText}>
                {unpassCount.all}개
              </Text>
            </View>
          ) : (
            <View style={styles.attendanceNumberContainer}>
              <Text style={styles.numOfAtendanceCaption2}>수강완료</Text>
              <Text style={styles.numOfAtendanceCaptionEmoji}>🙌🏻</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    marginLeft: width * 16,
    marginRight: width * 16,
    marginTop: height * 4,
    marginBottom: height * 4,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {height: 2},
  },
  card: {
    backgroundColor: 'white',
    height: height * 86,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    shadowOffset: {height: 2},
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  badgeUnpass: {
    backgroundColor: '#FCE6DF',
    height: height * 23,
    width: width * 48,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 12,
    marginLeft: width * 16,
  },
  badgeTextUnpass: {
    color: '#EB5828',
    fontSize: scale * 12,
    fontWeight: '700',
  },
  badgePass: {
    backgroundColor: '#BFDEFF',
    height: height * 23,
    width: width * 37,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: height * 12,
    marginLeft: width * 16,
  },
  badgeTextPass: {
    color: '#007AFF',
    fontSize: scale * 12,
    fontWeight: '700',
  },
  row2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: height * 15,
  },
  courseNameContainer: {
    width: width * 200,
  },
  attendanceNumberContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  classNameText: {
    marginLeft: width * 16,
    fontSize: scale * 18,
    fontWeight: 'bold',
  },
  numOfAttendanceText: {
    marginLeft: width * 2,
    marginRight: width * 16,
    fontSize: scale * 18,
    fontWeight: 'bold',
  },
  numOfAtendanceCaption: {
    marginRight: width * 2,
    color: '#8a8a8d',
    fontWeight: 'bold',
  },
  numOfAtendanceCaption2: {
    color: '#8a8a8d',
    fontWeight: 'bold',
    alignItems: 'baseline',
  },
  numOfAtendanceCaptionEmoji: {
    marginRight: width * 16,
    paddingBottom: height * 3,
    fontSize: scale * 12,
    color: '#8a8a8d',
    alignItems: 'baseline',
  },
  chevronIcon: {
    marginTop: height * 14,
    marginRight: width * 14,
    fontSize: scale * 16,
    color: '#c4c4c6',
  },
});

export default AttendanceCard;
