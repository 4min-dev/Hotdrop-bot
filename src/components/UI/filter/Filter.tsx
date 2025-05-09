import React, { useEffect } from 'react'
import styles from './Filter.module.scss'
import IFilter from '../../../interfaces/IFilter'

type TFilters = {
    filters: IFilter[],
    setFilters: React.Dispatch<React.SetStateAction<IFilter[]>>
}

const Filter: React.FC<TFilters> = ({ filters, setFilters}) => {

    function filterHandler(filter: IFilter) {
        setFilters((prev) =>
            prev.map((item) => ({
                ...item,
                isActive: item.id === filter.id
            }))
        )
    }

    useEffect(() => {
        const activeFilter = filters.find((filter) => filter.isActive);

        if (!activeFilter) {
            const filterBlocks = Array.from(document.querySelectorAll('.filter__block')) as HTMLElement[]
            filterBlocks.forEach((block) => {
                block.style.display = 'none'
            })
            return;
        }

        const filterBlocks = Array.from(document.querySelectorAll('.filter__block')) as HTMLElement[];
        filterBlocks.forEach((block) => {
            if (block.id === activeFilter.value) {
                block.classList.remove('hidden')
            } else {
                block.classList.add('hidden')
            }
        });
    }, [filters])

    return (
        <div className={`flex align__center ${styles.filter}`}>
            {
                filters && filters.length > 0 && filters.map((filter) => (
                    <button type='button' className={`${styles.filterButton} ${filter.isActive ? styles.active : ''}`} onClick={() => filterHandler(filter)}>
                        {filter.title}
                    </button>
                ))
            }
        </div>
    )
}

export default Filter
