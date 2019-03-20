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

});
