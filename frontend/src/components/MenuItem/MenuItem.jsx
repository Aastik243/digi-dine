import styles from './MenuItem.module.css'

const MenuItem = (props) => {
  let options=props.foodOptions;
  let priceOptions=Object.keys(options);

  return (

    <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={props.foodImg}
      alt="Album"
      className="w-25 h-25 " />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{props.foodName}</h2>
    <p>{props.foodDescription}</p>
    <select className="select select-bordered w-max max-w-xs">
    {priceOptions.map((type) =>{
      return (<option key={type} value={type}>{type}</option>)
    })}
</select>

    <div className="card-actions justify-end">
      <button className="btn btn-primary">Add to Cart</button>
    </div>
  </div>
</div>
    
  )
}

export default MenuItem