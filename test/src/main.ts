import setupApp from './app'

import '@klinecharts/noob/dist/klinecharts-pro.css'
import './index.css'

setupApp(document.querySelector<HTMLDivElement>('#app')!)
