## Edit in Vim

Do you love Nylas N1 email client? No? It's okay because now you're gonna: instead of the default boring editor, you will be using Vim to edit your emails! Yes, Vim with the same .vimrc that you put lots of love and effort into. Don't thank me! Or do if you like the plugin. Whatever! :stuck_out_tongue_winking_eye:

### This fork
Current Nylas mail did not work with the original. I have made some minimal corrections for it to actually start.

### Install
From the N1 menu, select "Install a plugin..." and choose the directory with the plugin's sources. All the dependencies will be resolved automatically.

### Install as a dev package
```
$ cd ~/.nylas/dev/packages
$ git clone https://github.com/last5bits/nylas-vim-edit.git vim-edit
```

Please note that this plugin depends on "temp". So. Go into `~/.nylas/dev/packages/vim-edit` and execute the following:
```
$ npm install temp
```

### TODO
I should arrange for a keybinding to the button. I have tried mousetrap unsuccessfully, so any help is appreciated.
Preferences tab should be repaired too, it doesn't work with current version of Nylas.
