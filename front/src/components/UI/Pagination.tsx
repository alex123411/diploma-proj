import { FC } from 'react';
import { getPageCount, getPagesArray } from "../../utils/pages";

interface props {
    totalCount: number,
    page: number,
    limit: number,
    changePage: (num: number) => void
}

const Pagination: FC<props> = ({ totalCount, page, limit, changePage }) => {
    const pagesArray = getPagesArray(getPageCount(totalCount, limit))
    return (
        <div className={`pagination`}>
            {pagesArray.map((num) =>
                <button
                    key={num}
                    className={`btn btn-md  ${page == num ? 'btn-primary' : 'btn-light'}`}
                    onClick={() => changePage(num)}
                >
                    {num}
                </button>)
            }
        </div>
    );
};

export default Pagination;