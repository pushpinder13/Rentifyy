import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
// import { Provider } from "react-redux"
// import { persistor, store } from './redux/store.js'
// import { PersistGate } from 'redux-persist/integration/react'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={store}>
      <PersistGate Loading={null} persistor={persistor} > */}
        <App />
      {/* </PersistGate>
    </Provider> */}
  </StrictMode>,
)
