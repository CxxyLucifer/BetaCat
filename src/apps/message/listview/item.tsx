import React, { PureComponent } from "react";
import { View } from "react-native";
import {
  Button,
  ListItem,
  Left,
  Right,
  Body,
  Thumbnail,
  Text,
  Icon
} from "native-base";
import styles from "./styles";

const MyButton: any = Button;
const logo = require("../../../img/default-portrait.png");

export default class Example extends PureComponent<any, any> {
  constructor(props) {
    super(props);
  }

  render() {
    const rowID = this.props.index;
    const rowData = this.props.item;

    return (
      <ListItem style={{ backgroundColor: "white" }} thumbnail>
        <Left>
          <Thumbnail square source={logo} style={styles.thumb} />
        </Left>
        <Body style={{ borderBottomWidth: 0 }}>
          <Text>RowID: {rowID}</Text>
          <Text note>Data: {rowData}</Text>
        </Body>
        <Right style={{ borderBottomWidth: 0 }}>
          <View style={styles.rightBtnGroup}>
            <MyButton
              small
              transparent
              title="view"
              onPress={() => this.props.onPress("chat", rowID, rowData)}
              style={styles.rightBtn}
            >
              <Icon name="chatbubbles" style={styles.rightBtnIcon} />
            </MyButton>
            <MyButton
              small
              transparent
              title="view"
              onPress={() => this.props.onPress("like", rowID, rowData)}
              style={styles.rightBtn}
            >
              <Icon name="heart" style={styles.rightBtnIcon} />
            </MyButton>
            <MyButton
              small
              transparent
              title="view"
              onPress={() => this.props.onPress("share", rowID, rowData)}
              style={styles.rightBtn}
            >
              <Icon name="share" style={styles.rightBtnIcon} />
            </MyButton>
          </View>
        </Right>
      </ListItem>
    );
  }
}
