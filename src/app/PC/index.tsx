import App from '../index'
import React from 'react'
import * as Type from '../../interfaces/type'
import './index.scss'
import icon from "../../images/pc.png"

let config:Type.IApp = {
    title:'此电脑',
    icon:icon,
    windowAction:['close','max','min'],
    taskAction:{
        close:()=>{}
    },
    iconAction:{
        open:()=>{}
    }
}
let PCApp = new App(config);

interface IProps{

}

interface IState{
    msg:string
}


class PC extends React.PureComponent<IProps,IState>{
    constructor(props:IProps){
        super(props);
        this.state = {
            msg:'此电脑'
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


PCApp.setComponent(<PC/>)

export default PCApp;

