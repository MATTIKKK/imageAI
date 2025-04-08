import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './app.css';
import MainPage from './pages/MainPage';
import ImageColorizationPage from './pages/ImageColorizationPage';
import AIGeneratorPage from './pages/AIGeneratorPage';
import PrivateRoute from './routes/PrivateRoute';
import ProfilePage from './pages/ProfilePage';
import FaceRecognitionPage from './pages/FaceRecognitionPage';
import ImageResizerPage from './pages/ImageResizerPage';

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<LoginPage />} />
          <Route
            path="/image-colorization"
            element={
              <PrivateRoute>
                <ImageColorizationPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/emotion"
            element={
              <PrivateRoute>
                <FaceRecognitionPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/resize"
            element={
              <PrivateRoute>
                <ImageResizerPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/ai-generator"
            element={
              <PrivateRoute>
                <AIGeneratorPage />
              </PrivateRoute>
            }
          />
          <Route path="/profile" element={<ProfilePage />} />
          
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
