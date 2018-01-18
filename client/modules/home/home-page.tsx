import React from 'react';
import BootstrapModal from 'client/common/bootstrap-modal';
import HomeActions from './home-actions';
import HomeList from './components/home-list';

import { connect } from 'react-redux';

interface Props {
    isLoaded: boolean;
    items: any[];
    total: number;
    selectedItem: any;
}
class HomePage extends React.Component<Props, any> {
    modal: any;

    componentDidMount() {
        if (!this.props.isLoaded) {
            HomeActions.init();
        }
    }

    componentWillUpdate(nextProps: Props) {
        if (this.modal && nextProps.selectedItem !== this.props.selectedItem) {
            this.modal.open();
        }
    }

    render() {
        const { items, isLoaded, total, selectedItem } = this.props;

        let content;
        let modal;

        if (!isLoaded) {
            content = (
                <div className="loader-wrapper">
                    <div className="loader" />
                </div>
            );
        } else if (total > 0) {
            content = (
                <HomeList
                    items={items}
                    total={total}
                />
            );
        } else {
            content = (
                <div className="text-center">No Items</div>
            );
        }

        if (selectedItem) {
            modal = (
                <BootstrapModal
                    ref={(c) => this.modal = c}
                    title={selectedItem.title}
                    show={true}
                >
                    <iframe
                        width="100%"
                        height={450}
                        src={selectedItem.url}
                        frameBorder={0}
                        allowFullScreen={true}
                    />
                </BootstrapModal>
            );
        }

        return (
            <div>
                {content}
                {modal}
            </div>
        );
    }
}

export default connect(
    ({home}) => ({
        isLoaded: home.isLoaded,
        items: home.items,
        total: home.total,
        selectedItem: home.selectedItem
    })
)(HomePage);
