
import {
  nbformat
} from '@jupyterlab/coreutils';

import {
  OutputArea
} from '@jupyterlab/outputarea';

import {
  Widget, PanelLayout
} from '@phosphor/widgets';


import {
  CodeCell
} from '@jupyterlab/cells';

export
class CanvasItem extends Widget {
  constructor(cell: CodeCell) {
    super();
    this.addClass('cycle-canvas-item');

    this.outputArea = new OutputArea({
      model: cell.outputArea.model,
      rendermime: cell.outputArea.rendermime,
      contentFactory: cell.contentFactory
    });

    let layout = this.layout = new PanelLayout();
    layout.addWidget(this.outputArea);
  }


  private outputArea: OutputArea;
}
