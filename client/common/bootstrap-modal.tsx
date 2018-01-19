import React from 'react';

interface Props {
    onConfirm?: () => void;
    onCancel?: () => void;
    onHidden?: () => void;
    confirm?: string;
    cancel?: string;
    title: string;
    show?: boolean;
}

class BootstrapModal extends React.Component<Props> {
    element: any;
    div: any;

    componentDidMount() {
        this.element = $(this.div);
        this.element.modal({ backdrop: 'static', keyboard: true, show: false });
        this.element.on('hidden.bs.modal', this.handleHidden.bind(this));

        if (this.props.show) {
            this.open();
        }
    }

    componentWillUnmount() {
        this.element.off('hidden.bs.modal', this.handleHidden.bind(this));
    }

    close() {
        this.element.modal('hide');
    }

    open() {
        this.element.modal('show');
    }

    render() {
        let confirmButton = null;
        let cancelButton = null;

        if (this.props.confirm) {
            confirmButton = (
                <button
                    onClick={() => this.handleConfirm()}
                    className="btn btn-primary">
                    {this.props.confirm}
                </button>
            );
        }

        if (this.props.cancel) {
            cancelButton = (
                <button onClick={() => this.handleCancel()} className="btn btn-default">
                    {this.props.cancel}
                </button>
            );
        }

        return (
            <div className="modal" ref={(c) => this.div = c} tabIndex={-1}>
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{this.props.title}</h5>
                            <button type="button" className="close" onClick={() => this.handleCancel()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.children}
                        </div>
                        <div className="modal-footer">
                            {cancelButton}
                            {confirmButton}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    handleCancel() {
        if (this.props.onCancel) {
            this.props.onCancel();
        }

        this.close();
    }

    handleConfirm() {
        if (this.props.onConfirm) {
            this.props.onConfirm();
        }
    }

    handleHidden() {
        if (this.props.onHidden) {
            this.props.onHidden();
        }
    }
}

export default BootstrapModal;
