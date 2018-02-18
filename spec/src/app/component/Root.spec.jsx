import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Subject from '../../../../src/app/component/Root';

describe('<Root />', () => {
  it('renders', () => {
    const wrapper = shallow(<Subject />);
    expect(wrapper).to.have.length(1);
  });
});
