import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './components/App.jsx'
import { AuthProvider } from './components/Auth.jsx'

// place css in the src/style directory, and import them like this:
import './style/index.css'

const root = document.getElementById('root')
const app = createRoot(root)
app.render(<AuthProvider><App /></AuthProvider>)