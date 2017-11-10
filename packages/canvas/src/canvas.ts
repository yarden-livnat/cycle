import {
  Message
} from '@phosphor/messaging';

import {
  Cell, CodeCell
} from '@jupyterlab/cells';

import {
  nbformat
} from '@jupyterlab/coreutils';

import {
  PanelLayout, Widget
} from '@phosphor/widgets';

import {
  Drag, IDragEvent
} from '@phosphor/dragdrop';

import * as d3 from 'd3';
import {event as d3event} from 'd3';

import {CanvasItem} from './canvas_item';

const JUPYTER_CELL_MIME = 'application/vnd.jupyter.cells';

export
class CycleCanvas extends Widget {
  constructor() {
    super();

    console.log('new CycleCanvas');
    this.id = 'cyclus-canvas';
    this.title.label = 'canvas';;
    this.title.closable = true;
    this.addClass('cyclus-canvas');

    this.layout = new PanelLayout();

    d3.select(this.node)
      .on('p-dragenter', () => this.dragEnter())
      .on('p-dragleave', () => this.dragLeave())
      .on('p-dragover', () => this.dragOver())
      .on('p-drop', () => this.dragDrop());
  }

  private items: CanvasItem[] = [];

  get panelLayout() : PanelLayout {
    return this.layout as PanelLayout;
  }
  dragEnter() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }

  dragLeave() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
  }

  dragOver() {
    if (!d3.event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    d3.event.preventDefault();
    d3.event.stopPropagation();
    d3.event.dropAction = d3.event.proposedAction;
  }

  dragDrop() {
    let event = d3.event;
    if (!event.mimeData.hasData(JUPYTER_CELL_MIME)) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (event.proposedAction === 'none') {
      event.dropAction = 'none';
      return;
    }
    event.dropAction = 'copy';
    let cells : Cell[]= event.mimeData.getData('internal:cells'); //JUPYTER_CELL_MIME);
    for (let cell of cells) {
      if (cell instanceof CodeCell) {
        let item  = new CanvasItem(cell);
        this.items.push(item);
        this.panelLayout.addWidget(item);
      }
    }
  }
}
