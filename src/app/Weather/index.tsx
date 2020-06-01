import App from "../index"
import React from "react"
import * as Type from "../../interfaces/type"
import "./index.scss"
import icon from '../../images/weather.png'
import windowsController from "../../windowsController"

let config: Type.IApp = {
    title: "天气",
    icon: icon,
    windowAction: ["close", "max", "min"],
    taskAction: {
        close: () => {
            windowsController.killApp("weather")
        },
    },
    iconAction: {
        open: () => {},
    },
}
let WeatherApp = new App(config)

WeatherApp.setConfig(config)

interface IProps {}

interface IState {
    weather: Array<any>
    ipUrl:string,
    ipInfo:{
        ip:string,
        isp:string,
        region:string
    }
}

class WeatherBoard extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            weather: [],
            ipUrl:'https://api.66mz8.com/api/ip.info.php',
            ipInfo:{
                ip:'',
                isp:'',
                region:''
            }
        }
    }


    componentDidMount() {
        fetch(this.state.ipUrl).then(res=>res.json()).then(r=>{
            this.setState({
                ipInfo:{
                    ip:r.ip,
                    region:r.region,
                    isp:r.isp
                }
            })

            let reg = /(.+?)市/
            let city:string = r.region.match(reg)[1];
            windowsController.setApplicationState(config.title,{
                title:`${city}天气`
            })
            return  fetch(`https://api.66mz8.com/api/weather.php?location=${city}`)
        }).then((res) => res.json())
        .then((json) => {
            this.setState({
                weather: json.data,
            })
        })
    }

    createWeatherList: Function = (): JSX.Element => {
        let weatherList: Array<JSX.Element> = []
        weatherList = this.state.weather.map((item) => {
            return (
                <div className="weather-item" key={item.week}>
                    {item.days}|{item.week}|{item.temperature}|{item.wind}
                    <img src={item.weather_icon} alt="weather icon" />
                </div>
            )
        })
        return <div className="weather-list">{weatherList}</div>
    }
    render() {
        return <div className="weather">
            {this.state.ipInfo.ip}|{this.state.ipInfo.region}{(()=>{if(this.state.ipInfo.isp){return '|' + this.state.ipInfo.isp}})()}
            {this.createWeatherList()}
            </div>
    }
}
WeatherApp.setComponent(<WeatherBoard />)

export default WeatherApp
