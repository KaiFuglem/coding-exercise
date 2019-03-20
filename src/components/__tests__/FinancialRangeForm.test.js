import { mount } from '@vue/test-utils'
import FinancialRangeForm from '../FinancialRangeForm.vue'

describe('FinancialRangeForm component', () => {

  test('renders correctly', () => {
    const wrapper = mount(FinancialRangeForm);
    expect(wrapper.element).toMatchSnapshot()
  });

  test('expand function properly expands thousands shorthand', () => {
    // Arrange
    const wrapper = mount(FinancialRangeForm);
    const testValue = '120k';
    // Act
    const expandedValue = wrapper.vm.expand(testValue);
    // Assert
    expect(expandedValue).toBe('120000');
  });

  test('expand function properly expands millions shorthand', () => {
    // Arrange
    const wrapper = mount(FinancialRangeForm);
    const testValue = '120m';
    // Act
    const expandedValue = wrapper.vm.expand(testValue);
    // Assert
    expect(expandedValue).toBe('120000000');
  });

  test('computedMin returns NaN for strings', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          minValue: 'test',
        };
      },
    });
    const computedMin = wrapper.vm.computedMin;
    // Assert
    expect(Number.isNaN(computedMin)).toBe(true);
  });

  test('computedMin returns Number for valid numbers', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          minValue: '123.8',
        };
      },
    });
    const computedMin = wrapper.vm.computedMin;
    // Assert
    expect(Number.isNaN(computedMin)).toBe(false);
    expect(computedMin).toBe(123.8);
  });

  test('computedMin returns correct Number for shorthand numbers', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          minValue: '123.8k',
        };
      },
    });
    const computedMin = wrapper.vm.computedMin;
    // Assert
    expect(Number.isNaN(computedMin)).toBe(false);
    expect(computedMin).toBe(123800);
  });

  test('computedMax returns NaN for strings', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          maxValue: '12s',
        };
      },
    });
    const computedMax = wrapper.vm.computedMax;
    // Assert
    expect(Number.isNaN(computedMax)).toBe(true);
  });

  test('computedMax returns Number for valid numbers', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          maxValue: '123.8999',
        };
      },
    });
    const computedMax = wrapper.vm.computedMax;
    // Assert
    expect(Number.isNaN(computedMax)).toBe(false);
    expect(computedMax).toBe(123.8999);
  });

  test('computedMax returns correct Number for shorthand numbers', () => {
    // Arrange + Act
    const wrapper = mount(FinancialRangeForm, {
      data() {
        return {
          maxValue: '50000m',
        };
      },
    });
    const computedMax = wrapper.vm.computedMax;
    // Assert
    expect(Number.isNaN(computedMax)).toBe(false);
    expect(computedMax).toBe(50000000000);
  });

});
