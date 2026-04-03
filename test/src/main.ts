import setupApp from './app'

import '@klinecharts/noob/dist/klinecharts-noob.css'
import './index.css'

setupApp(document.querySelector<HTMLDivElement>('#app')!)
