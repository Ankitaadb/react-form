import React from 'react';

const HomeComponent = ({ renderForm, handleSubmit, schema, formErrors }) => {
    return (
        <div className="container">
            <div>
                <form id="myform">
                    {renderForm(schema.properties, '', formErrors)}
                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default HomeComponent