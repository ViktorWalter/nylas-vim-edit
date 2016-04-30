import {React} from 'nylas-exports';
import PreferencesStore from './preferences-store'

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
        <div>
          <h3>Terminal emulator</h3>
          <input
            type="text"
            value={terminal}
            onChange={this._onEditTerminal}
          />
        </div>
      );
  }

  render() {
    return (
    <section className="container-preferences-vim">
      {this._renderTerminalEdit()}
    </section>
    );
  }

}

export default PreferencesVim;
