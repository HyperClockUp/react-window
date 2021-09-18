import React from 'react';
import Icon from '../Icon';
import ContextMenuHandle from '../../context/menu';
import './index.scss';
import * as Type from '../../interfaces/type';
import RemoteComponent from '../RemoteComponent';

const componentStr = `function Inner(props) { return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement("div", null, (props === null || props === void 0 ? void 0 : props.content) || "没渲染"); }
`;
interface TestProps {
  content: string;
}
// const NativeComponent = RemoteComponent<TestProps>(componentStr);

interface IProps {
  iconList: Array<Type.IIcon>;
  openApplication: Type.Func;
  bgUrl: string;
}

interface IState extends IProps {
  selectionShow: boolean;
  selectionStyle: {
    left: string;
    top: string;
    startX: string;
    startY: string;
    width: string;
    height: string;
  };
}
class Desktop extends React.Component<IProps, IState> {
  iconList: unknown;
  constructor(props: IProps) {
    super(props);
    this.state = {
      ...props,
      bgUrl: this.props.bgUrl || '',
      selectionShow: false,
      selectionStyle: {
        left: '0px',
        top: '0px',
        startX: '0px',
        startY: '0px',
        width: '0px',
        height: '0px'
      }
    };
    this.iconList = React.createRef();
  }

  static getDerivedStateFromProps = (nextProps: IProps, prevState: IProps) => {
    return nextProps;
  };

  render = () => {
    return (
      <div
        className="desktop"
        style={{ backgroundImage: `url(${this.state.bgUrl})` }}
        onMouseDown={this.handleMouseDown}
        onMouseUp={this.handleMouseUp}
        onMouseMove={this.handleMouseMove}
      >
        {/* <NativeComponent content="测试内容"></NativeComponent> */}
        {this.createSelection()}
        <ul className="icon-list" ref={this.iconList}>
          {this.createIcons()}
        </ul>
      </div>
    );
  };

  createIcons = (): Array<JSX.Element> => {
    return this.state.iconList.map((item, index) => {
      return (
        <li
          className="icon-item"
          key={index}
          onDoubleClick={e => {
            this.props.openApplication(item.app);
          }}
          onContextMenu={e => {
            const icon: Type.IContext = {
              type: 'icon',
              info: item.title
            };
            this.context(e, icon);
          }}
          title={item.title}
        >
          <Icon icon={item}></Icon>
        </li>
      );
    });
  };

  createSelection = (): JSX.Element | void => {
    if (!this.state.selectionShow) {
      return;
    }
    return <div className="selection" style={this.state.selectionStyle}></div>;
  };

  handleMouseDown: React.MouseEventHandler = (event): void => {
    // 0 左键 1 中键 2右键
    switch (event.button) {
    case 0:
      this.setState({
        selectionStyle: {
          left: event.clientX + 'px',
          top: event.clientY + 'px',
          startX: event.clientX + 'px',
          startY: event.clientY + 'px',
          width: this.state.selectionStyle.width,
          height: this.state.selectionStyle.height
        },
        selectionShow: true
      });
      break;
    default:
    }
  };
  handleMouseUp: React.MouseEventHandler = (event): void => {
    const selectLeft: number = parseFloat(this.state.selectionStyle.left);
    const selectTop: number = parseFloat(this.state.selectionStyle.top);
    const selectRight: number = selectLeft + parseFloat(this.state.selectionStyle.width);
    const selectBottom: number = selectTop + parseFloat(this.state.selectionStyle.height);
    const iconList = this.iconList.current.children;
    for (const icon of iconList) {
      if (
        icon.offsetLeft >= selectLeft &&
        icon.offsetTop >= selectTop &&
        icon.offsetLeft + icon.offsetWidth <= selectRight &&
        icon.offsetTop + icon.offsetHeight <= selectBottom
      ) {
        icon.classList.add('active');
      } else {
        icon.classList.remove('active');
      }
    }
    this.setState({
      selectionShow: false,
      selectionStyle: {
        ...this.state.selectionStyle,
        width: '0px',
        height: '0px'
      }
    });
  };
  handleMouseMove: React.MouseEventHandler = (event): void => {
    if (!this.state.selectionShow) {
      return;
    }
    const startX = parseFloat(this.state.selectionStyle.startX);
    const startY = parseFloat(this.state.selectionStyle.startY);
    const w: number = event.clientX - startX;
    const h: number = event.clientY - startY;
    const left = w > 0 ? startX : startX + w;
    const top = h > 0 ? startY : startY + h;
    this.setState({
      selectionStyle: {
        ...this.state.selectionStyle,
        left: left + 'px',
        top: top + 'px',
        width: Math.abs(w) + 'px',
        height: Math.abs(h) + 'px'
      }
    });
  };
}
Desktop.contextType = ContextMenuHandle;
export default Desktop;
