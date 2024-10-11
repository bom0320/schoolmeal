import React from 'react';

const MealItem = ({ meal }) => {
  return (
    <li>
      <h2>{meal.MLSV_YMD}</h2>
      <p>메뉴: {meal.DDISH_NM}</p>
      <p>칼로리: {meal.CAL_INFO}</p>
      <hr />
    </li>
  );
};

export default MealItem;
