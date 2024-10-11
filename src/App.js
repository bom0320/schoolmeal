import React from 'react';
import MealList from './components/MealList';
import useFetchMeals from './useFetchMeals';

const App = () => {
  let now = new Date();
  let day = String(now.getDate()); 
  let month = String(now.getMonth()); 
  let year = String(now.getFullYear());
  
  let today = year + month.padStart(2, '0') + day.padStart(2, '0');
  
  const API_KEY = 'e2e38e8c19fa49f8b9050101d8d386a7'; 
  const SD_SCHUL_CODE = '7380292';  
  const ATPT_OFCDC_SC_CODE = 'F10'; 
  
  // API URL 생성
  const API_URL = `https://open.neis.go.kr/hub/mealServiceDietInfo?KEY=${API_KEY}&Type=json&pIndex=1&pSize=100&ATPT_OFCDC_SC_CODE=${ATPT_OFCDC_SC_CODE}&SD_SCHUL_CODE=${SD_SCHUL_CODE}&MLSV_YMD=${today}`;
  

  const { meals, loading, error } = useFetchMeals(API_URL);

  // 로딩 상태 처리
  if (loading) {
    return <div>Loading...</div>
  }

  // 에러 발생 시 처리
  if (error) {
    return <div>Error: {error.message}</div>
  }
  return (
    <div>
      <div className='header'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlpx5M5t6y0B6J6jt0f2XhMpCjC5epkyOfKQ&s' alt='학교 사진' width="288" height="175"/>
            <h1 className='font'>광주 소프트웨어마이스터고등학교 오늘의 급식판</h1>
            <MealList meals={meals} />
        </div>
    </div>
  );
};

export default App;