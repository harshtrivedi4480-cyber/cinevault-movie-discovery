import { useEffect, useState } from 'react';
import { BrowserRouter } from "react-router-dom";

import AuthProvider from "../../contexts/auth-provider";
import GenresProvider from "../../contexts/genres-provider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Loading from "../../components/Loading";
import Modal from '../Authentication/components/Modal';
import AllRoutes from "../../config/all-routes";
import ScrollToTop from "../../components/ScrollToTop";


const App = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 400);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <BrowserRouter>
      <AuthProvider>
        <Modal />
        <GenresProvider>
          <ScrollToTop />
          <Header />
          <AllRoutes />
        </GenresProvider>
      </AuthProvider>
      <Footer />
    </BrowserRouter>
  );
}

export default App;