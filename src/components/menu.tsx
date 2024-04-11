import header_logo from '../img/header-logo.png';
import { NavLink } from 'react-router-dom';
import { MenuItem } from '../app/index';

export default function Menu(props: {classes: string, items: MenuItem[]}) {

  return (
    <ul className={props.classes}>
      {props.items
        .filter(item => item.alt)
        .map((item) =>
          <NavLink key={item.id} to={item.url}>
            <li className="navbar-brand">
              <img src={header_logo} alt={item.alt} />
            </li>
          </NavLink>
        )}
      {props.items
        .filter(item => item.caption)
        .map((item) =>
          <NavLink key={item.id} to={item.url} className="nav-link nav-item">
            <li>{item.caption}</li>
          </NavLink>
        )}
    </ul>
  )
}
