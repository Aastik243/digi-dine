import React, { useEffect, useState } from 'react';
import { useUser } from '../../components/ContextReducer/ContextReducer';

const Order = () => {
    const { userEmail } = useUser();
    const [orderData, setOrderData] = useState("");

    console.log(userEmail);

    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch('http://localhost:5000/myOrderData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email: userEmail })
                });

                if (response.ok) {
                    const data = await response.json();
                    setOrderData(data.orderData1);
                    console.log(orderData);
                } else {
                    console.error('Failed to fetch order data:', await response.json());
                }
            } catch (error) {
                console.error('Error fetching order data:', error);
            }
        };

        if (userEmail) {
            fetchOrderData();
        }
    }, [userEmail]);

    return (
        <div className="container mx-auto p-4">
            {!orderData ? (
                <div>No order history available.</div>
            ) : (
                <>
                    <h2 className="text-2xl font-bold mb-4">Order History</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {orderData.orderDetails.map((item) => (
                            <div  className="bg-white shadow-md rounded-lg p-4">
                                <img src={item.img} alt={item.name} className="w-full h-40 object-cover mb-4 rounded" />
                                <h3 className="text-lg font-semibold">{item.name}</h3>
                                <p className="text-sm text-gray-700">Size: {item.size}</p>
                                <p className="text-sm text-gray-700">Price: ${item.price.toFixed(2)}</p>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

 

export default Order;
