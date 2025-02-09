// Packages
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner'

const App = () => {

  return (
    <BrowserRouter>

      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
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
