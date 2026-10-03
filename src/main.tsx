import {lazy,Suspense} from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom';
import {MotionConfig} from 'motion/react';
import {LanguageProvider} from './i18n';
import Home from './components/Home';
import {RequestPreferencesProvider} from './RequestPreferences';
import '@fontsource/playfair-display/latin-400.css';
import '@fontsource/playfair-display/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import '@fontsource/manrope/latin-600.css';
import '@fontsource/noto-naskh-arabic/arabic-400.css';
import '@fontsource/ibm-plex-sans-arabic/arabic-400.css';
import './styles.css';
const OmarSaraInvitation=lazy(()=>import('./invitation/OmarSaraInvitation'));
const Legal=lazy(()=>import('./components/Legal'));
const Invitation=lazy(()=>import('./invitation/Invitation'));
const Admin=lazy(()=>import('./admin/Admin'));
const ClientDashboard=lazy(()=>import('./admin/ClientDashboard'));
const TareqLayanInvitation=lazy(()=>import('./invitation/TareqLayanInvitation'));
const YousefRamaInvitation=lazy(()=>import('./invitation/YousefRamaInvitation'));
function App(){return <LanguageProvider><MotionConfig reducedMotion="user"><RequestPreferencesProvider><BrowserRouter><Suspense fallback={<div className="page-loading" role="status">Invitéa</div>}><Routes><Route path="/:locale/invitations/yousef-rama" element={<YousefRamaInvitation/>}/><Route path="/invite/yousef-rama" element={<Navigate to="/ar/invitations/yousef-rama" replace/>}/><Route path="/" element={<Home/>}/><Route path="/en" element={<Home/>}/><Route path="/ar" element={<Home/>}/><Route path="/:locale/invitations/tareq-layan" element={<TareqLayanInvitation/>}/><Route path="/invite/tareq-layan" element={<Navigate to="/en/invitations/tareq-layan" replace/>}/><Route path="/:locale/invitations/omar-sara" element={<OmarSaraInvitation/>}/><Route path="/en/templates/lumiere" element={<Navigate to="/en/invitations/omar-sara" replace/>}/><Route path="/ar/templates/lumiere" element={<Navigate to="/ar/invitations/omar-sara" replace/>}/><Route path="/invite/omar-sara" element={<Navigate to="/en/invitations/omar-sara" replace/>}/><Route path="/:locale/templates/:templateId" element={<Navigate to="/en#invitations" replace/>}/><Route path="/:locale/terms" element={<Legal type="terms"/>}/><Route path="/:locale/privacy" element={<Legal type="privacy"/>}/><Route path="/terms" element={<Legal type="terms"/>}/><Route path="/privacy" element={<Legal type="privacy"/>}/><Route path="/invite/:slug" element={<Invitation/>}/><Route path="/preview/:id" element={<Invitation/>}/><Route path="/admin/*" element={<Admin/>}/><Route path="/client/*" element={<ClientDashboard/>}/><Route path="*" element={<div className="unavailable"><h1>Invitéa</h1><p>Page not found</p><a href="/">Return home</a></div>}/></Routes></Suspense></BrowserRouter></RequestPreferencesProvider></MotionConfig></LanguageProvider>};
createRoot(document.getElementById('root')!).render(<App/>);


import './redesign.css';


import './controls.css';

import './experience.css';
import './components/portfolio.css';
import './mobile-spacing.css';
