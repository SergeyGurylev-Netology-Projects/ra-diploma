import { Link } from 'react-router-dom';
import { TopSalesItem } from '../app/model'

export default function ListItems({...props}) {

  return (
    <div className="row">
      {props.items.map((item: TopSalesItem) =>
        <div key={item.id} className="col-4">
          <div className="card catalog-item-card">
            <img src={item.images[0]} alt={item.title} className="card-img-top img-fluid" style={{height: "20rem", objectFit: "contain"}}/>
            <div className="card-body">
              <p className="card-text" style={{height: "2.5rem", objectFit: "contain"}}>{item.title}</p>
              <p className="card-text">{item.price} руб.</p>
              <Link to={`/product/${item.id}`} className="btn btn-outline-primary">
                Заказать
              </Link>
            </div>
          </div>
        </div>)}
    </div>
  )
}
