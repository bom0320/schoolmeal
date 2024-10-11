import React, { useState } from 'react';
import MealList from './components/MealList';
import useFetchMeals from './useFetchMeals';

const App = () => {
  const [mealType, setMealType] = useState('조식');  // 기본값을 '조식'으로 설정

  const API_KEY = 'e2e38e8c19fa49f8b9050101d8d386a7'; 
  const SD_SCHUL_CODE = '7380292';  
  const ATPT_OFCDC_SC_CODE = 'F10'; 

  let now = new Date();
  let day = String(now.getDate()); 
  let month = String(now.getMonth() + 1);  // 월은 0부터 시작하므로 +1 필요
  let year = String(now.getFullYear());
  
  let today = year + month.padStart(2, '0') + day.padStart(2, '0');
  
  const API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${today}`;
  
  const { meals, loading, error } = useFetchMeals(API_URL);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // 필터링된 데이터를 mealType(조식, 중식, 석식)에 따라 보여줌
  const filteredMeals = meals.filter(meal => meal.MMEAL_SC_NM === mealType);

  return (
    <div>
      <div className='header'>
        <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlpx5M5t6y0B6J6jt0f2XhMpCjC5epkyOfKQ&s' alt='학교 사진' width="288" height="175"/>
        <h1>광주소프트웨어마이스터고등학교 오늘의 급식판</h1>
        <button onClick={() => setMealType('조식')}>조식</button>
        <button onClick={() => setMealType('중식')}>중식</button>
        <button onClick={() => setMealType('석식')}>석식</button>
      </div>
      <MealList meals={filteredMeals} />
    </div>
  );
};

export default App;
