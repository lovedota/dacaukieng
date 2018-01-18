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
        if (!this.modal || !nextProps.selectedItem) {
            return;
        }
        if (nextProps.selectedItem !== this.props.selectedItem) {
            this.modal.open();
        }
    }

    componentWillUnmount() {
        this.modal.close();
        this.handleCloseModal();
    }

    render() {
        const { items, isLoaded, total, selectedItem } = this.props;

        let content;
        let iframe;

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
            iframe = (
                <iframe
                    width="100%"
                    height={450}
                    src={`${selectedItem.url}?rel=0&autoplay=1`}
                    frameBorder={0}
                    allowFullScreen={true}
                />
            );
        }

        return (
            <div>
                {content}
                <BootstrapModal
                    ref={(c) => this.modal = c}
                    title={selectedItem ? selectedItem.title : ''}
                    onCancel={() => this.handleCloseModal()}
                >
                    {iframe}
                </BootstrapModal>
            </div>
        );
    }

    handleCloseModal() {
        HomeActions.closeArticle();
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
