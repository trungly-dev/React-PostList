import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';

SearchForm.propTypes = {
    onSubmit: PropTypes.func,
};

SearchForm.defaultProps = {
    onSubmit: null
}

function SearchForm(props) {

    const { onSubmit } = props;
    const [searchTerm, setSearchTerm] = useState('');
    const typingTimoutRef = useRef(null);

    const handleSearchTermChange = (e) => {
        setSearchTerm(e.target.value); // display in input-box

        if ( !onSubmit ) return;
        if ( typingTimoutRef.current ) {
            clearTimeout(typingTimoutRef.current);
        }

        typingTimoutRef.current = setTimeout( () => {

            const formValues = { 
                searchTerm: e.target.value// the transfering parameter 
            };
            onSubmit( formValues );
        }, 300);


    }

    return (
        <form>
            <input
                type = 'text'
                value = {searchTerm}
                onChange= {handleSearchTermChange}
            />
        </form>
    );
}

export default SearchForm;