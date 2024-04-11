import { Link, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { selectCartItems } from '../slices/cart-slice';
import React, {useState} from "react";
import { MenuItem } from "../app/index";
import Menu from '../components/menu.tsx';

const menuItems: MenuItem[] = [
  {id: 0, caption: "", alt: "Bosa Noga", url: "/"},
  {id: 1, caption: "Главная", alt: "", url: "/"},
  {id: 2, caption: "Каталог", alt: "", url: "/catalog"},
  {id: 3, caption: "О магазине", alt: "", url: "/about"},
  {id: 4, caption: "Контакты", alt: "", url: "/contacts"},
];

export default function Header() {
  const { items: cartItems } = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const [ searchState, SetSearchState ] = useState({search: '', isVisible: false});

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetSearchState({...searchState, [name]: value});
  }

  const navigateToCatalog = (search: string) => {
    if (search.trim()) {
      navigate(`/catalog?search=${search}`);
    }
  }

  const searchClickHandle = () => {
    if (searchState.isVisible) {
      navigateToCatalog(searchState.search);
    }

    SetSearchState({...searchState, search: "", isVisible: !searchState.isVisible});
  }

  const searchSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigateToCatalog(searchState.search);

    if (searchState.search.trim()) {
      SetSearchState({...searchState, search: "", isVisible: false});
    }
  }

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarMain">

              <Menu classes={"navbar-nav mr-auto"} items={menuItems} />

              <div>
                <div className="header-controls-pics">

                  <div data-id="search-expander" className="header-controls-pic header-controls-search" onClick={searchClickHandle}></div>
                  <form data-id="search-form"
                        className={["header-controls-search-form", "form-inline", searchState.isVisible ? "" : "invisible"].join(" ")}
                        onSubmit={searchSubmitHandle}>
                    <input name="search" className="form-control" value={searchState.search} onChange={onSearchChange} placeholder="Поиск" />
                  </form>

                  <Link to={'/cart'}>
                    <div className="header-controls-pic header-controls-cart">
                      {cartItems.length > 0 && <div className="header-controls-cart-full">{cartItems.length}</div>}
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>

                </div>
              </div>

            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
