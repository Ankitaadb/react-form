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
                        validations: {
                            required: true,
                            minLength: 5,
                            maxLength: 20
                        }
                    },
                    age: {
                        type: 'integer',
                        title: 'Age',
                        validations: {
                            required: true,
                            min: 18,
                            max: 60
                        }
                    },
                    location: {
                        properties: {
                            state: {
                                type: 'string',
                                title: 'State',
                                validations: {
                                    required: true,
                                    minLength: 3,
                                    maxLength: 20
                                }
                            },
                            city: {
                                type: 'string',
                                title: 'City',
                                validations: {
                                    required: true,
                                    minLength: 5,
                                    maxLength: 20
                                }
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
            formErrors: {},
            isValidated: false

        }
    }

    renderForm = (properties, parent, errors) => {
        const { types } = this.state
        return Object.keys(properties).map((data, index) =>
            properties[data].type ?
                <div className="form-group" key={index}>
                    <label>{properties[data].title}</label>
                    <input type={types[[properties[data].type]]} className={`form-control${errors && errors[data] ? ' form-error' : ''}`} data-validations={JSON.stringify(properties[data].validations)} name={parent ? `${parent}.${data}` : data}
                        onChange={event => this.handleChange(event.target.name, event.target.value, event.target.attributes['data-validations'])} />
                    {errors ? <div className="error">
                        {errors[data]}
                    </div> : null}
                </div> :
                this.renderForm(properties[data].properties, data, errors ? errors[data] : '')

        )
    }

    handleChange = (key, value, attributes) => {
        let { formValues, formErrors } = this.state
        formValues = this.createFormValuesObject(key.split('.'), value, formValues)
        formErrors = this.createFormErrorsObject(key.split('.'), value, formErrors, JSON.parse(attributes.value))
        this.setState({
            formValues,
            formErrors
        });
    }

    createFormValuesObject = (keys, value, formValues) => {
        let key = keys[0]
        if (keys.length === 1) {
            return Object.assign({}, formValues, { [key]: value })
        }
        keys.shift()
        return {
            ...formValues,
            [key]: this.createFormValuesObject(keys, value, formValues[key])
        }

    }

    createFormErrorsObject = (keys, value, formErrors, validations) => {
        let key = keys[0]
        if (keys.length === 1) {
            let errorMessage = ''
            var validationKeys = Object.keys(validations)
            for (let i = 0; i < validationKeys.length; i++) {
                errorMessage = this.validateField(validations, validationKeys[i], key, value)
                if (errorMessage)
                    break
            }
            if (!errorMessage) {
                delete formErrors[key]
                return formErrors
            }
            return Object.assign({}, formErrors, { [key]: errorMessage })

        }
        keys.shift()
        return {
            ...formErrors,
            [key]: this.createFormErrorsObject(keys, value, formErrors[key], validations)
        }
    }

    validateField(validations, data, key, value) {
        switch (data) {
            case 'required':
                return value ? '' : `Required`
            case 'min':
                return value < validations[data] ? `${key} must be greater than ${validations[data]}` : ''
            case 'max':
                return value > validations[data] ? `${key} must be lesser than ${validations[data]}` : ''
            case 'minLength':
                return value.trim().length < validations[data] ? `${key} must be have ${validations[data]} characters` : ''
            case 'maxLength':
                return value.trim().length > validations[data] ? `${key} must be have ${validations[data]} characters` : ''
            default:
                return '';

        }
    }


    handleSubmit = () => {
        const { formValues, formErrors } = this.state
        if (this.test())
            return
        if (Object.keys(formErrors).length > 0) {
            return
        }
    }

    test = () => {
        let inputs = document.forms.namedItem('myform').getElementsByTagName('input')
        let isInvalid = false
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].value === '') {
                setTimeout(() => this.handleChange(inputs[i].name, inputs[i].value, inputs[i].attributes['data-validations']), 10*i)
                isInvalid = true
            }
        }
        return isInvalid


    }




    render() {
        const { schema, formValues, formErrors } = this.state
        return (
            <HomeComponent
                schema={schema}
                renderForm={this.renderForm}
                handleChange={this.handleChange}
                handleSubmit={this.handleSubmit}
                formValues={formValues}
                formErrors={formErrors} />

        )
    }
}

export default HomeContainer;
