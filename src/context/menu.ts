import React from 'react'

let contextFn:Function = ():void=>{};
const ContextMenuHandle = React.createContext(contextFn)

export default ContextMenuHandle;