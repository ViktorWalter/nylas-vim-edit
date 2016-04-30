class PreferencesStore {

  DefaultTerminal = "termite";

  constructor() {
    this.unsubscribes = [];
  }

  activate() {
    //this.unsubscribes.push(
      //SignatureActions.setSignatureForAccountId.listen(this._onSetSignatureForAccountId)
    //);
  }

  deactivate() {
    //this.unsubscribes.forEach(unsub => unsub());
  }

  getTerminal() {
    const saved = NylasEnv.config.get(`vim-edit.terminal`);
    if (saved === undefined) {
      return this.DefaultTerminal;
    }
    return saved;
  }

  _onSetTerminal = (terminal) => {
    NylasEnv.config.set(`vim-edit.terminal`, terminal)
  }
}

export default new PreferencesStore();
