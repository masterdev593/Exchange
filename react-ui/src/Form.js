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
            alert("Please add an email");
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
                            placeholder='Moneda a enviar'
                            search
                            searchInput={{ id: 'form-select-control-coin-send' }}
                            name='currencySend'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            id='form-input-control-money-value'
                            control={Input}
                            value={moneyQty}
                            label='Cuanto de la moneda?'
                            placeholder='$'
                            name='moneyQty'
                            onChange={this.handleChange}
                        />
                        <Form.Field
                            control={Select}
                            options={payOptions}
                            label={{ children: 'Metodo', htmlFor: 'form-select-control-method-send' }}
                            placeholder='Metodo de pago'
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
                        placeholder='Metodo de recibir'
                        name='methodReceive'
                        search
                        searchInput={{ id: 'form-select-control-method-receive' }}
                        onChange={this.handleChange}
                    />
                    <Form.Field
                        control={Select}
                        options={countryOptions}
                        label={{ children: 'Pais de Destino', htmlFor: 'form-select-control-country-receive' }}
                        placeholder='Elija un Pais con cobertura'
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
                        label={<label>Acepto los Terminos y condiciones</label>}
                        onChange={this.toggle}
                    />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        label='Confirma la informacion'
                        content='Submit'
                        onChange={this.handleChange}
                        disabled={checked ? false : true}
                    />
                </Form>

                {/* Comento estas lineas porque generan un error, cuando este configurado descomentar y revisar el funcionamiento */}


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
    { key: 'cArg', text: 'Pesos Argentinos', value: 'ARS' },
    { key: 'R$', text: 'Real Brasileño', value: 'BRL' },
    { key: 'cChi', text: 'Pesos Chilenos', value: 'CLP' },
    { key: 'cCol', text: 'Pesos Colombianos', value: 'COP' },
    { key: 'cCub', text: 'Pesos Cubanos', value: 'CUP' },
    { key: 'kr', text: 'Corona Danesa', value: 'DKK' },
    { key: 'cMex', text: 'Pesos Mexicanos', value: 'MXN' },
    { key: '€', text: 'Euro', value: 'EUR' },
    { key: '¥', text: 'Yen', value: 'JPY' },
    { key: '$', text: 'Dolares', value: 'USD' },
]

const payOptions = [
    { key: 'paypal', text: 'PayPal', value: 'paypal' },
    { key: 'bank', text: 'Transferencia Bancaria', value: 'bank' },
]

const countryOptions = [
    { pos: 0, key: 'arg', text: 'Argentina', value: 'arg' },
    { pos: 1, key: 'bra', text: 'Brasil', value: 'bra' },
    { pos: 2, key: 'chl', text: 'Chile', value: 'chl' },
    { pos: 3, key: 'chn', text: 'China', value: 'chn' },
    { pos: 4, key: 'col', text: 'Colombia', value: 'col' },
    { pos: 5, key: 'cub', text: 'Cuba', value: 'cub' },
    { pos: 6, key: 'dnk', text: 'Dinamarca', value: 'dnk' },
    { pos: 7, key: 'ecu', text: 'Ecuador', value: 'ecu' },
    { pos: 8, key: 'esp', text: 'España', value: 'esp' },
    { pos: 9, key: 'jpn', text: 'Japon', value: 'jpn' },
    { pos: 10, key: 'mex', text: 'Mexico', value: 'mex' },
    { pos: 11, key: 'pry', text: 'Paraguay', value: 'pry' },
    { pos: 12, key: 'per', text: 'Peru', value: 'per' },
    { pos: 13, key: 'usa', text: 'USA', value: 'usa' },
]


// Buscador de Pais --> Valor de Moneda

const countreis = _.times(countryOptions.length, (i) => ({
    pos: i,
    key: countryOptions[i].key,
    text: countryOptions[i].text,
    value: countryOptions[i].value,
}))

let select = countreis[0].pos;

console.log(select);