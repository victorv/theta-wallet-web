import React from "react";
import './ThetaTransactionListItem.css';
import moment from 'moment';
import TransactionStatus from './TransactionStatus'
import {truncate} from "../utils/Utils";
import _ from 'lodash';

class ThetaTransactionListItem extends React.Component {
    render() {
        let { transaction } = this.props;
        let {inputs, outputs, timestamp, bound, hash, is_local} = transaction;
        let input = inputs[0];
        let output = outputs[0];
        let from = input.address;
        let to = output.address;
        let isReceived = (bound === "inbound");
        let explorerUrl = `https://explorer.thetatoken.org/txs/${hash}`;

        //Truncate the addresses to help reduce the run ons
        from = truncate(from, 23, '...');
        to = truncate(to, 23, '...');

        let thetaAmount = _.get(output, ['coins', 'theta']);
        let tfuelAmount = _.get(output, ['coins', 'tfuel']);

        return (
            <a className="ThetaTransactionListItem"
               href={explorerUrl}
               target="_blank"
            >
                <div className="ThetaTransactionListItem__left-container">
                    <div className="ThetaTransactionListItem__top-container">
                        <TransactionStatus bound={bound} isLocal={is_local}/>
                    </div>
                    <div className="ThetaTransactionListItem__middle-container">
                        <div className="ThetaTransactionListItem__address-container">
                            <div className="ThetaTransactionListItem__address-prefix" >{isReceived ? "FROM:" : "TO:"}</div>
                            <div className="ThetaTransactionListItem__address">{isReceived ? from : to}</div>
                        </div>
                    </div>
                    <div className="ThetaTransactionListItem__bottom-container">
                        <div className="ThetaTransactionListItem__date">{moment.unix(timestamp).fromNow()}</div>
                    </div>
                </div>

                <div className="ThetaTransactionListItem__right-container">
                    <div className="ThetaTransactionListItem__amount">{thetaAmount}</div>
                    <div className="ThetaTransactionListItem__amount">{tfuelAmount}</div>
                </div>
            </a>
        );
    }
}

export default ThetaTransactionListItem;