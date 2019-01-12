import React, { Component } from 'react';
import { Form, Button, Select } from 'semantic-ui-react';
// import { throws } from 'assert';

class TransferDetails extends Component {
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
        const {payOptions, countryOptions} = values
        return (
            <Form color='blue' >
                <h1 className="ui centered">Como se realizara la transferencia</h1>
                <Form.Group widths='equal'>
                    <Form.Field
                        control={Select}
                        options={payOptions}
                        label={{ children: 'Metodo de Envio', htmlFor: 'form-select-control-method-send' }}
                        placeholder='Metodo de Pago'
                        name='methodSend'
                        search
                        searchInput={{ id: 'form-select-control-method-send' }}
                        onChange={this.props.handleChange('methodSend')}
                    />
                    <Form.Field
                        control={Select}
                        options={payOptions}
                        label={{ children: 'Metodo de recibir el envio', htmlFor: 'form-select-control-method-receive' }}
                        placeholder='Metodo de Recibir'
                        name='methodReceive'
                        search
                        searchInput={{ id: 'form-select-control-method-receive' }}
                        onChange={this.props.handleChange('methodReceive')}
                    />
                    <Form.Field
                        control={Select}
                        options={countryOptions}
                        label={{ children: 'Pais de Destino', htmlFor: 'form-select-control-country-receive' }}
                        placeholder='Elija un Pais con Cobertura'
                        name='countryReceive'
                        search
                        searchInput={{ id: 'form-select-control-country-receive' }}
                        onChange={this.props.handleChange('countryReceive')}
                    />
                </Form.Group>
                
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue}>Save And Continue </Button>
            </Form>
        )
    }
}

export default TransferDetails;