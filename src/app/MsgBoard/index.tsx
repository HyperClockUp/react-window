import App from '../index'
import React from 'react'
import * as Type from '../../interfaces/type'
import './index.scss'
import icon from "../../images/msgBoard.png"

let config:Type.IApp = {
    title:'留言板',
    icon:icon,
    windowAction:['close','max','min'],
    taskAction:{
        close:()=>{}
    },
    iconAction:{
        open:()=>{}
    }
}
let MsgBoardApp = new App(config);

interface IProps{

}

interface IState{
    msg:string
}


class MsgBoard extends React.PureComponent<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state = {
            msg:'测试'
        }
    }

    render(){
        return (
            <div className='msg-board'>
                {this.state.msg}
            </div>
        )
    }
}


MsgBoardApp.setComponent(<MsgBoard/>)

export default MsgBoardApp;

