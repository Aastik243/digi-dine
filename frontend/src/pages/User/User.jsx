import MenuItem from '../../components/MenuItem/MenuItem';
import { useEffect, useState } from 'react';

const User = () => {

  const [foodItems, setFoodItems] = useState([])
   const [search, setSearch] = useState('')
  const loadFoodItems = async () => {
    let response = await fetch("http://localhost:5000/foodData", {
      
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }

    });
    const data = await response.json()
    // console.log(response[1][0].CategoryName)
    setFoodItems(data);
    console.log(foodItems);
    
  }

  useEffect(() => {
    loadFoodItems()
  }, [])

  return (
    <>

<div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search food items..."
           value={search}
           onChange={(e)=> {
            setSearch(e.target.value);
           }}
          className="w-full max-w-md p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>


      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'>
        {foodItems.length > 0 ? (
          foodItems.filter((filtereditem)=>filtereditem.name.toLowerCase().includes(search.toLocaleLowerCase()))
          .map((item) => (
            <MenuItem foodName={item.name}
            foodCategory={item.category}
            foodImg={item.imgUrl} 
            foodDescription={item.description}
            foodOptions={item.options}
            />
          ))
        ) : (
          <div>Failed to fetch data</div>
        )}
      </div>
    </>
  );
};


export default User;
