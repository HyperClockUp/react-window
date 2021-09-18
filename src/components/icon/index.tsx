import React from 'react';
import * as Type from '../../interfaces/type';
import './index.scss';

interface IProps {
    icon: Type.IIcon
}

type IState = Type.IIcon

class Icon extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...this.props.icon
    };

  }
  render() {
    return (
      <div className="icon">
        <img
          className="icon-image"
          src={this.state.icon}
          alt={this.state.title}
        />
        <p className="icon-title">{this.state.title}</p>
      </div>
    );
  }
}


export default Icon;
