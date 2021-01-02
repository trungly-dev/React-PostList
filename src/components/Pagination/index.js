import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {
    pagination: PropTypes.object.isRequired,
    onPaginationChange: PropTypes.func,
    
};
Pagination.defaultProps = {
    pagination: null,
    onPaginationChange: null
}


function Pagination(props) {

    const {pagination , onPaginationChange } = props;
    const endPage = Math.ceil(pagination._totalRows / pagination._limit );

    const handlePaginationClick = ( page ) => {
        if (!onPaginationChange) return;
        onPaginationChange (page);
    }

    return (
        <div>
            <button
                disabled={pagination._page <= 1}
                onClick={() => handlePaginationClick( pagination._page -1 )}
            >
                Prev
            </button>
            <button
                disabled={pagination._page >= endPage}
                onClick={() => handlePaginationClick (pagination._page +1)}
            >
                Next
            </button>
            
        </div>
    );
}

export default Pagination;
