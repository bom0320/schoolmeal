import React from 'react';

const MealItem = ({ meal }) => {
    return (
        <li>
            <h2>{meal.MMEAL_SC_NM}</h2>  {/* 조식, 중식, 석식 출력 */}
            <p>
              <span dangerouslySetInnerHTML={{ __html: meal.DDISH_NM.replace(/\n/g, '<br/>') }} />
            </p>
            <p>칼로리: {meal.CAL_INFO}</p>
            <hr />
        </li>
    );
};

export default MealItem;
