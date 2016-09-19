jest.disableAutomock();

import React from 'react';
import { mount } from 'enzyme';
import Amount from '../';

describe('Amount', function() {
  it('defaults to second preset amount', function() {
    const element = mount(<Amount amounts={[10,20,30,40]} />);
    expect(element.find('.AmountRadio--selected').first().text()).toEqual('20');
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(20);
  });

  it('allows you to set initial preset value', function() {
    const element = mount(<Amount amounts={[10,20,30,40]} amount={30}/>);
    expect(element.state('preset')).toBe(30);
    expect(element.state('custom')).toBe(null);
    expect(element.find('.AmountRadio--selected').first().text()).toEqual('30');
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(30);
  });

  it('allows you to set initial custom value', function() {
    const element = mount(<Amount amounts={[10,20,30,40]} amount={123}/>);
    expect(element.state('preset')).toBe(null);
    expect(element.state('custom')).toBe(123);
    expect(element.find('.AmountRadio--selected').length).toEqual(0);
    expect(element.find({ name: 'AmountInput-amount' }).prop('value')).toEqual(123);
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(123);
  });

  it('allows you to set label', function() {
    const element = mount(<Amount label="testLabel" />);
    expect(element.find('.AmountRadio--selected')).toBeDefined();
    expect(element.find('.Amount__label').text()).toContain('testLabel');
  });

  it('allows you to select a preset', function() {
    const element = mount(<Amount />);
    const select = element.find({ value: 1500 })

    select.simulate('click');

    expect(element.state('preset')).toBe(1500);
    expect(element.state('custom')).toBe(null);
    expect(element.find('.AmountRadio--selected').text()).toContain('1500');
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(1500);
  });

  it('allows you to enter a custom value', function() {
    const element = mount(<Amount />);
    const input = element.find({ type: 'text' });

    input.simulate('change', { target: { value: 123 }});

    expect(element.state('custom')).toBe(123);
    expect(element.state('preset')).toBe(null);
    expect(element.find('.AmountRadio--selected')).toBeDefined();
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(123);
  });

  it('exposes selected value through callback', function() {
    const callback = jest.genMockFunction();
    const element = mount(<Amount output={ callback } />);
    expect(callback).lastCalledWith(700);

    const input = element.find({ type: 'text' });
    input.simulate('change', { target: { value: 123 }});
    expect(callback).lastCalledWith(123);

    const select = element.find({ value: 1500 })
    select.simulate('click');
    expect(callback).lastCalledWith(1500);
    expect(element.find({ name: 'amount' }).prop('value')).toEqual(1500);
  });
});
