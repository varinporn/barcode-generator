import * as buffer from 'buffer'
window.Buffer = buffer.Buffer

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './stores/store.ts'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
