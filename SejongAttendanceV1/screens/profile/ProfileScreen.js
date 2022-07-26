import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ActionSheetIOS,
} from 'react-native';
import RNExitApp from 'react-native-exit-app';
import Profile from '../../components/profile/Profile';
import {height, width, scale} from '../../config/globalStyles';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';

import MapCourseTable from '../../components/profile/MapCourseTable';

import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useIsFocused} from '@react-navigation/native';

const ProfileScreen = ({navigation}) => {
  const [courses, setCourses] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    getAsyncCourses();
  }, [isFocused]);

  const getAsyncCourses = async () => {
    try {
      const value = await AsyncStorage.getItem(Config.COURSES_KEY);
      if (value !== null) {
        const data = JSON.parse(value);
        setCourses(data.courses);
      } else {
      }
    } catch (e) {
      console.log('강의 불러오기 실패');
    }
  };

  const removeCourses = async () => {
    try {
      await AsyncStorage.removeItem(Config.COURSES_KEY);
      setCourses([]);
      console.log('강의 삭제 완료');
    } catch (e) {
      console.log('강의 삭제 실패');
    }
  };

  const removeStudent = async () => {
    try {
      await AsyncStorage.removeItem(Config.STUDENT_ID_KEY);
      console.log('학번 삭제 완료');
    } catch (e) {
      console.log('학번 삭제 실패');
    }
  };

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        alwaysBounceVertical={true}
        style={styles.container}>
        <StatusBar barStyle={'dark-content'} />
        <View>
          <Profile />
          <View style={styles.row1}>
            <Text style={styles.subtitle}>강의 설정</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('addcourse');
              }}>
              <Ionicons name="add-circle-outline" style={styles.addIcon} />
            </TouchableOpacity>
          </View>
          <MapCourseTable navigation={navigation} courses={courses} />
          <Text style={styles.subtitle}>문의하기</Text>
          <View style={styles.margin1}>
            <TouchableOpacity
              style={{...styles.btn, ...styles.row1}}
              onPress={() => navigation.navigate('help')}>
              <Text style={{...styles.text, alignSelf: 'center'}}>
                자주 묻는 질문
              </Text>
              <Entypo name={'chevron-thin-right'} style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.margin1}>
            <TouchableOpacity
              style={{...styles.btn, ...styles.row1}}
              onPress={() => navigation.navigate('credit')}>
              <Text style={{...styles.text, alignSelf: 'center'}}>
                만든 사람
              </Text>
              <Entypo name={'chevron-thin-right'} style={styles.chevronIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.margin2}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ['취소', '강의 초기화하기'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                    title: `저장된 데이터가 모두 삭제됩니다.\n강의 정보를 삭제하시겠습니까?`,
                  },
                  buttonIndex => {
                    if (buttonIndex === 1) {
                      removeCourses();
                    }
                  },
                );
              }}>
              <Text style={{...styles.text, color: '#eb5828'}}>
                모든 강의 정보 초기화
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.margin3}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => {
                ActionSheetIOS.showActionSheetWithOptions(
                  {
                    options: ['취소', '계정 삭제하기'],
                    destructiveButtonIndex: 1,
                    cancelButtonIndex: 0,
                    title: `저장된 데이터가 모두 삭제됩니다.\n계정을 삭제하시겠습니까?`,
                  },
                  buttonIndex => {
                    if (buttonIndex === 1) {
                      removeStudent()
                        .then(() => removeCourses())
                        .then(() => RNExitApp.exitApp());
                    }
                  },
                );
              }}>
              <Text style={{...styles.text, color: '#eb5828'}}>
                계정 삭제하기
              </Text>
            </TouchableOpacity>
            <Text style={styles.deleteText}>
              기기에 있는 사용자의 데이터는 서버에 저장되지 않으며, 계정 삭제 시
              등록한 정보가 모두 초기화 된 후 강제종료 됩니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f3f6',
    height: '100%',
    //height: height * 760,
  },
  subtitle: {
    marginLeft: width * 16,
    marginTop: height * 18,
    fontSize: scale * 20,
    fontWeight: 'bold',
  },
  row1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addIcon: {
    fontSize: scale * 20,
    color: '#007aff',
    marginRight: width * 26,
    marginTop: height * 21,
  },
  margin1: {
    marginTop: height * 15,
  },
  margin2: {
    marginTop: height * 44,
  },
  margin3: {
    marginTop: height * 14,
  },
  btn: {
    backgroundColor: '#ffffff',
    marginHorizontal: width * 16,
    height: height * 44,
    borderRadius: 14,
    justifyContent: 'center',
  },
  text: {
    fontSize: scale * 17,
    marginLeft: width * 16,
    justifyContent: 'center',
  },
  chevronIcon: {
    color: '#c4c4c6',
    fontSize: scale * 16,
    alignSelf: 'center',
    marginRight: width * 16,
  },
  deleteText: {
    marginLeft: width * 25,
    marginRight: width * 34,
    marginBottom: height * 40,
    marginVertical: height * 8,
    fontSize: scale * 10,
    color: '#86858c',
  },
});

export default ProfileScreen;
