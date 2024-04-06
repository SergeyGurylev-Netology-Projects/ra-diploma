import header_logo from '../img/header-logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const menuItems = [
    {id: 0, alt: 'Bosa Noga', url: "/"},
    {id: 1, caption: 'Главная', url: "/"},
    {id: 2, caption: 'Каталог', url: "/catalog"},
    {id: 3, caption: 'О магазине', url: "/about"},
    {id: 4, caption: 'Контакты', url: "/contacts"},
  ];

  return (
    <header className="container">
      <div className="row">
        <div className="col">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarMain">
              <ul className="navbar-nav mr-auto">
                {menuItems
                  .filter(item => item.alt)
                  .map((item) =>
                    <NavLink key={item.id}
                             to={item.url}>
                      <li className="navbar-brand">
                        <img src={header_logo} alt={item.alt} />
                      </li>
                    </NavLink>
                  )}
                {menuItems
                  .filter(item => item.caption)
                  .map((item) =>
                    <NavLink key={item.id}
                             to={item.url}
                             className = {({isActive}) => ["nav-link", isActive ? "active" : ""].join(" ")}>
                      <li className="nav-item">
                        {item.caption}
                      </li>
                    </NavLink>
                  )}
              </ul>
              <div>
                <div className="header-controls-pics">
                  <div data-id="search-expander" className="header-controls-pic header-controls-search"></div>
                  <Link to={'/cart'}>
                    <div className="header-controls-pic header-controls-cart">
                      <div className="header-controls-cart-full">1</div>
                      <div className="header-controls-cart-menu"></div>
                    </div>
                  </Link>
                </div>
                <form data-id="search-form" className="header-controls-search-form form-inline invisible">
                  <input className="form-control" placeholder="Поиск" />
                </form>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
