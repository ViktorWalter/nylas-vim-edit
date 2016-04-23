import {ComponentRegistry} from 'nylas-exports';
import {activate, deactivate} from '../lib/main';

import VimButton from '../lib/vim-button';

describe("activate", () => {
  it("should register the composer button", () => {
    spyOn(ComponentRegistry, 'register');
    activate();
    expect(ComponentRegistry.register).toHaveBeenCalledWith(VimButton, {role: 'Composer:ActionButton'});
  });
});

describe("deactivate", () => {
  it("should unregister the composer button", () => {
    spyOn(ComponentRegistry, 'unregister');
    deactivate();
    expect(ComponentRegistry.unregister).toHaveBeenCalledWith(VimButton);
  });
});
