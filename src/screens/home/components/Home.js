import React from 'react';

const HomeComponent = ({ renderForm, handleSubmit, schema, formErrors }) => {
    return (
        <div className="container">
            <div>
                <form id="myform" className="form-section">
                <h5 className="text-center">User Info Form</h5>
                <p className="text-center">Enter your details for verfication</p>
                    {renderForm(schema.properties, '', formErrors)}
                    <button type="button" className="submit-button" onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    );
}

export default HomeComponent