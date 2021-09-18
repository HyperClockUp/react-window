import React from 'react';
import './index.scss';

interface IProps {}

interface IState extends IProps {
  display: 'block' | 'none';
  loading: boolean;
}

class Welcome extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      display: 'block',
      loading: false
    };
  }
  hideWelcome = (): void => {
    this.setState({
      display: 'none'
    });
  };
  login = (): void => {
    this.setState({
      loading: true
    });
  };

  createLoading = (): JSX.Element => {
    setTimeout(() => {
      this.hideWelcome();
    }, 2000);
    return <div className="loading">loading</div>;
  };

  createLogin = (): JSX.Element => {
    return (
      <div className="login-area">
        <span className="user-name">Administrator</span>
        <button className="login-btn" onClick={this.login}>
          登录
        </button>
      </div>
    );
  };
  render() {
    return (
      <div
        className="welcome"
        style={{
          display: this.state.display
        }}
      >
        {this.state.loading ? this.createLoading() : this.createLogin()}
      </div>
    );
  }
}

export default Welcome;
