import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'
import { store } from './app/store'
import Header from './pages/header.tsx';
import Footer from './pages/footer.tsx';
import Banner from './pages/banner.tsx';
import Home from './pages/home.tsx';
import Catalog from './pages/catalog.tsx';
import About from './pages/about.tsx';
import Contacts from './pages/contacts.tsx';
import NotFound from './pages/not-found.tsx';
import Product from './pages/product.tsx';
import Cart from './pages/cart.tsx';

export default function App() {

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Header />
        <main className="container">
          <div className="row">
            <div className="col">
              <Banner />
              <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/catalog" element={<Catalog page={'catalog'} />}/>
                <Route path="/about" element={<About />}/>
                <Route path="/contacts" element={<Contacts />}/>
                <Route path="/product/:id" element={<Product />}/>
                <Route path="/cart" element={<Cart />} />
                <Route path="/*" element={<NotFound />}/>
              </Routes>
            </div>
          </div>
        </main>
        <Footer />
      </Provider>
    </BrowserRouter>
  )
}
