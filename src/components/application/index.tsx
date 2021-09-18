import React from 'react';
import * as Type from '../../interfaces/type';

import './index.scss';

interface IProps {
  windowInfo: Type.IApplication;
  body: JSX.Element | null;
}

interface IState extends Type.IApplication {
  startX: number | never;
  startY: number | never;
  startXDis: number;
  startYDis: number;
}
export class Application extends React.PureComponent<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const state: IState = {
      ...props.windowInfo,
      startX: NaN,
      startY: NaN,
      startXDis: 0,
      startYDis: 0
    };
    this.state = state;
  }

  getHeaderButtons = (): Array<JSX.Element> => {
    const buttons: Array<JSX.Element> = [];
    if (this.state.windowAction.includes('min')) {
      buttons.push(
        <button className="min" key="min" onClick={this.state.action.min}>
          _
        </button>
      );
    }
    if (this.state.windowAction.includes('max')) {
      buttons.push(
        <button className="max" key="max" onClick={this.state.action.max}>
          □
        </button>
      );
    }
    if (this.state.windowAction.includes('close')) {
      buttons.push(
        <button className="close" key="close" onClick={this.state.action.close}>
          ×
        </button>
      );
    }

    return buttons;
  };

  static getDerivedStateFromProps = (nextProps: IProps, prevState: IProps) => {
    return {
      windowState: nextProps.windowInfo.windowState,
      zIndex: nextProps.windowInfo.zIndex
    };
  };

  handleMouseDown = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    if (event.target !== event.currentTarget) {
      return;
    }
    this.setState({
      startX: event.clientX,
      startY: event.clientY,
      startXDis: event.clientX - parseFloat(this.state.left),
      startYDis: event.clientY - parseFloat(this.state.top)
    });
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  };
  handleMouseMove = (event: MouseEvent): unknown => {
    const { startX, startY, startXDis, startYDis } = this.state;
    const curX: number = event.clientX;
    const curY: number = event.clientY;
    if (isNaN(startX) && isNaN(startY)) {
      return;
    }
    this.setState({
      left: curX - startXDis + 'px',
      top: curY - startYDis + 'px'
    });
  };
  handleMouseUp = (event: MouseEvent): unknown => {
    this.setState({
      startX: NaN,
      startY: NaN
    });
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  };

  render() {
    return (
      <div
        className={['application', `window-${this.state.windowState}`].join(' ')}
        style={{
          left: this.state.left,
          top: this.state.top,
          zIndex: this.state.zIndex
        }}
        onMouseDown={this.state.action.top}
      >
        <header className="header" onMouseDown={this.handleMouseDown}>
          <img className="icon" src={this.state.icon} alt="" />
          <span className="title">{this.state.title}</span>
          <div className="buttons">{this.getHeaderButtons()}</div>
        </header>
        <section className="body">{this.props.body}</section>
        <footer className="footer">{this.state.title}</footer>
      </div>
    );
  }
}
