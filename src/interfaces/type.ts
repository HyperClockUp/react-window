/**
 * App抽象类接口
 */
export interface IApp{
    icon:string,
    title:string,
    windowAction:Array<'close'|'min'|'max'>,
    taskAction:{
        close:Function,
        [key:string]:Function
    },
    iconAction:{
        open:Function,
        [key:string]:Function
    }
}

/**
 * Application组件初始化接口
 */
export interface IApplication{
    app:string,
    icon:string,
    title:string,
    left: string,
    top: string,
    zIndex:number,
    windowAction:Array<'close'|'min'|'max'>,
    windowState:'min'|'max'|'normal',
    action:{
        close:(event:React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>) => void,
        [key:string]:(event: React.MouseEvent<HTMLButtonElement, MouseEvent>|React.MouseEvent<HTMLDivElement,MouseEvent>) => void
    }
}

/**
 * 桌面图标组件初始化接口
 */

export interface IIcon {
    app:string,
    title: string
    icon: string
    action: {
        open:Function,
        [key:string]:Function
    }
}

/**
 * 右键菜单组件初始化接口
 */
export interface IContext {
    type: "icon" | "taskBar" | "win" | "time" | "tray" | "desktop"
    info: any
}

/**
 * 菜单单项组件初始化接口
 */
export interface IContextItem {
    icon?: string
    title: string
    action: Function
}

/**
 * 任务栏组件初始化接口
 */
export interface ITask {
    app:string
    icon: string
    title: string
    windowState:'normal'|'min'|'max'
    action: {
        close: React.MouseEventHandler|Function
        normal:React.MouseEventHandler|Function
        min:React.MouseEventHandler|Function
        [key:string]:React.MouseEventHandler|Function|undefined
    }
}
