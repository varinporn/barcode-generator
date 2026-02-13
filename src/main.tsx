import * as buffer from 'buffer'
window.Buffer = buffer.Buffer

import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './stores/store.ts'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
