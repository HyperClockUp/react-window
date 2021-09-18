export type Func = (args: unknown[]) => unknown;

/**
 * App抽象类接口
 */
export interface IApp {
  icon: string;
  title: string;
  windowAction: Array<'close' | 'min' | 'max'>;
  taskAction: {
    close: Func;
    [key: string]: Func;
  };
  iconAction: {
    open: Func;
    [key: string]: Func;
  };
}

/**
 * Application组件初始化接口
 */
export interface IApplication {
  app: string;
  icon: string;
  title: string;
  left: string;
  top: string;
  zIndex: number;
  windowAction: Array<'close' | 'min' | 'max'>;
  windowState: 'min' | 'max' | 'normal';
  action: {
    close: (
      event:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void;
    [key: string]: (
      event:
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
        | React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => void | Func;
  };
  [key: string]: unknown;
}

/**
 * 桌面图标组件初始化接口
 */

export interface IIcon {
  app: string;
  title: string;
  icon: string;
  action: {
    open: Func;
    [key: string]: Func;
  };
}

/**
 * 右键菜单组件初始化接口
 */
export interface IContext {
  type: 'icon' | 'taskBar' | 'win' | 'time' | 'tray' | 'desktop';
  info: unknown;
}

/**
 * 菜单单项组件初始化接口
 */
export interface IContextItem {
  icon?: string;
  title: string;
  action: Func;
}

/**
 * 任务栏组件初始化接口
 */
export interface ITask {
  app: string;
  icon: string;
  title: string;
  windowState: 'normal' | 'min' | 'max';
  action: {
    close: React.MouseEventHandler | Func;
    normal: React.MouseEventHandler | Func;
    min: React.MouseEventHandler | Func;
    [key: string]: React.MouseEventHandler | Func | undefined;
  };
}
