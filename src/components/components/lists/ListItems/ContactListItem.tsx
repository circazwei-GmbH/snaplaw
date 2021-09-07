import React from 'react'
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ListItemProps} from "./list-item-type";
import { Entypo } from '@expo/vector-icons';

export default function ContractListItem({item}: ListItemProps) {
  const showActionsHandler = () => {
    console.log('yay')
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.type}>{item.type}</Text>
        <Text style={styles.date}>{item.createdAt}</Text>
      </View>
      <TouchableOpacity onPress={showActionsHandler}>
        <Entypo name="dots-three-vertical" size={16} color="#668395" />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 7,
    paddingVertical: 7,
    paddingHorizontal: 16,
    backgroundColor: '#F8FCFF',
    elevation: 1,
    shadowColor: "rgba(196, 211, 220, 0.6)",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 3
  },
  title: {
    fontFamily: 'P',
    fontSize: 17,
    color: '#202020'
  },
  type: {
    fontFamily: 'P',
    paddingTop: 3,
    fontSize: 12,
    color: '#202020'
  },
  date: {
    fontFamily: 'P',
    fontSize: 11,
    color: '#909090'
  }
})