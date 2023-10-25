import '../styles/Card.css';
import '../styles/Background.css';
import '../styles/LetItRide.css';

import { Component } from 'react';

class MyApp extends Component {
  render() {
    const { Component, pageProps } = this.props;

    return <Component {...pageProps} />;
  }
}

export default MyApp;
