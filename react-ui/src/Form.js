// Importaciónes
import _ from 'lodash'
import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select, Checkbox, Segment } from 'semantic-ui-react'

export default class FormView extends Component {
    state = { moneyQty: '', email: '', submittedName: '', submittedEmail: false, checked: false }
    toggle = () => this.setState({ checked: !this.state.checked })
    
    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const {
            email, moneyQty, methodReceive, currencySend, methodSend, countryReceive, opinion
        } = this.state
        const body = { moneyQty, methodReceive, currencySend, methodSend, countryReceive, opinion }
        if (email) {
            this.sendEmail(email, body).then(({ message }) => {
                alert(message);
            });
        } else {
            alert('Introduce un Correo Electrónico Valido');
        }
        this.setState({ submittedInfo: body, submittedEmail: email, moneyQty: '', email: '' })
    }

    sendEmail = (email, body) => {
        console.log('Trying to send email'+JSON.stringify(body))
        return fetch("/api/send_email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, userName: body })
        }).then(response => response.json());
    };

    render() {
        const { moneyQty, email, submittedInfo, submittedEmail, checked } = this.state

        return (
            <Segment inverted>
                <Form onSubmit={this.handleSubmit} inverted>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            options={coinsOptions}
                            label={{ children: 'Moneda a enviar', htmlFor: 'form-select-control-currency-send' }}
                            placeholder='Moneda a Enviar'
                            name='currencySend'
                            search
                            searchInput={{ id: 'form-select-control-coin-send' }}
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='form-input-control-money-value'
                            control={Input}
                            value={moneyQty}
                            label='Cuanto de la Moneda?'
                            placeholder='$'
                            name='moneyQty'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Select}
                            options={payOptions}
                            label={{ children: 'Metodo', htmlFor: 'form-select-control-method-send' }}
                            placeholder='Metodo de Pago'
                            name='methodSend'
                            search
                            searchInput={{ id: 'form-select-control-method-send' }}
                            onChange={this.handleChange}
                        />
                    </Form.Group>
                    <Form.Input
                        label='Email'
                        name='email'
                        control={Input}
                        placeholder='ejemplo@gmail.com'
                        value={email}
                        onChange={this.handleChange}
                    />

                    {/* Receipt Area */}
                    <Form.Field
                        control={Select}
                        options={payOptions}
                        label={{ children: 'Metodo de recibir el envio', htmlFor: 'form-select-control-method-receive' }}
                        placeholder='Metodo de Recibir'
                        name='methodReceive'
                        search
                        searchInput={{ id: 'form-select-control-method-receive' }}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        options={countryOptions}
                        label={{ children: 'Pais de Destino', htmlFor: 'form-select-control-country-receive' }}
                        placeholder='Elija un Pais con Cobertura'
                        name='countryReceive'
                        search
                        searchInput={{ id: 'form-select-control-country-receive' }}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        id='form-textarea-control-opinion'
                        name='opinion'
                        control={TextArea}
                        label='Comentarios'
                        placeholder='Comentario Adicional'
                        onChange={this.handleChange}
                    />

                    <Form.Field
                        control={Checkbox}
                        checked={checked}
                        label={<label>Acepto los Terminos y Condiciones</label>}
                        onChange={this.toggle}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        label='Confirma la Informacion'
                        content='Enviar'
                        onChange={this.handleChange}
                        disabled={checked ? false : true}
                    />
                </Form>

                <strong>onChange:</strong>
                <pre>{JSON.stringify({ moneyQty, email }, null, 2)}</pre>
                <strong>state:</strong>
                <pre>{JSON.stringify(this.state, null, 2)}</pre>
                <strong>onSubmit:</strong>
                <pre>{JSON.stringify({ submittedInfo, submittedEmail }, null, 2)}</pre>

            </Segment>
        )
    }
}

// Declaración de Constantes

const coinsOptions = [
    { key: 'ARS', text: 'Pesos Argentinos', value: '$-ARG' },
    { key: 'BRL', text: 'Real Brasileño', value: 'R$' },
    { key: 'CLP', text: 'Pesos Chilenos', value: '$-CHI' },
    { key: 'COP', text: 'Pesos Colombianos', value: '$-COL' },
    { key: 'CUP', text: 'Pesos Cubanos', value: '$-CUB' },
    { key: 'DKK', text: 'Corona Danesa', value: 'kr' },
    { key: 'MXN', text: 'Pesos Mexicanos', value: '$-MEX' },
    { key: 'EUR', text: 'Euro', value: '€' },
    { key: 'JPY', text: 'Yen', value: '¥' },
    { key: 'USD', text: 'Dolares', value: '$' },
]

const payOptions = [
    { key: 'paypal', text: 'PayPal', value: 'paypal' },
    { key: 'bank', text: 'Transferencia Bancaria', value: 'bank' },
]

const countryOptions = [
    { key: 'arg', text: 'Argentina', value: 'arg' },
    { key: 'bra', text: 'Brasil', value: 'bra' },
    { key: 'chl', text: 'Chile', value: 'chl' },
    { key: 'chn', text: 'China', value: 'chn' },
    { key: 'col', text: 'Colombia', value: 'col' },
    { key: 'cub', text: 'Cuba', value: 'cub' },
    { key: 'dnk', text: 'Dinamarca', value: 'dnk' },
    { key: 'ecu', text: 'Ecuador', value: 'ecu' },
    { key: 'esp', text: 'España', value: 'esp' },
    { key: 'jpn', text: 'Japon', value: 'jpn' },
    { key: 'mex', text: 'Mexico', value: 'mex' },
    { key: 'pry', text: 'Paraguay', value: 'pry' },
    { key: 'per', text: 'Peru', value: 'per' },
    { key: 'usa', text: 'USA', value: 'usa' },
]
