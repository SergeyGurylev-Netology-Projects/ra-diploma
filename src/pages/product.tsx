import { Link, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { productActions, selectProduct, getData } from '../slices/product-slice';
import { cartActions } from '../slices/cart-slice';
import Loading from '../components/loading.tsx';
import Failed from '../components/failed.tsx';

export default function Product() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { item, status, order } = useAppSelector(selectProduct);

  const loadData = () => {if (id) dispatch(getData(parseInt(id)))}

  useEffect(() => loadData(), []);

  const sizeClickHandle = (size:string) => dispatch(productActions.setSize(size));

  const decrementClickHandle = () => dispatch(productActions.decrementAmount());

  const incrementClickHandle = () => dispatch(productActions.incrementAmount());

  const repeatClickHandle = () => loadData();

  const putToCartClickHandle = () => {
    if (item) dispatch(
      cartActions.addItem({
        id: item.id,
        title: item.title,
        price: item.price,
        size: order.size,
        amount: order.amount
      }));
  }

  return (
    <section className="catalog-item">

      {status === 'loading' && <Loading />}
      {status === 'failed' && <Failed actions={{repeatClick: repeatClickHandle}}/>}

      {status === 'idle' && item !== undefined &&
        <>
          <h2 className="text-center">{item.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={item.images[0]} className="img-fluid" alt={item.title} />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                <tr>
                  <td>Артикул</td>
                  <td>{item.sku}</td>
                </tr>
                <tr>
                  <td>Производитель</td>
                  <td>{item.manufacturer}</td>
                </tr>
                <tr>
                  <td>Цвет</td>
                  <td>{item.color}</td>
                </tr>
                <tr>
                  <td>Материалы</td>
                  <td>{item.material}</td>
                </tr>
                <tr>
                  <td>Сезон</td>
                  <td>{item.season}</td>
                </tr>
                <tr>
                  <td>Повод</td>
                  <td>{item.reason}</td>
                </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>Размеры в наличии:
                  {order.availableSizes
                    .map(size =>
                    <span key={size}
                          className={["catalog-item-size", order.size === size ? "selected" : ""].join(" ")}
                          onMouseDown={() => sizeClickHandle(size)}>
                      {size}
                    </span>)
                  }
                </p>
                {order.availableSizes.length === 0 && <p>нет</p>}
                {order.availableSizes.length > 0 &&
                  <p>Количество:
                    <span className="btn-group btn-group-sm pl-2">
                    <button className="btn btn-secondary" onMouseDown={decrementClickHandle}>-</button>
                    <span className="btn btn-outline-primary">{order.amount}</span>
                    <button className="btn btn-secondary" onMouseDown={incrementClickHandle}>+</button>
                  </span>
                  </p>}
              </div>
              {order.availableSizes.length > 0 &&
                <Link to={'/cart'}
                      className={["btn", "btn-danger", "btn-block", "btn-lg", order.size ? "" : "bth-unavailable"].join(" ")}
                      onClick={putToCartClickHandle}>
                  {order.size ? "В корзину" : "Выберите размер"}
                </Link>}
            </div>
          </div>
        </>
      }
    </section>
  )
}
