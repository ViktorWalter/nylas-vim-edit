import {React} from 'nylas-exports';
import PreferencesStore from './preferences-store'
import {Contenteditable} from 'nylas-component-kit';

class PreferencesVim extends React.Component {
  static displayName = 'PreferencesVim';

  constructor() {
    super();
  }

  _onEditTerminal = (event) => {
      const newTerminal = event.target.value;
      PreferencesStore.setTerminal(newTerminal);
  }

  _renderTerminalEdit() {
    const terminal = PreferencesStore.getTerminal();
    return (
        <Contenteditable
            value={terminal}
            onChange={this._onEditTerminal}
        />
        );
  }

  render() {
    return (
      <div>
        <section>
          {this._renderTerminalEdit()}
        </section>
      </div>
    );
  }

}

export default PreferencesVim;
