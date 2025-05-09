import React from 'react'
import styles from './FilterBlock.module.scss'
import FilterButton from '../buttons/filter/FilterButton'

type TFilterBlock = {
  title?: string,
  id: string,
  withFilter?: boolean,
  children: React.ReactNode
}

const FilterBlock: React.FC<TFilterBlock> = ({ title, id, withFilter, children }) => {
  return (
    <div className={`flex column ${styles.filterBlockContainer} filter__block`} id={id}>
      {title && <div className={`flex align_center justify__space__between ${styles.titleContainer}`}>
        <span className={styles.filterBlockTitle}>{title}</span>
        {withFilter && <FilterButton/>}
      </div>}

      <div className={`flex flex__wrap ${styles.filterBlock} filter__block__content`}>
        {children}
      </div>
    </div>
  )
}

export default FilterBlock
