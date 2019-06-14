import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
  Animated
} from "react-native";
import { Icon } from "UIcon";

const cardHeight = 180,
  marginBottom = 14;
const data = [
  {
    title: "当月订单",
    value: 7511.48,
    unit: "万",
    compareValue: 8860.3,
    compareUnit: "万",
    chainratio: "-7%"
  },
  {
    title: "当月回款",
    value: 505.99,
    unit: "万",
    compareValue: 320.6,
    compareUnit: "万",
    chainratio: "+12%"
  },
  {
    title: "交付时长",
    value: 127,
    unit: "天",
    compareValue: 100,
    compareUnit: "天",
    chainratio: "-2.6%"
  },
  {
    title: "超期10天",
    value: 76,
    unit: "单",
    compareValue: 880,
    compareUnit: "单",
    chainratio: "+4.2%"
  },
  {
    title: "总方案数",
    value: 2900,
    unit: "个",
    compareValue: 2890,
    compareUnit: "个",
    chainratio: "+0.1%"
  },
  {
    title: "客户满意度",
    value: 97.3,
    unit: "分",
    compareValue: 90,
    compareUnit: "分",
    chainratio: "+8.1%"
  }
];

export default class Summary extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showMore: false,
      animation: new Animated.Value(this._getInitValue())
    };
  }

  render() {
    const { showMore } = this.state;

    return (
      <Animated.View
        style={[styles.container, , { height: this.state.animation }]}
      >
        <View style={styles.summaryTitle}>
          <View style={[styles.summaryItem, { justifyContent: "flex-start" }]}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 18,
                fontFamily: "PingFangSC-Semibold"
              }}
            >
              关注数据
            </Text>
          </View>
          {data.length > 4 ? (
            <TouchableOpacity
              onPress={this._more}
              style={[styles.summaryItem, { justifyContent: "flex-end" }]}
            >
              <Text style={{ marginRight: 10, fontSize: 14, color: "#003FFF" }}>
                {showMore ? "收起更多" : "展开更多"}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View style={styles.content}>{this._renderFacusData()}</View>
      </Animated.View>
    );
  }

  _more = () => {
    const { showMore } = this.state;
    let rows = Math.ceil((data.length - 1) / 2) + 1;
    if (showMore) {
      rows = 2;
    }
    const height = (cardHeight + marginBottom) * rows + 60;
    // console.log('====== height:', height)
    this.setState({ showMore: !showMore });
    // this.state.animation.setValue(height);
    Animated.timing(this.state.animation, {
      toValue: height,
      duration: 500
    }).start();
  };

  _renderFacusData = () => {
    const { showMore } = this.state;

    let views = new Array();
    data.map((v, k) => {
      const { title, value, unit, compareValue, compareUnit, chainratio } = v;
      let iconName = "myIcon|icon-xiahua";
      let color = "#02cce9";
      if (chainratio.indexOf("+") != -1) {
        iconName = "myIcon|icon-shangzhang";
        color = "red";
      }
      let max = 4;
      if (showMore) {
        max = data.length;
      }
      if (k < max) {
        views.push(
          <View key={k} style={styles.card}>
            <View style={styles.cardTitle}>
              <Text style={{ fontSize: 14, fontFamily: "PingFangSC-Semibold" }}>
                {title}
              </Text>
            </View>
            <View style={styles.cardContent}>
              <Text
                style={{
                  fontSize: 28,
                  fontFamily: "PingFangSC-Semibold",
                  color: "#0559ff"
                }}
              >
                {value}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  color: "#90b8ff",
                  marginTop: 6,
                  fontFamily: "PingFangSC-Regular"
                }}
              >
                {unit}
              </Text>
            </View>
            <View style={styles.compare}>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  paddingTop: 5
                }}
              >
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "PingFangSC-Regular",
                    color: "#333333"
                  }}
                >
                  上月
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    marginLeft: 5,
                    fontFamily: "PingFangSC-Regular",
                    color: "#333333"
                  }}
                >
                  {compareValue}
                  {compareUnit}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 15,
                  paddingBottom: 5
                }}
              >
                <Text
                  style={{ fontSize: 12, fontFamily: "PingFangSC-Regular" }}
                >
                  环比
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    fontFamily: "PingFangSC-Regular",
                    marginLeft: 5,
                    marginRight: 1,
                    color
                  }}
                >
                  {chainratio}
                </Text>
                <Icon name={iconName} size={15} color={color} />
              </View>
            </View>
          </View>
        );
      }
    });
    return views;
  };

  _getInitValue = () => {
    let initHeight = 0;
    const rows = Math.ceil((data.length - 1) / 2) + 1;
    if (data.length <= 4) {
      initHeight = (cardHeight + marginBottom) * rows + 60;
    } else {
      initHeight = (cardHeight + marginBottom) * 2 + 60;
    }
    return initHeight;
  };
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5
  } as ViewStyle,
  summaryTitle: {
    height: 50,
    flexDirection: "row"
  } as ViewStyle,
  summaryItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center"
  } as ViewStyle,
  content: {
    flexWrap: "wrap",
    flexDirection: "row"
  } as ViewStyle,
  card: {
    width: "46%",
    height: cardHeight,
    marginLeft: "2%",
    marginRight: "2%",
    marginBottom: marginBottom,
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "grey",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    elevation: 4
  } as ViewStyle,
  cardTitle: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: "flex-end"
  } as ViewStyle,
  cardContent: {
    flex: 2,
    paddingLeft: 15,
    flexDirection: "row",
    alignItems: "center"
  } as ViewStyle,
  compare: {
    height: 55,
    width: "100%",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: "#f9f9f9"
  } as ViewStyle
});
