import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './main.scss'
import { ErrorBoundary } from 'react-error-boundary'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ErrorBoundary 
    fallback={<div>3D 뷰어 로딩 실패</div>}
    onError={(error) => console.error('Babylon Error:', error)}
  >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ErrorBoundary>
) 