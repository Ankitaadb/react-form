import React from 'react';

const HomeComponent = ({ renderForm, handleSubmit, schema }) => {
    return (
        <div className="container">
            <div>
                <form noValidate>
                    {renderForm(schema.properties, '')}
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default HomeComponent