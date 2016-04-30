import {DraftStore, React} from 'nylas-exports';
import PreferencesStore from './preferences-store'

export default class VimButton extends React.Component {

  // Note: You should assign a new displayName to avoid naming
  // conflicts when injecting your item
  static displayName = 'VimButton';

  // When you register as a composer button, you receive a
  // reference to the draft, and you can look it up to perform
  // actions and retrieve data.
  static propTypes = {
    draftClientId: React.PropTypes.string.isRequired,
  };

  _onClick = () => {
    // Fetch the current editing session from the draft store
    DraftStore.sessionForClientId(this.props.draftClientId).then((session) => {
      var uintToString = (uintArray) => {
          var encodedString = String.fromCharCode.apply(null, uintArray),
              decodedString = decodeURIComponent(escape(encodedString));
          return decodedString;
      };

      var terminal = PreferencesStore.getTerminal();
      var temp = require("temp");
      var fs = require("fs");
      var spawn = require('child_process').spawn;
      //const messageBody = session.draft().plainTextBody();
      const messageBody = session.draft().body;

      // Automatically track and cleanup files at exit
      temp.track();

      // Open temporary file
      temp.open("n1-vim-", (error, info) => {
        if(error) {
          throw error;
        }

        // Write the current message body into the file
        fs.write(info.fd, messageBody);

        // Close the file and perform all that necessary
        fs.close(info.fd, (error) => {
          if(error) {
            throw error;
          }

          // Edit the temporary file with vim
          var vim = spawn(terminal, ["-e", `vim ${info.path}`]);

          vim.on("close", (rc) => {
              // Convert byte-array into string and then 
              // convert regular new-lines into the HTML new lines
              const newBody = uintToString(fs.readFileSync(info.path))
                .replace(/\r\n|\n|\r/g, '<br />');

              // Put the new message back again
              session.changes.add({body: newBody});
          });

        });
      });
    });
  }

  render() {
    return (
      <div className="vim-edit">
        <button className="btn" onClick={() => this._onClick()} ref="button">
          Edit in Vim
        </button>
      </div>
    );
  }
}
