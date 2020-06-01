import * as React from "react"
import "./index.scss"
import * as Type from '../../interfaces/type'
import winLogo from "../../images/Windows.svg"

interface IProps {
    size: "small" | "large" | "middle"
    title?: string,
    taskList:Array<Type.ITask>
}

interface IState extends IProps {
    time:Date,
}

class TaskBar extends React.PureComponent<IProps, IState> {
    timer:any;
    constructor(props: IProps) {
        super(props);
        this.state = {
            ...props,
            time:new Date()
        }
    }
    componentDidMount = () =>{
        this.timer = setInterval(()=>{
            this.setState({
                time:new Date()
            })
        },1000);
    }

    static getDerivedStateFromProps = (nextProps:IProps, prevState:IProps)=>{
        return nextProps;
    }

    componentWillUnmount = () =>{
        clearInterval(this.timer);
    }
    render = () => {
        return (
            <div className={this.getClsName()}>
                <button className="window-btn">
                    <img
                        className="win-logo"
                        src={winLogo}
                        alt="windows logo"></img>
                </button>
                {this.createTaskItem()}
                <div className="window-time">
                    <p>{this.getTime()}</p>
                    <p>{this.getDate()}</p>
                </div>
            </div>
        )
    }

    createTaskItem = ():Array<JSX.Element>=>{
        return this.state.taskList.map((item,index)=>{
            return (
                <div className='task-item' key={index} onClick ={e=>{
                    if(item.windowState==='normal'||item.windowState==='max'){
                        item.action.min(e);
                    }else{
                        item.action.normal(e);
                    }
                }}>
                    <img className='icon' src={item.icon} alt={item.title} />
                    <span className='title'>{item.title}</span>
                </div>
            )
        })
    }
    getClsName = (): string => {
        let clsList: Array<string> = ["task-bar"]
        clsList.push(this.props.size)
        return clsList.join(" ")
    }

    getTime = (): string => {
        let h = this.state.time.getHours();
        let m:number|string = this.state.time.getMinutes();
        let s:number|string = this.state.time.getSeconds();
        if(m<10){
            m = '0' + m;
        }
        if(s<10){
            s = '0' + s;
        }
        return `${h}:${m}:${s}`
    }
    getDate = (): string => {
        return `${this.state.time.getFullYear()}/${this.state.time.getMonth() + 1}/${this.state.time.getDate()}`
    }
}

export default TaskBar
