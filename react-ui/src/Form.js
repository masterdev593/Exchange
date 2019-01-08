import React, { Component } from 'react'
import { Form, Input, TextArea, Button, Select, Checkbox } from 'semantic-ui-react'

const coinsOptions = [
    { key: '$', text: 'dolares', value: 'USD' },
    { key: 'c', text: 'pesos', value: 'COP' },
]


export default class FormView extends Component {
    state = { moneyQty: '', email: '', submittedName: '', submittedEmail: '' }

    handleChange = (e, { name, value }) => this.setState({ [name]: value })

    handleSubmit = () => {
        const { moneyQty, email } = this.state
        if (email) {
            this.sendEmail(email).then(({ message }) => {
                alert(message);
            });
        } else {
            alert("Please add an email");
        }
        this.setState({ submittedName: moneyQty, submittedEmail: email, moneyQty: '', email: '' })
    }

    sendEmail = (email, userName = "Anakin Skywalker") => {
        return fetch("/api/send_email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, userName })
        }).then(response => response.json());
    };

    render() {
        const { moneyQty, email, submittedName, submittedEmail } = this.state

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group widths='equal'>
                        <Form.Field
                            control={Select}
                            options={coinsOptions}
                            label={{ children: 'Send', htmlFor: 'form-select-control-coin-send' }}
                            placeholder='Moneda a enviar'
                            search
                            searchInput={{ id: 'form-select-control-coin-send' }}
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
                            search
                            searchInput={{ id: 'form-select-control-method-send' }}
                        />
                    </Form.Group>
                    <Form.Input
                        label='Email'
                        name='email'
                        control={Input}
                        placeholder='ejemplo@ymail.com'
                        value={email}
                        onChange={this.handleChange}
                    />

                    {/* Receipt Area */}
                    <Form.Field
                        control={Select}
                        options={payOptions}
                        label={{ children: 'Metodo de recibir el envio', htmlFor: 'form-select-control-method-receive' }}
                        placeholder='Metodo de recibir'
                        search
                        searchInput={{ id: 'form-select-control-method-receive' }}
                    />
                    <Form.Field
                        control={Select}
                        options={countryOptions}
                        label={{ children: 'Pais de Destino', htmlFor: 'form-select-control-country-receive' }}
                        placeholder='Elija un Pais con cobertura'
                        search
                        searchInput={{ id: 'form-select-control-country-receive' }}
                    />
                    <Form.Field
                        id='form-textarea-control-opinion'
                        control={TextArea}
                        label='Opinion'
                        placeholder='Comentario Adicional'
                    />

                    <Form.Field control={Checkbox} label={<label>Acepto los Terminos y condiciones</label>} />
                    <Form.Field
                        id='form-button-control-public'
                        control={Button}
                        label='Confirma la informacion'
                        content='Submit'
                    />
                </Form>
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ moneyQty, email }, null, 2)}</pre>
                <strong>onSubmit:</strong>
                <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
            </div>
        )
    }
}


const payOptions = [
    { key: 'paypal', text: 'PayPal', value: 'paypal' },
    { key: 'bank', text: 'Transferencia Bancaria', value: 'bank' },
]

const countryOptions = [
    { key: 'usa', text: 'USA', value: 'usa' },
    { key: 'col', text: 'Colombia', value: 'col' },
]