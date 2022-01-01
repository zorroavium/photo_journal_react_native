import React from 'react';
import CustomTitle from '../components/customTitle';

class Splash extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.navigate();
  }

  navigate = async () => {
    try {
      this.props.navigation.navigate('Home');
    } catch (error) {
      // Error retrieving data
    }
  };

  render() {
    return <CustomTitle text1="pic" text2="a" text3="day" />;
  }
}

export default Splash;
