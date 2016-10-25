import 'aframe';
import 'aframe-animation-component';
import 'aframe-text-component';
import { Entity, Scene } from 'aframe-react';
import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import RaisedButton from 'material-ui/RaisedButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import Camera from './Camera';
import Text from './Text';
import Sky from './Sky';
import Image from './Image';

injectTapEventPlugin();

const testImages = [
  'https://s3-us-west-2.amazonaws.com/s.cdpn.io/336999/me.jpg'
];

class PhodomeScene extends React.Component {
  constructor() {
    super();
    this.state = {
      color: 'red',
      images: testImages
    };
  }

  changeColor() {
    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];
    this.setState({
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  render () {
    return (
      <Scene>
        <Camera>
          <a-cursor
            animation__click="property: scale; startEvents: click; from: 0.1 0.1 0.1; to: 1 1 1; dur: 150">
          </a-cursor>
        </Camera>

        <Sky color="#000"/>

        {
          this.state.images.map((imageUrl, index) => (
            <Image
              key={index}
              src={imageUrl}
              position={`0 -0.5 ${-3 + (-3 * index)}`}
            />
          ))
        }

        <Text
          text='Welcome to Phodome!'
          color='#DADADA'
          position='-1.75 1 -3'/>

        <Entity light={{type: 'ambient', color: '#888'}}/>
        <Entity light={{type: 'directional', intensity: 0.5}} position='-1 1 0'/>
        <Entity light={{type: 'directional', intensity: 1}} position='1 1 0'/>

      </Scene>
    );
  }
}

export default PhodomeScene;
