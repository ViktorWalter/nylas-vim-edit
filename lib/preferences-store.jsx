class PreferencesStore {

  DefaultTerminal = "urxvt";

  constructor() {
    this.unsubscribes = [];
  }

  getTerminal() {
    const saved = NylasEnv.config.get(`vim-edit.terminal`);
    if (saved === undefined) {
      return this.DefaultTerminal;
    }
    return saved;
  }

  setTerminal(terminal) {
    NylasEnv.config.set(`vim-edit.terminal`, terminal)
  }
}

export default new PreferencesStore();
