// Packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'

//Pages
import Drive from './pages/drivev2/Drive';
import Landing from './pages/landing/Landing';

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<Drive />} />
        <Route path="/setting" element={<h1>Setting</h1>} />
        <Route path="/landing" element={<Landing />} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/privacy-policy" element={<h1>Privacy Policy</h1>} />
        <Route path="/terms-and-conditions" element={<h1>Terms and Conditions</h1>} />
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>

      <Toaster position="top-right" closeButton richColors toastOptions={{
        unstyled: false,
        classNames: {
          toast: 'p-[16px] border-[0.5px]',
          title: 'text-[12px]',
          closeButton: 'border-[0.5px]'
        },
      }} />
    </BrowserRouter>
  )
}

export default App
