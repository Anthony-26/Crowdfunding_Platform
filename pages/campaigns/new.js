import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import { Router } from '../../routes'; 

class CampaignNew extends Component {
    state = {
        minimumContribution: '',
        errorMessage: '',
        loading: false,
    };

    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({ loading: true, errorMessage: '' });
        try {
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution)
                .send({
                    from: accounts[0]
                    //Gas not needed because of Metamask
                });
            Router.pushRoute('/');
        } catch(err) {
            this.setState({ errorMessage: err.message });
        }
        this.setState({ loading: false })
    };

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>  
                {/* error set to false because errorMessage is set to '', otherwise error is true and the message is printed */}
                {/* !! used to go from string value to boolean value : 'true' -> false -> true */}
                    <Form.Field>
                        <label>
                            Minimum Contribution 
                        </label>
                        <Input 
                            label="Wei"
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({ minimumContribution: event.target.value })} 
                        />
                    </Form.Field>

                    <Message 
                        error 
                        header="Ooops!" 
                        content={this.state.errorMessage} 
                    />                

                    <Button 
                        loading={this.state.loading}
                        primary
                    >
                        Create
                    </Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;
