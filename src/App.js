import React, { useState } from 'react';
import MealList from './components/MealList';
import useFetchMeals from './useFetchMeals';

const App = () => {
  const [mealType, setMealType] = useState('조식');  // 기본값을 '조식'으로 설정
  const [currentDate, setCurrentDate] = useState(new Date());  // 현재 날짜를 상태로 설정
  const API_KEY = 'e2e38e8c19fa49f8b9050101d8d386a7'; 
  const SD_SCHUL_CODE = '7380292';  
  const ATPT_OFCDC_SC_CODE = 'F10'; 

  // 날짜를 yyyyMMdd 형식으로 변환하는 함수
  const formatDate = (date) => {  
    let day = String(date.getDate()); 
    let month = String(date.getMonth() + 1); 
    let year = String(date.getFullYear());
    return year + month.padStart(2, '0') + day.padStart(2, '0');
  };

  // 날짜 변경 함수
  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);  // days 값을 더하거나 빼서 새로운 날짜 계산
    setCurrentDate(newDate);  // 새로운 날짜로 상태 업데이트
  };

  const today = formatDate(currentDate);  // 변경된 날짜를 yyyyMMdd 형식으로 변환

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
        <h2>{today}</h2>  

        <button onClick={() => setMealType('조식')}>조식</button>
        <button onClick={() => setMealType('중식')}>중식</button>
        <button onClick={() => setMealType('석식')}>석식</button>
      </div>

      <div>
        <button className='daybutton left' onClick={() => changeDate(-1)}>&lt;</button>
        <button className='daybutton right' onClick={() => changeDate(1)}>&gt;</button>
      </div>

      <MealList meals={filteredMeals} />
    </div>
  );
};

export default App;
