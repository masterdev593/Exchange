import React, { Component } from 'react';
import { Form, Button, Select, Input, Card, Placeholder } from 'semantic-ui-react';
// import { throws } from 'assert';

class CurrenciesDetails extends Component {
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    handleChange = (_e, { name, value }) => {
        const currentCurrency= this.props.values.currencyRates.filter(rate=>rate.value===value)
        this.props.set(name, currentCurrency[0].value)
    }

render() {
    const { values } = this.props
    const { currencyRates, moneyQty, currencySend } = values
    const euroEquivalent = Math.floor(((moneyQty / currencySend + 0.01) * 100) - 0.01) / 100
    return (
        <Form color='blue' >
            <h1 className="ui centered">Ingrese detalles de las divisas</h1>
            <Card.Group itemsPerRow={2}>
                <Card>
                    <Card.Content>
                        Moneda Origen
                <Placeholder>
                            <Placeholder.Image rectangular />
                        </Placeholder>
                    </Card.Content>
                </Card>
                <Card>
                    <Card.Content>
                        Moneda Destino
                <Placeholder>
                            <Placeholder.Image rectangular />
                        </Placeholder>
                    </Card.Content>
                </Card>
            </Card.Group>
            <Form.Group widths='equal'>
                <Form.Field
                    control={Select}
                    options={currencyRates}
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
                    label='Cantidad a Enviar'
                    placeholder='$'
                    name='moneyQty'
                    onChange={this.props.handleChange('moneyQty')}
                />
                <h3>{euroEquivalent}</h3>
                {/* <Form.Field
                        id='form-input-control-money-auto'
                        control={Input}
                        value={Math.floor(((moneyQty / currencySend + 0.01) * 100) - 0.01) / 100}
                        label='Cantidad a Recibir en euros'
                        placeholder=' €'
                        name='euroEquivalent'
                        onChange={this.props.handleChange('euroEquivalent')}
                    /> */}
            </Form.Group>
            <Button onClick={this.back}>Back</Button>
            <Button onClick={this.saveAndContinue}>Save And Continue </Button>
        </Form>
    )
}
}

export default CurrenciesDetails;