import App from '../index';
import React from 'react';
import * as Type from '../../interfaces/type';
import './index.scss';
import icon from '../../assets/images/site.png';

const config: Type.IApp = {
  title: '旧站',
  icon: icon,
  windowAction: ['close', 'max', 'min'],
  taskAction: {
    close: () => {}
  },
  iconAction: {
    open: () => {}
  }
};
const SiteApp = new App(config);

interface IProps {}

interface IState {
  url: string | undefined;
}

class Site extends React.PureComponent<IProps, IState> {
  addressInput: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      url: 'http://120.79.138.49:81'
    };
    this.addressInput = React.createRef();
  }
  render() {
    return (
      <div className="site">
        <iframe
          src={this.state.url}
          name="main"
          id="frame"
          title="frame"
        ></iframe>
      </div>
    );
  }
}

SiteApp.setComponent(<Site />);

export default SiteApp;
