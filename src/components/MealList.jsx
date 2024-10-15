// 급식 목록을 렌더링하는 컴포넌트
import React from 'react';
import MealItem from './MealItem';
const MealList = ({ meals }) => {
    if (meals.length === 0) {
        return <p>급식 정보가 없어요.</p>;
    }

    return (
        <ul>
            {meals.map((meal, index) => (
                <MealItem key={index} meal={meal} />
            ))}
        </ul>
    );
};

export default MealList;