import React, { Component } from 'react';
import { Button, List, Checkbox } from 'semantic-ui-react';

class Confirmation extends Component {
    state = { checked: false }
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }
    toggle = () => this.setState({ checked: !this.state.checked })

    handleSubmit = () => {
        const { currencyValues, transferValues, contactValues } = this.props;
        const { countryReceive, moneyQty, currencySend } = currencyValues
        const { methodSend, methodReceive } = transferValues
        const { email, opinion } = contactValues

        const body = { moneyQty, methodReceive, currencySend, methodSend, countryReceive, opinion }
        if (email) {
            this.sendEmail(email, body).then(({ message }) => {
                alert(message);
            });
        } else {
            alert('Introduce un Correo Electrónico Valido');
        }
        this.setState({ submittedInfo: body, submittedEmail: email, moneyQty: '', email: '', currencySend: '' })
    }

    sendEmail = (email, body) => {
        console.log('Trying to send email' + JSON.stringify(body))
        return fetch("/api/send_email", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, userName: body })
        }).then(response => response.json());
    };

    render() {
        const { currencyValues, transferValues, contactValues } = this.props;
        const { countryReceive, moneyQty, currencySend, euroEquivalent } = currencyValues
        const { methodSend, methodReceive } = transferValues
        const { email, opinion } = contactValues

        return (
            <div>
                <h1 className="ui centered">Confirme su solicitud:</h1>
                <List>
                    <List.Item>
                        <List.Icon name='currency' />
                        <List.Content>
                            Desea enviar {moneyQty}{currencySend}({euroEquivalent}) a {countryReceive}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='options' />
                        <List.Content>Enviara por medio de {methodSend} para ser recibido por {methodReceive}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            Para terminar el proceso nos comunicaremos al email {email}
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='inbox' />
                        <List.Content>Ademas, nos comenta que {opinion}</List.Content>
                    </List.Item>

                </List>
                <Checkbox
                    label={<label>Acepto los Terminos y Condiciones</label>}
                    checked={this.state.checked}
                    onChange={this.toggle}
                />
<hr/>
                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.saveAndContinue} disabled={this.state.checked ? false : true}>Confirm</Button>
            </div>
        )
    }
}

export default Confirmation;