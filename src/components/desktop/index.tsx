import React from "react"
import Icon from "../icon"
import ContextMenuHandle from "../../context/menu"
import "./index.scss"
import * as Type from "../../interfaces/type"

interface IProps {
    iconList: Array<Type.IIcon>
    openApplication:Function
    bgUrl: string
}

interface IState extends IProps {
    selectionShow: boolean
    selectionStyle: {
        left: string,
        top: string,
        startX:string,
        startY:string,
        width:string,
        height:string
    }
}
class Desktop extends React.Component<IProps, IState> {
    iconList:any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            ...props,
            bgUrl: this.props.bgUrl || "",
            selectionShow: false,
            selectionStyle: {
                left: "0px",
                top: "0px",
                startX:'0px',
                startY:'0px',
                width:'0px',
                height:'0px'
            },
        }
        this.iconList = React.createRef();
    }

    static getDerivedStateFromProps = (nextProps:IProps, prevState:IProps)=>{
        return nextProps;
    }

    render = () => {
        return (
            <div
                className="desktop"
                style={{ backgroundImage: `url(${this.state.bgUrl})` }}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
                onMouseMove={this.handleMouseMove}>
                {this.createSelection()}
                <ul className="icon-list"
                ref={this.iconList}
                >{this.createIcons()}</ul>
            </div>
        )
    }

    createIcons = (): Array<JSX.Element> => {
        return this.state.iconList.map((item, index) => {
            return (
                <li
                    className="icon-item"
                    key={index}
                    onDoubleClick = {e=>{
                        this.props.openApplication(item.app)
                    }}
                    onContextMenu={e => {
                        let icon: Type.IContext = {
                            type: "icon",
                            info: item.title
                        }
                        this.context(e, icon)
                    }}
                    title={item.title}
                    >
                    <Icon icon={item}></Icon>
                </li>
            )
        })
    }

    createSelection = (): JSX.Element|void => {
        if(!this.state.selectionShow){
            return ;
        }
        return (
            <div className="selection" style={this.state.selectionStyle}></div>
        )
    }

    handleMouseDown: React.MouseEventHandler = (event): void => {
        this.setState({
            selectionStyle: {
                left: event.clientX + "px",
                top: event.clientY + "px",
                startX: event.clientX + "px",
                startY:event.clientY + "px",
                width:this.state.selectionStyle.width,
                height:this.state.selectionStyle.height
            },
            selectionShow:true
        })
    }
    handleMouseUp: React.MouseEventHandler = (event): void => {
        let selectLeft:number = parseFloat(this.state.selectionStyle.left);
        let selectTop:number = parseFloat(this.state.selectionStyle.top);
        let selectRight:number = selectLeft + parseFloat(this.state.selectionStyle.width);
        let selectBottom:number = selectTop + parseFloat(this.state.selectionStyle.height);
        let iconList = this.iconList.current.children;
        for(let icon of iconList){
            if(icon.offsetLeft>=selectLeft&&icon.offsetTop>=selectTop&&icon.offsetLeft+icon.offsetWidth <= selectRight && icon.offsetTop+icon.offsetHeight <= selectBottom){
                icon.classList.add('active');
            }else{
                icon.classList.remove('active');
            }
        }
        this.setState({
            selectionShow:false,
            selectionStyle:{
                ...this.state.selectionStyle,
                width:'0px',
                height:'0px'
            }
        });
    }
    handleMouseMove: React.MouseEventHandler = (event): void => {
        if(!this.state.selectionShow){
            return ;
        }
        let left:number = Math.min.apply(null,[parseFloat(this.state.selectionStyle.left),event.clientX]);
        let top:number =  Math.min.apply(null,[parseFloat(this.state.selectionStyle.top),event.clientY]);
        let w:number = Math.abs(event.clientX - parseFloat(this.state.selectionStyle.startX))
        let h:number = Math.abs(event.clientY - parseFloat(this.state.selectionStyle.startY))
        this.setState({
            selectionStyle: {
                ...this.state.selectionStyle,
                left: left + "px",
                top: top + "px",
                width:Math.abs(w)+'px',
                height:Math.abs(h)+'px'
            },
        })
    }
}
Desktop.contextType = ContextMenuHandle
export default Desktop
