import React, { Component } from 'react';
import { HomeComponent } from '../components'

class HomeContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            schema: {
                properties: {
                    name: {
                        type: 'string',
                        title: 'Name of Person',
                        validations: [{
                            required: true,
                            minLength: 5,
                            maxLength: 20
                        }]
                    },
                    age: {
                        type: 'integer',
                        title: 'Age',
                        validations: [{
                            required: true,
                            min: 18,
                            max: 60
                        }]
                    },
                    location: {
                        properties: {
                            state: {
                                type: 'string',
                                title: 'State',
                                validations: [{
                                    required: true,
                                    minLength: 3,
                                    maxLength: 20
                                }]
                            },
                            city: {
                                type: 'string',
                                title: 'City',
                                validations: [{
                                    required: true,
                                    minLength: 5,
                                    maxLength: 20
                                }]
                            }
                        },
                        title: 'location'
                    }
                }
            },
            types: {
                string: 'text',
                integer: 'number'
            },
            formValues: {},
            isValidated: false

        }
    }

    renderForm = (properties, parent) => {
        const { types } = this.state
        return Object.keys(properties).map((data, index) =>
            properties[data].type ?
                <div className="form-group" key={index}>
                    <label>{properties[data].title}</label>
                    <input type={types[[properties[data].type]]} className="form-control" name={parent ? `${parent}.${data}` : data}
                        onChange={event => this.handleChange(event.target.name, event.target.value)} />
                </div> :
                this.renderForm(properties[data].properties, data)

        )
    }

    handleChange = (key, value) => {
        let formValues = this.state.formValues
        let keys = key.split('.')
        formValues = this.createFormValuesObject(keys, value, formValues)
        this.setState({
            formValues
        });
    }

    createFormValuesObject = (keys, value, formValues) => {
        if (keys.length === 1) {
            return Object.assign({}, formValues, { [keys[0]]: value })
        }
        let key = keys.shift()
        return {
            ...formValues,
            [key]: this.createFormValuesObject(keys, value, formValues[key])
        }

    }

    handleSubmit = () => {
        const { formValues } = this.state
    }


    render() {
        const { schema, formValues } = this.state
        return (
            <HomeComponent
                schema={schema}
                renderForm={this.renderForm}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} 
                formValues={formValues}/>

        )
    }
}

export default HomeContainer;
