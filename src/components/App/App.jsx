import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';

import Footer from '../Footer/Footer';
import RegistrationForm from '../Form/RegistrationForm';
import Header from '../Header/Header';
import Modal from '../Modal/Modal';
import Logo from '../Logo/Logo';
import Search from '../Search/Search';

import CatalogPage from '../../pages/Catalog/CatalogPage';
import FavouritePage from '../../pages/Favourite/FavouritePage';
import FAQPage from '../../pages/FAQ/FAQPage';
import MainPage from '../../pages/MainPage/MainPage';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';
import ProductPage from '../../pages/Product/ProductPage';

import { UserContext } from '../../context/userContext';
import { LoadingContext } from '../../context/loadingContext';

import api from '../../utils/api';
import { signup, signin, checkToken } from '../../utils/auth';
import isLike from '../../utils/utils';

import s from './style.module.css';
import LoginForm from '../Form/LoginForm';
import ResetForm from '../Form/ResetForm';
import MainForm from '../Form/MainForm';
import { deleteItem, setItem, getItem } from '../../utils/localStorage';
import { openNotification } from '../../utils/openNotification';

function App() {
  const [cards, setCards] = useState([]);
  const [favouriteCards, setFavouriteCards] = useState([]);
  const [sortedCards, setSortedCards] = useState([]);
  const [currentSort, setCurrentSort] = useState('default');
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({});
  const [loggedIn, setLoggedIn] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const backgroundLocation = location.state?.backgroundLocation;
  const mainUrl = location.state?.mainUrl;

  const authUrls = ['/login', '/registration', '/reset'];
  const isAuthLocation = authUrls.includes(location?.pathname);

  const handleRequestAuth = (data) => {
    if (location.pathname === '/login') {
      signin(data)
        .then((data) => {
          if (!data.err) {
            setItem('jwt', data.token);
            navigate('/');
            setLoggedIn(true);
          }
          return data;
        })
        .catch((err, data) => {
          openNotification('error', err);
        });
    }
    if (location.pathname === '/registration') {
      signup(data)
        .then((data) => {})
        .catch((err) => {
          openNotification('error', err);
        });
    }
  };

  const logout = () => {
    setLoggedIn(false);
    deleteItem('jwt');
    if (isAuthLocation) return;
    navigate('/login');
  };

  const handleTokenCheck = () => {
    const jwt = getItem('jwt');
    console.log(location.pathname);
    if (jwt) {
      checkToken(jwt).then((data) => {
        if (data) {
          setLoggedIn(true);
        }
      });
    } else {
      if (location?.pathname !== '/') {
        logout();
      }
    }
  };

  useEffect(() => {
    handleTokenCheck();
  }, [location?.pathname]);

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getAllProducts()]).then(([userData, productsData]) => {
        setUser(userData);
        setCards(productsData.products);
        setSortedCards(productsData.products);
        const favourites = productsData.products.filter((product) => isLike(product.likes, userData._id));
        setFavouriteCards(favourites);
        setIsLoading(false);
      });
    }
  }, [loggedIn]);

  const handleRequest = useCallback((newSearchQuery) => {
    setIsLoading(true);
    setSearchQuery(newSearchQuery);
    api
      .search(newSearchQuery)
      .then((data) => {
        setCards(data);
        setSortedCards(data);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const handleProductLike = useCallback(
    (productId, productLikes) => {
      const isLiked = isLike(productLikes, user._id);
      return api.changeLikeStatus(productId, isLiked).then((updateProduct) => {
        const updateCards = cards.map((card) => (card._id === updateProduct._id ? updateProduct : card));
        setCards(updateCards);
        setSortedCards(updateCards);

        if (isLiked) {
          setFavouriteCards((prevState) => prevState.filter((card) => card._id !== updateProduct._id));
        } else {
          setFavouriteCards((prevState) => [...prevState, updateProduct]);
        }

        return updateProduct;
      });
    },
    [cards, user._id]
  );

  const onChangeLoading = useCallback((isLoading) => {
    setIsLoading(isLoading);
  }, []);

  const onChangeSort = useCallback(
    (newSort) => {
      setCurrentSort(newSort);
      if (newSort === 'cheap') {
        setSortedCards([...cards].sort((a, b) => a.price - b.price));
      }
      if (newSort === 'low') {
        setSortedCards([...cards].sort((a, b) => b.price - a.price));
      }
      if (newSort === 'sale') {
        setSortedCards([...cards].sort((a, b) => b.discount - a.discount));
      }
      if (newSort === 'default') {
        setSortedCards(cards);
      }
    },
    [cards]
  );

  return (
    <LoadingContext.Provider value={{ isLoading, onChangeLoading }}>
      <UserContext.Provider value={{ user, handleProductLike, favourites: favouriteCards.length, loggedIn }}>
        <Header user={user} loggedIn={loggedIn} logout={logout}>
          <Logo />
          <Routes>
            <Route path="/" element={<Search onSearch={handleRequest} />}></Route>
            <Route path="/catalog" element={<Search onSearch={handleRequest} />}></Route>
          </Routes>
        </Header>
        <div className={s.container}>
          <Routes location={backgroundLocation ? { ...backgroundLocation, pathname: mainUrl } : location}>
            <Route path="/" element={<MainPage></MainPage>}></Route>
            <Route path="/catalog" element={loggedIn && <CatalogPage currentSort={currentSort} onChangeSort={onChangeSort} searchQuery={searchQuery} cards={sortedCards}></CatalogPage>}></Route>
            <Route path="/product/:productId" element={<ProductPage></ProductPage>}></Route>
            <Route path="/faq" element={<FAQPage></FAQPage>}></Route>
            <Route path="/favourite" element={loggedIn && <FavouritePage favouriteCards={favouriteCards}></FavouritePage>}></Route>
            <Route path="/registration" element={<RegistrationForm handleRequestAuth={handleRequestAuth}></RegistrationForm>}></Route>
            <Route path="/reset" element={<ResetForm></ResetForm>}></Route>
            <Route path="/login" element={<LoginForm handleRequestAuth={handleRequestAuth}></LoginForm>}></Route>
            <Route path="*" element={<NotFoundPage></NotFoundPage>}></Route>
          </Routes>
          {backgroundLocation && (
            <Routes>
              <Route
                path="/login"
                element={
                  <Modal>
                    <LoginForm></LoginForm>
                  </Modal>
                }
              ></Route>
              <Route
                path="/reset"
                element={
                  <Modal>
                    <ResetForm></ResetForm>
                  </Modal>
                }
              ></Route>
              <Route
                path="/registration"
                element={
                  <Modal>
                    <RegistrationForm></RegistrationForm>
                  </Modal>
                }
              ></Route>
            </Routes>
          )}
        </div>
        <Footer />
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
