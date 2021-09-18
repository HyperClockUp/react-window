import * as React from 'react';
import './index.scss';
import * as Type from '../../interfaces/type';
import winLogo from '../../assets/images/Windows.svg';
import windowsController from '../../../windowsController';

interface IProps {
  size: 'small' | 'large' | 'middle';
  active?: boolean;
  title?: string;
  taskList: Array<Type.ITask>;
}

interface IState extends IProps {
  time: Date;
}

class TaskBar extends React.PureComponent<IProps, IState> {
  timer = -1;
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...props,
      time: new Date()
    };
  }
  componentDidMount = () => {
    this.timer = window.setInterval(() => {
      this.setState({
        time: new Date()
      });
    }, 1000);
  };

  static getDerivedStateFromProps = (nextProps: IProps, prevState: IProps) => {
    return nextProps;
  };

  componentWillUnmount = () => {
    window.clearInterval(this.timer);
  };
  render = () => {
    return (
      <div className={this.getClsName()}>
        <button className="window-btn">
          <img className="win-logo" src={winLogo} alt="windows logo"></img>
        </button>
        {this.createTaskItem()}
        <div className="window-time">
          <p>{this.getTime()}</p>
          <p>{this.getDate()}</p>
        </div>
      </div>
    );
  };

  isActive = (app: string): boolean => {
    const maxZIndex = Math.max.apply(
      null,
      windowsController.applicationStateList.map(item => item.zIndex)
    );
    const state = windowsController.getApplicationState(app);

    const curZIndex = state.zIndex;
    const winState = state.windowState;
    return maxZIndex === curZIndex && winState !== 'min';
  };

  createTaskItem = (): Array<JSX.Element> => {
    return this.state.taskList.map((item, index) => {
      return (
        <div
          className={[this.isActive(item.app) ? 'active' : '', 'task-item'].join(' ')}
          key={index}
          onClick={e => {
            if (item.windowState === 'normal' || item.windowState === 'max') {
              const isTop = windowsController.checkIsTopApplication(item.app);
              if (isTop) {
                item.action.min(e);
              } else {
                windowsController.toppingApplication(item.app);
              }
            } else {
              item.action.normal(e);
            }
          }}
        >
          <img className="icon" src={item.icon} alt={item.title} />
          <span className="title">{item.title}</span>
        </div>
      );
    });
  };
  getClsName = (): string => {
    const clsList: Array<string> = ['task-bar'];
    clsList.push(this.props.size);
    return clsList.join(' ');
  };

  getTime = (): string => {
    const h = this.state.time.getHours();
    let m: number | string = this.state.time.getMinutes();
    let s: number | string = this.state.time.getSeconds();
    if (m < 10) {
      m = '0' + m;
    }
    if (s < 10) {
      s = '0' + s;
    }
    return `${h}:${m}:${s}`;
  };
  getDate = (): string => {
    return `${this.state.time.getFullYear()}/${
      this.state.time.getMonth() + 1
    }/${this.state.time.getDate()}`;
  };
}

export default TaskBar;
