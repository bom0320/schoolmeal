import { useState, useEffect } from 'react';

const useFetchMeals = (API_URL) => {
  const [meals, setMeals] = useState([]); // 급식데이터 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 정보 저장
  
  useEffect(() => {
    // APT_URL 변경될 때마다 useEffect 가 실행되며, 새로운 API 요청으로 보낸다.
    
    // fetchMealData : API로 부터 데이터를 가져오는 역할을 함
    const fetchMealData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.mealServiceDietInfo) {
          // data 에 nealServiceDietInfo 가 있으면 그 안에서 급식 정보를 추출해 meals 상태에 저장
          setMeals(data.mealServiceDietInfo[1].row[meal]);
        } else {
          setMeals([]); // 급식 정보 없으면 meals 를 빈 배열로 설정
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
  // meals, loading, error 라는 세 가지 값을 객체 형태로 반환
  // 이 값들은 App.js 에서 
};

export default useFetchMeals;
