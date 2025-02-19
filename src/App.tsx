// Packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'

//Pages
import Drive from './pages/drivev2/Drive';
import Landing from './pages/landing/Landing';
import PrivacyPolicy from './pages/privacypolicy/PrivacyPolicy';
import TermsAndConditions from './pages/termsandconditions/TermsAndConditions';
import NotFound from './pages/notfound/NotFound';

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Drive />} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Toaster position="top-right" closeButton richColors toastOptions={{
        unstyled: false,
        classNames: {
          toast: 'p-[16px] border-[0.5px]',
          title: 'text-[14px]',
          closeButton: 'border-[0.5px]'
        },
      }} />
    </BrowserRouter>
  )
}

export default App
