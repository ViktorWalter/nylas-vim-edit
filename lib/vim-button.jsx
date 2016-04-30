import {DraftStore, React} from 'nylas-exports';
import {RegExpUtils} from 'nylas-exports'
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

  // Convert byte-array into string
  _uintToString = (uintArray) => {
      var encodedString = String.fromCharCode.apply(null, uintArray),
          decodedString = decodeURIComponent(escape(encodedString));
      return decodedString;
  }

  _processBody = (body) => {
    const newBody = this._uintToString(body);

    // Split the body into new parts: after and before the signature
    // Treat "before" as regular text and insert al the brs and whatnot
    // Treat "after" as is
    const signatureRegex = RegExpUtils.signatureRegex();
    let signaturePoint = newBody.search(signatureRegex)
    beforeSignature = newBody.slice(0, signaturePoint);
    const afterSignature = newBody.slice(signaturePoint);

    // convert regular new-lines into the HTML new lines
    beforeSignature = beforeSignature.replace(/\r\n|\n|\r/g, '<br />');

    return beforeSignature + afterSignature;
  }

  _onClick = () => {
    // Fetch the current editing session from the draft store
    DraftStore.sessionForClientId(this.props.draftClientId).then((session) => {
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
        console.log(messageBody);

        // Close the file and perform all that necessary
        fs.close(info.fd, (error) => {
          if(error) {
            throw error;
          }

          // Edit the temporary file with vim
          var vim = spawn(terminal, ["-e", `vim ${info.path}`]);

          vim.on("close", (rc) => {
              newBody = this._processBody(fs.readFileSync(info.path));

              // Put the new message back again
              session.changes.add({body: newBody});
              console.log(newBody)
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
