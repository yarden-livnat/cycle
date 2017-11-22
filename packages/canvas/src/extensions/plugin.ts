import {
  ILayoutRestorer, JupyterLab, JupyterLabPlugin
} from '@jupyterlab/application';

import {
   ICommandPalette, IMainMenu, InstanceTracker
} from '@jupyterlab/apputils';

import {
  Token, JSONExt, ReadonlyJSONObject
} from '@phosphor/coreutils';


import { CycleCanvas } from '../canvas';

namespace CommandIDs {
  export const open = 'canvas:open';
}

export
interface ICanvasExtension {}

export
const CanvasExtension = new Token<ICanvasExtension>('jupyter.extension.cycle.canvas');

export
const canvasExtension: JupyterLabPlugin<void> = {
  id: CanvasExtension.name,
  autoStart: true,
  requires: [ ICommandPalette, ILayoutRestorer],
  activate: activateCanvas
};


function activateCanvas(app: JupyterLab, palette: ICommandPalette, restorer: ILayoutRestorer) {
  let manager = app.serviceManager;
  let category = 'Cycle';
  let command: string;

  let widget: CycleCanvas;

  const tracker = new InstanceTracker<CycleCanvas>({namespace: 'cycle'});

  restorer.restore(tracker, {
    command: CommandIDs.open,
    args: () => ({
      path: JSONExt.emptyObject,
      name: 'Canvas'
    }),
    name: () => 'Canvas'
  });

  app.commands.addCommand(CommandIDs.open, {
    label: 'Canvas',
    execute: () => {
      if (!widget)
        widget = new CycleCanvas()

      if (!tracker.has(widget))
        tracker.add(widget)

      if (!widget.isAttached)
        app.shell.addToMainArea(widget);
      else
        widget.update();

      app.shell.activateById(widget.id);
    }
  });

  palette.addItem({
    category: 'Cycle',
    command: CommandIDs.open
  });
}
