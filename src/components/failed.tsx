export default function Failed({...props}) {

  return (
    <div>
      <div className="text-center">
        <p className="h4 text-danger text-center">&#9785;</p>
        <p className="h6 text-danger text-center fs-1">возникла ошибка</p>
        {props?.actions?.repeatClick &&
          <button className="btn btn-outline-primary" onClick={() => props.actions.repeatClick()}>Повторить</button>}
      </div>
    </div>
  )
}
