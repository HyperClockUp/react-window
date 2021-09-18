import React from 'react';
import App from '../index';
import * as Type from '../../interfaces/type';
import './index.scss';
import icon from '../../assets/images/pc.png';
import { getOsInfo, getBrowser } from '../../utils/windowsTool';

const config: Type.IApp = {
  title: '此电脑',
  icon: icon,
  windowAction: ['close', 'max', 'min'],
  taskAction: {
    close: () => {}
  },
  iconAction: {
    open: () => {}
  }
};
const PCApp = new App(config);

interface IProps {}

interface IState {
  systemVersion: {
    name: string;
    version: string;
    digit: string;
  };
  browserVersion: {
    name: string;
    version: string;
  };
}

class PC extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      systemVersion: {
        name: '',
        version: '',
        digit: ''
      },
      browserVersion: {
        name: '',
        version: ''
      }
    };
  }

  componentDidMount = () => {
    this.setState({
      systemVersion: getOsInfo(),
      browserVersion: getBrowser()
    });
  };

  render() {
    return (
      <div className="PC">
        <div className="tip">查看有关计算机的基本信息</div>
        <p>
          <span>系统版本:</span>
          <span>{this.state.systemVersion.version}</span>|
          <span>{this.state.systemVersion.digit} 位</span>
        </p>
        <p>
          <span>浏览器版本:</span>
          <span>{this.state.browserVersion.name}</span>|
          <span>{this.state.browserVersion.version}</span>
        </p>
      </div>
    );
  }
}

PCApp.setComponent(<PC />);

export default PCApp;
