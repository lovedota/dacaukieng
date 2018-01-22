import styles from '../styles/home-item.scss';
import classNames from 'classnames/bind';
import React from 'react';
import HomeActions from '../home-actions';

const cx = classNames.bind(styles);

export default (props) => {
    const { data } = props;

    return (
        <article
            className={cx('home-item')}
            onClick={() => HomeActions.openArticle(data)}
        >
            <div className={cx('home-item-content')}>
                <img
                    src={data.thumbnail}
                    alt="post img"
                    className={cx('home-item-thumb', 'img-responsive', 'img-thumbnail')}
                />
                <div className={cx('home-item-description')}>
                    <p>
                        {data.description}
                    </p>
                    <p className={cx('home-item-meta')}>
                        {data.createdDate}
                    </p>
                </div>

            </div>
        </article>
    );
};
