import { useDispatchCart, useCart } from '../ContextReducer/ContextReducer.jsx'
import { useEffect, useState, useRef } from 'react';

const MenuItem = (props) => {
  const dispatch=useDispatchCart();
  let data=useCart();
  let options=props.foodItem.options;
  let priceOptions=Object.keys(options);
  const [size, setSize] = useState("");
  const priceRef = useRef();


  const handleAddToCart = async () => {
    
    await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice,  size: size, img:props.foodItem.imgUrl })
    console.log(data);

    // setBtnEnable(true)

  }

  let finalPrice=parseInt(options[size]);

  useEffect(()=>{
    setSize(priceRef.current.value);

  },[])



  return (

    <div className="card lg:card-side bg-base-100 shadow-xl">
  <figure>
    <img
      src={props.foodItem.imgUrl}
      alt="Album"
      style={{height:"200px",width:"300px", objectFit:"fill"}} />
  </figure>
  <div className="card-body">
    <h2 className="card-title">{props.foodItem.name}</h2>
    <p>{props.foodItem.description}</p>
    <select className="select select-bordered w-max max-w-xs" ref={priceRef} onChange={(e)=>{ setSize(e.target.value)   }}>
    {priceOptions.map((type) =>{
      return (<option key={type} value={type}>{type}</option>)
    })}
</select>
<div>
  <p>Price : {finalPrice}</p>
</div>

    <div className="card-actions justify-end">
      <button className="btn btn-primary" onClick={handleAddToCart}>Add to Cart</button>
    </div>
  </div>
</div>
    
  )
}

export default MenuItem