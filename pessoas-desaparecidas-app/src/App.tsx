import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Lazy loading das páginas
const HomePage = React.lazy(() => import('./pages/HomePage'));
const PersonDetailPage = React.lazy(() => import('./pages/PersonDetailPage'));

// Componente de Loading
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Carregando...</p>
    </div>
  </div>
);

// Componente 404
const NotFound: React.FC = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <div className="text-gray-400 text-6xl mb-4">🔍</div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Página não encontrada</h1>
      <p className="text-gray-600 mb-6">A página que você está procurando não existe.</p>
      <a
        href="/"
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
      >
        Voltar à página inicial
      </a>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/person/:id" element={<PersonDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        
        {/* Toast notifications */}
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              style: {
                background: '#10b981',
              },
            },
            error: {
              style: {
                background: '#ef4444',
              },
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
