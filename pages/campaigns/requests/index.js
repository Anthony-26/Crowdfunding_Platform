import React, { Component } from "react";
import Layout from "../../../components/Layout";
import { Button, Table } from "semantic-ui-react";
import { Link } from '../../../routes';
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component {
    static async getInitialProps(props) {
        const { address } = props.query;
        const campaign = Campaign(address);
        const approversCount = await campaign.methods.approversCount().call();
        const requestCount = await campaign.methods.getRequestsCount().call();

        const requests = await Promise.all(
            Array(parseInt(requestCount)).fill().map((element, index) => {
                return campaign.methods.requests(index).call()
            })
            //Fill and map : used to return index
        );
        console.log(requests);
        return { address, requests, requestCount, approversCount };
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
          return (
            <RequestRow
              id={index}
              request={request}
              address={this.props.address}
              approversCount={this.props.approversCount}
            />
          );
        });
    }

    render() {
        const {Header, Row, HeaderCell, Body } = Table;
        return(
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style= {{ marginBottom: 10 }}>
                            {/* {{ -> JSX and Object */}
                            Add Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (Eth)</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>
                    Found {this.props.requestCount} requests.
                </div>
            </Layout>
        );
    }
}

export default RequestIndex;