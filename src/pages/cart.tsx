import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { cartActions, selectCartItems, putOrder } from '../slices/cart-slice';
import { type Order } from "../app/index";
import Loading from '../components/loading.tsx';
import Failed from '../components/failed.tsx';

export default function Cart() {
  const dispatch = useAppDispatch();
  const { items, status } = useAppSelector(selectCartItems);
  const [ orderState, SetOrderState ] = useState({phone: '', address: '', agreement: false});

  const onOrderStatusChange = () => {
    if (status === 'idle') {
      SetOrderState({phone: '', address: '', agreement: false});
      dispatch(cartActions.setOrderComplete());

      setTimeout(() => {
        dispatch(cartActions.setOrderNone());
      }, 3000);
    }
  }

  useEffect(() => onOrderStatusChange(), [status]);

  const removeFromCartClickHandle = (id: number) => dispatch(cartActions.removeItem(id));

  const onOrderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { type,  name, checked, value } = e.target;
    SetOrderState({...orderState, [name]: type === "checkbox" ? checked : value});
  }

  const orderSubmitHandle = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const order: Order = {
      owner: {phone: orderState.phone, address: orderState.address},
      items: items.map(el => ({id: el.id, price: el.price, count: el.amount})),
    }
    dispatch(putOrder(order));
  }

  return (
    <>
      {items.length === 0 && status === "none" &&
        <h2 className="text-center">Корзина пуста</h2>}

      {items.length === 0 && status === "complete" &&
        <h2 className="text-center text-success">Заказ успешно оформлен</h2>}

      {items.length > 0 &&
        <section className="cart">
          <h2 className="text-center">Корзина</h2>
          <table className="table table-bordered">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Название</th>
              <th scope="col">Размер</th>
              <th scope="col">Кол-во</th>
              <th scope="col">Стоимость</th>
              <th scope="col">Итого</th>
              <th scope="col">Действия</th>
            </tr>
            </thead>
            <tbody>
            {items.map((item, index) =>
              <tr key={item.id}>
                <td scope="row">{index+1}</td>
                <td>
                  <Link to={`/product/${item.id}`}>{item.title}</Link>
                </td>
                <td>{item.size}</td>
                <td>{item.amount}</td>
                <td>{item.price} руб.</td>
                <td>{item.price * item.amount} руб.</td>
                <td>
                  <button className="btn btn-outline-danger btn-sm" onClick={() => removeFromCartClickHandle(item.id)}>Удалить</button>
                </td>
              </tr>)}
            <tr>
              <td colSpan={5} className="text-right">Общая стоимость</td>
              <td>{items.reduce((total, cur) => total + cur.price * cur.amount, 0)} руб.</td>
            </tr>
            </tbody>
          </table>
        </section>}

      {items.length > 0 &&
        <section className="order">
          <h2 className="text-center">Оформить заказ</h2>
          <div className="card" style={{maxWidth: "30rem", margin: "0 auto"}}>
            <form className="card-body" onSubmit={orderSubmitHandle}>
              <div className="form-group">
                <label htmlFor="phone">Телефон</label>
                <input className="form-control" name="phone" value={orderState.phone} onChange={onOrderChange} placeholder="Ваш телефон" />
              </div>
              <div className="form-group">
                <label htmlFor="address">Адрес доставки</label>
                <input className="form-control" name="address" value={orderState.address} onChange={onOrderChange} placeholder="Адрес доставки" />
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" name="agreement" checked={orderState.agreement} onChange={onOrderChange} />
                  <label className="form-check-label" htmlFor="agreement">Согласен с правилами доставки</label>
              </div>
              {status !== 'loading' &&
                <button type="submit" className="btn btn-outline-secondary">Оформить</button>}
            </form>

            {status === 'loading' && <Loading />}
            {status === 'failed' && <Failed />}

          </div>
        </section>}
    </>
  )
}
