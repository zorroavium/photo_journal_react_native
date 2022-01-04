import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

class CustomTitle extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={this.props.hasNavigationArrow ? styles.containerWithoutFlex : styles.container}>
        <Text style={styles.label}>
          {this.props.text1 && (
            <Text style={styles.titleText1}>{this.props.text1}</Text>
          )}
          {this.props.text2 && (
            <Text style={styles.titleText2}>{this.props.text2}</Text>
          )}
          {this.props.text3 && (
            <Text style={styles.titleText3}>{this.props.text3}</Text>
          )}
        </Text>
      </View>
    );
  }
}

export default CustomTitle;

const styles = StyleSheet.create({

  containerWithoutFlex: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    height: 80
  },
  container: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: 80
  },
  label: {
    
  },
  titleText1: {
    fontSize: 30,
    color: '#6c6c6c',
    fontFamily: 'Inter-Bold',
  },
  titleText2: {
    fontSize: 30,
    color: '#6c6c6c',
    fontFamily: 'Inter-Regular',
  },
  titleText3: {
    fontSize: 30,
    color: '#00e3ba',
    fontFamily: 'Inter-SemiBold',
  },
});
