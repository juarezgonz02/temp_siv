import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

    <GoogleOAuthProvider clientId="37271178390-a7d8cfu94ncudo8cqr0e35v25k20oj9q.apps.googleusercontent.com">
        <App />
    </GoogleOAuthProvider>
)
