import React from "react";
import { View, Text } from "react-native";
import { Icon } from "UIcon";
import Kit from "../kit";

export default class index extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          height: Kit.Height - 100,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Icon name={"myIcon|icon-helpless"} size={46} color={"dimgray"} />
        <Text style={{ fontSize: 14, color: "dimgray", marginTop: 5 }}>
          暂无数据
        </Text>
      </View>
    );
  }
}
