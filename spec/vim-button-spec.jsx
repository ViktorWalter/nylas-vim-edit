import {React, ReactDOM} from 'nylas-exports';
const ReactTestUtils = require('react-addons-test-utils')

import VimButton from '../lib/vim-button';

describe("VimButton", () => {
  beforeEach(() => {
    this.component = ReactTestUtils.renderIntoDocument(
      <VimButton draftClientId="test" />
    );
  });

  it("should render into the page", () => {
    expect(this.component).toBeDefined();
  });

  it("should have a displayName", () => {
    expect(VimButton.displayName).toBe('VimButton');
  });

  it("should execute vim when clicked", () => {
    spyOn(this.component, '_onClick');
    const buttonNode = ReactDOM.findDOMNode(this.component.refs.button);
    ReactTestUtils.Simulate.click(buttonNode);
    expect(this.component._onClick).toHaveBeenCalled();
  });
});
