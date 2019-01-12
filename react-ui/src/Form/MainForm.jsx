import React, { Component } from 'react';
import axios from 'axios'
import CurrenciesDetails from './Currencies';
import Confirmation from './Confirmation';
import Success from './Success';
import TransferDetails from './Transfer';
import ContactDetails from './Contact';
import currencies from '../currencies'

class MainForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            step: 1,
            currencyRates: [
                { key: 'ARS', text: 'Pesos Argentinos', value: '37.55' },
                { key: 'BRL', text: 'Real Brasileño', value: '3.70' },
                { key: 'CLP', text: 'Pesos Chilenos', value: '679.28' },
                { key: 'COP', text: 'Pesos Colombianos', value: '3151.15' },
                { key: 'CUP', text: 'Pesos Cubanos', value: '1.0' },
                { key: 'DKK', text: 'Corona Danesa', value: '6.52' },
                { key: 'MXN', text: 'Pesos Mexicanos', value: '19.35' },
                { key: 'EUR', text: 'Euro', value: '0.87' },
                { key: 'JPY', text: 'Yen', value: '108.85' },
                { key: 'USD', text: 'Dolares', value: '1' },
            ],
            moneyQty: 0,
            currencySend: 1,
            payOptions: [
                { key: 'paypal', text: 'PayPal', value: 'paypal' },
                { key: 'bank', text: 'Transferencia Bancaria', value: 'bank' },
            ],
            countryOptions: [
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
            ],
            email: '',
            opinion: '',
            euroEquivalent: 0,
            methodSend: '',
            methodReceive: '',
            countryReceive: ''
        }
    }
    componentDidMount() {
        this.ratesAPI()
    }

    ratesAPI = () => {
        axios({
            method: 'post',
            url: `/api/get_exchange`
        })
            .then(resp => {
                const rates = resp.data.rates.data.rates // TODO: poner restricciones y try/catch
                this.setCurrencyRates(rates)
            })
    }

    setCurrencyRates = (rates) => {
        let currencyRates = [], symbol
        for (symbol in rates) {
            if (rates.hasOwnProperty(symbol)) {
                currencyRates.push({ key: symbol, text: currencies[symbol], value: rates[symbol] })
            }
        }
        this.setState({ currencyRates })

    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step: step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step: step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value })
    }
    set = (key, value) => this.setState({ [key]: value })
    render() {
        const { step } = this.state;
        const {
            currencyRates,
            moneyQty,
            currencySend,
            payOptions,
            countryOptions,
            email,
            opinion,
            euroEquivalent,
            methodSend,
            methodReceive,
            countryReceive
        } = this.state;
        const currencyValues = { currencyRates, moneyQty, currencySend, countryReceive, euroEquivalent };
        const transferValues = { payOptions, countryOptions, methodSend, methodReceive }
        const contactValues = { email, opinion }
        switch (step) {
            case 1:
                return <CurrenciesDetails
                    set={this.set}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={currencyValues}
                />
            case 2:
                return <TransferDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={transferValues}
                />
            case 3:
                return <ContactDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange={this.handleChange}
                    values={contactValues}
                />
            case 4:
                return <Confirmation
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    currencyValues={currencyValues}
                    transferValues={transferValues}
                    contactValues={contactValues}
                />
            case 5:
                return <Success />
            default:
                return <CurrenciesDetails
                    set={this.set}
                    nextStep={this.nextStep}
                    handleChange={this.handleChange}
                    values={currencyValues}
                />
        }
    }
}

export default MainForm;