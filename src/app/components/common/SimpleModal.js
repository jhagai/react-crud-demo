// @flow
import * as React from "react";
import {
    Modal,
    Button
} from 'react-bootstrap'

type Props = {title:string, body:string, show:boolean, close:?()=>void};

class SimpleModal extends React.PureComponent<any, Props,{closed:boolean}> {
    state: {closed:boolean};

    constructor(props: {title:string, body:string, show:boolean}) {
        super(props);
        this.state = {closed: false};
        (this:any).close = this.close.bind(this);
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.show !== this.props.show) {
            this.setState(
                (state) => {
                    return {...state, closed: false}
                }
            );
        }
    }

    close() {
        this.setState(
            (state) => {
                return {...state, closed: true}
            }
        );
        if (this.props.close) {
            this.props.close();
        }
    }

    render() {
        return (
            <div className="static-modal">
                <Modal show={this.props.show && ! this.state.closed}>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={this.close}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>);
    }
}

export default SimpleModal