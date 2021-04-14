import React from "react"
import ContextMenuHandle from "./context/menu"
import "./Windows.scss"
import * as Type from "./interfaces/type"
import TaskBar from "./components/taskBar"
import Desktop from "./components/desktop"
// import Welcome from './components/welcome'
import windowsController from './windowsController'
import App from './app'
import { Application } from "./components/application"
// import bg from "./images/bg.jpg"

interface IProps { }
/**
 * @param contextMenu:JSX.Element
 */
interface IState extends IProps {
    contextMenu: JSX.Element
    appList: Array<App>
    appOpenList: Array<App>
    iconList: Array<Type.IIcon>
    taskList: Array<Type.ITask>
    applicationList: Array<Application>
    applicationStateList: Array<Type.IApplication>
    bg: string
}

class Windows extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            contextMenu: <div></div>,
            appList: windowsController.appList,
            appOpenList: windowsController.appOpenList,
            applicationStateList: windowsController.applicationStateList,
            iconList: [],
            taskList: [],
            applicationList: [],
            bg: ''
        }
    }
    componentWillMount = () => {
        windowsController.registerEvent('update', this.updateWindow);
        this.setState({
            iconList: this.createIconList(),
        })
        fetch('https://api.66mz8.com/api/bing.php?idx=0&format=json').then(res => res.json()).then(json => {
            this.setState({
                bg: `${json.img_url}`
            })
        })
    }
    updateWindow: Function = (origin: string, log: boolean): void => {
        this.setState({
            appList: windowsController.appList,
            appOpenList: windowsController.appOpenList,
            applicationStateList: windowsController.applicationStateList
        }, () => {
            this.setState({
                taskList: this.createTaskList(),
                applicationList: this.createApplicationList(),
            }, () => {
                if (!log) {
                    return;
                }
                origin = origin || "updateWindow"
                console.log(`来自 ${origin} 的统计信息如下`)
                console.log(`App:${this.state.appList.length}`);
                console.log(`桌面Icon:${this.state.iconList.length}`);
                console.log(`打开App:${this.state.appOpenList.length}`);
                console.log(`打开App状态:${this.state.applicationStateList.length}`);
                console.log(`当前打开App窗口:${this.state.applicationList.length}`);
                console.log(`打开任务栏:${this.state.taskList.length}`);
                console.log(`-------------------------------------------------------`)
            })
        })
    }

    createIconList: Function = (): Array<Type.IIcon> => {
        return this.state.appList.map((item, index) => {
            let config: Type.IApp = item.getConfig();
            let tempIcon: Type.IIcon = {
                app: config.title,
                action: {
                    open: () => { },
                },
                icon: config.icon,
                title: config.title,
            }
            tempIcon.action.open = () => {
                windowsController.openApp(config.title);
            }
            return tempIcon
        })
    }

    createTaskList: Function = (): Array<Type.ITask> => {
        return this.state.applicationStateList.map((item, index) => {
            let tempTask: Type.ITask = {
                app: item.app,
                action: {
                    close: () => {
                        windowsController.killApp(item.app);
                    },
                    normal: () => {
                        let tempArr = this.state.applicationStateList.slice(0);
                        for (let appState of tempArr) {
                            if (appState.title === item.title) {
                                appState.windowState = 'normal'
                                break;
                            }
                        }
                        this.setState({
                            applicationStateList: tempArr
                        }, () => {
                            windowsController.toppingApplication(item.app);
                            this.updateWindow()
                        })
                    },
                    min: () => {
                        windowsController.minimizeApplication(item.app);
                    }
                },
                windowState: item.windowState,
                icon: item.icon,
                title: item.title,
            }
            return tempTask
        })
    }

    createApplicationList: Function = (): Array<JSX.Element> | void => {
        const { appOpenList, applicationStateList } = this.state;
        if (applicationStateList.length === 0) {
            let tempArr: Array<Type.IApplication> = []
            tempArr = appOpenList.map(item => {
                return windowsController.createApplication(item)
            })
            this.setState({
                applicationStateList: tempArr
            })
            return tempArr.map((item, index) => {
                return <Application windowInfo={item} key={item.title} body={this.state.appOpenList[index].getComponent()} />
            })
        } else {
            return applicationStateList.map((item, index) => {
                return <Application windowInfo={item} key={item.title} body={this.state.appOpenList[index].getComponent()} />
            })
        }
    }

    createContextMenu: Function = (e: MouseEvent, context: Type.IContext) => {
        let operations: Array<Type.IContextItem> = [
            {
                title: `打开 ${context.info}`,
                action: () => {
                    windowsController.openApp(context.info)
                },
            },
        ]

        switch (context.type) {
            case "icon":
                operations.push({
                    title: "属性",
                    action: () => { },
                })
                break
            case "win":
                break
            case "desktop":
                break
            case "taskBar":
                break
        }
        let style = {
            left: e.pageX + "px",
            top: e.pageY + "px",
        }
        let contextList: Array<JSX.Element> = operations.map((item, index) => {
            return (
                <div
                    className="context-item"
                    key={index}
                    onClick={(e) => {
                        item.action(e)
                    }}>
                    {(() => {
                        if (item.icon) {
                            return (
                                <img
                                    className="img"
                                    src={item.icon}
                                    alt={item.title}
                                />
                            )
                        }
                    })()}
                    <span className="title">{item.title}</span>
                </div>
            )
        })

        this.setState({
            contextMenu: (
                <div
                    className="context-menu"
                    onContextMenu={(e) => {
                        e.preventDefault()
                    }}
                    style={style}>
                    {contextList}
                </div>
            ),
        })
        e.preventDefault()
    }

    render() {
        return (
            <ContextMenuHandle.Provider value={this.createContextMenu}>
                <div
                    className="windows"
                    onClick={() => {
                        this.setState({
                            contextMenu: <div></div>,
                        })
                    }}>
                    {/* <Welcome/> */}
                    {this.state.contextMenu}
                    <Desktop iconList={this.state.iconList} openApplication={windowsController.openApp} bgUrl={this.state.bg} />
                    {this.state.applicationList}
                    <TaskBar size="middle" taskList={this.state.taskList} />
                </div>
            </ContextMenuHandle.Provider>
        )
    }
}

export default Windows
