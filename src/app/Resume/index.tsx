import App from '../index';
import React from 'react';
import * as Type from '../../interfaces/type';
import './index.scss';
import icon from '../../assets/images/resume.png';

const config: Type.IApp = {
  title: '简历',
  icon: icon,
  windowAction: ['close', 'max', 'min'],
  taskAction: {
    close: () => {}
  },
  iconAction: {
    open: () => {}
  }
};
const ResumeApp = new App(config);

interface IProps {}

interface IState {
  url: string | undefined;
}

class Resume extends React.PureComponent<IProps, IState> {
  addressInput: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      url: process.env.PUBLIC_URL + '/resume.pdf'
    };
    this.addressInput = React.createRef();
  }
  render() {
    return (
      <div className="resume">
        <iframe src={this.state.url} name="main" id="frame" title="frame"></iframe>
      </div>
    );
  }
}

ResumeApp.setComponent(<Resume />);

export default ResumeApp;
