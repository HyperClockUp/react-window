import * as Type from "./interfaces/type"
import App from "./app"
import PC from "./app/PC"
import MsgBoardApp from "./app/MsgBoard"
import WeatherApp from "./app/Weather"
import BrowserApp from "./app/Browser"

interface IConfig {
    appFolderUrl: string
}

type event = "openApp" | "killApp" | "registerApp" | "removeApp" | "update"

class WindowsController {
    appList: Array<App> = []
    appOpenList: Array<App> = []
    applicationStateList: Array<Type.IApplication> = []
    config: IConfig | undefined
    eventBus: {
        [key in event]: Array<Function>
    } = {
        openApp: [],
        killApp: [],
        registerApp: [],
        removeApp: [],
        update: [],
    }
    constructor(config?: IConfig) {
        this.config = config
        this.initApplist()
    }

    getApp = (name: string): App => {
        return this.appList[
            this.appList.map((item) => item.getConfig().title).indexOf(name)
        ]
    }
    getApplicationState = (name: string): Type.IApplication => {
        return this.applicationStateList[
            this.applicationStateList.map((item) => item.title).indexOf(name)
        ]
    }

    initApplist = () => {
        this.appList.push(PC)
        this.appList.push(BrowserApp)
        this.appList.push(MsgBoardApp)
        this.appList.push(WeatherApp)
    }

    registerEvent = (event: event, fn: Function) => {
        this.eventBus[event].push(fn)
    }

    unregisterEvent = (event: event, fn: Function) => {
        this.eventBus[event].splice(this.eventBus[event].indexOf(fn), 1)
    }
    onceEvent = (event: event, fn: Function) => {
        let tempFn = () => {
            fn()
            this.unregisterEvent(event, tempFn)
        }
        this.registerEvent(event, tempFn)
    }
    triggerEvent = (event: event) => {
        for (let fn of this.eventBus[event]) {
            fn()
        }
    }
    killApp = (app: string) => {
        let removeIndex = this.appOpenList.indexOf(this.getApp(app))
        this.appOpenList.splice(removeIndex, 1)
        this.applicationStateList.splice(removeIndex, 1)
        this.triggerEvent("killApp")
        this.triggerEvent("update")
    }

    openApp = (app: string) => {
        if (
            !this.appOpenList
                .map((item) => item.getConfig().title)
                .includes(app)
        ) {
            let tempApplication: Type.IApplication = this.createApplication(
                this.getApp(app)
            )
            this.appOpenList.push(this.getApp(app))
            this.applicationStateList.push(tempApplication)
            this.triggerEvent("openApp")
            this.triggerEvent("update")
        }
    }

    createApplication = (app: App): Type.IApplication => {
        let config: Type.IApp = app.getConfig()
        let tempApplication: Type.IApplication = {
            app: config.title,
            title: config.title,
            icon: config.icon,
            windowAction: ["close", "max", "min"],
            windowState: "normal",
            zIndex: this.appOpenList.length,
            action: {
                close: (
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>
                ) => {
                    this.killApp(config.title)
                },
                min: (
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>
                ) => {
                    this.minimizeApplication(config.title)
                },
                normal: (
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>
                ) => {
                    this.normalizeApplication(config.title)
                },
                max: (
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>
                ) => {
                    this.maximizeApplication(config.title)
                },
                top: (
                    event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>
                ) => {
                    this.toppingApplication(config.title)
                },
            },
            left: (Math.random() * document.body.offsetWidth) / 2 + "px",
            top: (Math.random() * document.body.offsetHeight) / 3 + "px",
        }
        return tempApplication
    }

    minimizeApplication = (app: string) => {
        let minimizeIndex = this.applicationStateList.indexOf(
            this.getApplicationState(app)
        )
        this.applicationStateList[minimizeIndex].windowState = "min"
        this.triggerEvent("update")
    }

    normalizeApplication = (app: string) => {
        let minimizeIndex = this.applicationStateList.indexOf(
            this.getApplicationState(app)
        )
        this.applicationStateList[minimizeIndex].windowState = "normal"
        this.triggerEvent("update")
    }
    maximizeApplication = (app: string) => {
        let minimizeIndex = this.applicationStateList.indexOf(
            this.getApplicationState(app)
        )
        this.applicationStateList[minimizeIndex].windowState = "max"
        this.triggerEvent("update")
    }
    toppingApplication = (app: string) => {
        let toppingIndex:number = this.applicationStateList.indexOf(
            this.getApplicationState(app)
        )
        let maxZIndex:number = Math.max.apply(null,this.applicationStateList.map(item=>item.zIndex));
        if(maxZIndex!==this.applicationStateList[toppingIndex].zIndex){
            this.applicationStateList[toppingIndex].zIndex = maxZIndex + 1;
        }else{
            this.applicationStateList[toppingIndex].zIndex = maxZIndex;
        }
        this.triggerEvent("update");
    }
}

export default new WindowsController()
