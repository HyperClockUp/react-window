import App from '../index';
import React from 'react';
import * as Type from '../../interfaces/type';
import './index.scss';
import icon from '../../assets/images/browser.png';

const config: Type.IApp = {
  title: '浏览器',
  icon: icon,
  windowAction: ['close', 'max', 'min'],
  taskAction: {
    close: () => {}
  },
  iconAction: {
    open: () => {}
  }
};
const BrowserApp = new App(config);

interface IProps {}

interface IState {
  url: string | undefined;
}

class Browser extends React.PureComponent<IProps, IState> {
  addressInput: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    this.state = {
      url: ''
    };
    this.addressInput = React.createRef();
  }

  setUrl = () => {
    const dom = this.addressInput.current;
    if (dom) {
      this.setState({
        url: dom.value
      });
    }
  };
  render() {
    return (
      <div className="browser">
        <div className="navigator">
          <input
            type="text"
            name="url"
            id="address"
            placeholder="请输入网址"
            ref={this.addressInput}
          />
          <button id="enter" onClick={this.setUrl}>
                    转到
          </button>
        </div>
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

BrowserApp.setComponent(<Browser />);

export default BrowserApp;
