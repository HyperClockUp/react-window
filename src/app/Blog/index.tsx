import React from 'react';
import App from '../index';
import * as Type from '../../interfaces/type';
import './index.scss';
import icon from '../../assets/images/diary.png';

const config: Type.IApp = {
  title: '博客',
  icon: icon,
  windowAction: ['close', 'max', 'min'],
  taskAction: {
    close: () => {}
  },
  iconAction: {
    open: () => {}
  }
};
const BlogApp = new App(config);

interface IProps {}

interface IState {
  url: string | undefined;
}

class Blog extends React.PureComponent<IProps, IState> {
  addressInput: React.RefObject<HTMLInputElement>;
  constructor(props: IProps) {
    super(props);
    const { protocol, hostname } = window.location;
    const port = 1001;
    this.state = {
      url: `${protocol}//${hostname}:${port}`
    };
    this.addressInput = React.createRef();
  }
  render() {
    return (
      <div className="blog">
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

BlogApp.setComponent(<Blog />);

export default BlogApp;
