
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Card } from 'react-bootstrap';

class DetailedResults extends React.Component {
    constructor(props) {
        super(props);
        this.messageKeyBase = 200000;
    }
    render() {
        return (
            //Why animation={false}: https://github.com/react-bootstrap/react-bootstrap/issues/5075
            <Modal show={true} onHide={() => { this.props.toggleHideModal(false) }} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.modalTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body className={"overFlowX"}>
                    <Card className="paddingOneVW">
                        {this.props.detailTitles.map((message, index) =>
                            <p className='compact_P' key={this.messageKeyBase + index}>
                                <span>
                                    {message}
                                </span>
                                <strong className="dsColor">
                                    {this.props.detailContent[index]}
                                </strong>
                            </p>
                        )}
                    </Card>
                </Modal.Body>
            </Modal>
        );
    }
}

export default DetailedResults;
