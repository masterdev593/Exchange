import React, { Component } from 'react';
import { Form, Button, Input, TextArea } from 'semantic-ui-react';
// import { throws } from 'assert';

class ContactDetails extends Component {
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render() {
        const { values } = this.props
        const {email, opinion} = values
        return (
            <Form color='blue' >
                <h1 className="ui centered">Como contactarnos</h1>
                <Form.Input
                        label='Email de Contacto'
                        name='email'
                        control={Input}
                        placeholder='ejemplo@gmail.com'
                        value={email}
                        onChange={this.props.handleChange('email')}
                    />

                    <Form.Field
                        id='form-textarea-control-opinion'
                        name='opinion'
                        control={TextArea}
                        label='Comentarios'
                        placeholder='Comentario Adicional'
                        value={opinion}
                        onChange={this.props.handleChange('opinion')}
                    />
                
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default ContactDetails;