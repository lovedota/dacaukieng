import React from 'react';
import { shallow } from 'enzyme';
import classNames from 'classnames/bind';
import styles from '../styles/home-item.scss';

import HomeItem from '../home-item';
import HomeActions from '../../home-actions';

const cx = classNames.bind(styles);

it('should render article', () => {
    const data = {
        thumnail: 'image.png',
        description: 'test description',
        createdDate: '2018-01-23'
    };
    const wrapper = shallow(<HomeItem data={data}/>);

    expect(wrapper.find(`.${cx('home-item')}`)).toHaveLength(1);
});

it('should open details when clicking article', () => {
    const data = {
        thumnail: 'image.png',
        description: 'test description',
        createdDate: '2018-01-23'
    };
    const wrapper = shallow(<HomeItem data={data}/>);
    const event: any = {};

    spyOn(HomeActions, 'openArticle');

    wrapper.find(`.${cx('home-item')}`).prop('onClick')(event);

    expect(HomeActions.openArticle).toHaveBeenCalledWith(data);
});
