import { CategoryItem } from '../app/model'

export default function Categories({...props}) {

  return (
    <ul className="catalog-categories nav justify-content-center">
      {props.items.map((item: CategoryItem) =>
        <li key={item.id} className="nav-item">
          <a className={["nav-link", item.id === props.active ? "active" : ""].join(" ")} onMouseDown={() => props.actions.categoryClick(item.id)}>
            {item.title}
          </a>
        </li>)}
    </ul>
  )
}
