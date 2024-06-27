import React from 'react';
import { useCart, useDispatchCart } from '../../components/ContextReducer/ContextReducer';

const Cart = () => {
  const cart = useCart();
  const dispatch = useDispatchCart();

  const handleRemove = (index) => {
    dispatch({ type: 'REMOVE', index });
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);

  return (
    <div className="container mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr className="w-full bg-gray-100 border-b">
              <th className="px-4 py-2">Image</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item, index) => (
              <tr key={index} className="border-b">
                <td className="px-4 py-2">
                  <img src={item.img} alt={item.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.size}</td>
                <td className="px-4 py-2">₹{item.price.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <button 
                    onClick={() => handleRemove(index)} 
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
     
      <div className="mt-4 text-right">
        <h3 className="text-xl font-bold">Total: ₹{totalPrice.toFixed(2)}</h3>
      </div>
      <button className="btn btn-success btn-xs sm:btn-sm md:btn-md lg:btn-lg text-center">Checkout</button>
    </div>
  
  );
};

export default Cart;

