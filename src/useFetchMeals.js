import { useState, useEffect } from 'react';

const useFetchMeals = (API_URL) => {
  const [meals, setMeals] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  
  useEffect(() => {

    const fetchMealData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.mealServiceDietInfo) {
          setMeals(data.mealServiceDietInfo[1].row[meal]);
        } else {
          setMeals([]); 
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    
    fetchMealData();
  }, [API_URL]);

  return { meals, loading, error }; 

};

export default useFetchMeals;
