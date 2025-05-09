import React, { useEffect, useState } from 'react';
import styles from './AnimatedDigit.module.scss';

const AnimatedDigit:React.FC<{value:number, className?:string}> = ({ value, className }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    setDisplayValue(value);
  }, [value]);

  return (
    <div className={styles.digitWrapper}>
      <div className={`${styles.digitContainer} ${className}`} style={{ transform: `translateY(-${displayValue * 10}%)` }}>
        {[...Array(10)].map((_, i) => (
          <div key={i} className={styles.number}>
            {i}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimatedDigit;