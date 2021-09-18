import * as Type from '../interfaces/type';

type IComponent = JSX.Element | null;

export default class App {
  _config: Type.IApp;
  _component: IComponent = null;
  constructor(config: Type.IApp) {
    this._config = config;
  }
  setConfig(config: Type.IApp) {
    this._config = config;
  }
  getConfig() {
    return this._config;
  }
  setComponent(component: IComponent) {
    this._component = component;
  }
  getComponent(): IComponent {
    return this._component;
  }
}
