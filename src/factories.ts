import {ILoggerRegistry} from '@jupyterlab/logconsole'
import {IRenderMime} from '@jupyterlab/rendermime-interfaces';
import {INotebookTracker} from '@jupyterlab/notebook'
import {LogRenderer} from './renderers'


export const MIME_TYPE = 'application/vnd.jupyterlab.log';

/**
 * A mime renderer factory for Markdown.
 */
class LogRendererFactory implements IRenderMime.IRendererFactory{
    safe: boolean; // true,
    mimeTypes: string[]; // [MIME_TYPE],
    defaultRank: number;
    loggerRegistry: ILoggerRegistry;
    notebookTracker: INotebookTracker;

    constructor(registry: ILoggerRegistry, tracker: INotebookTracker){
        this.loggerRegistry = registry;
        this.notebookTracker = tracker;

        this.safe = true;
        this.defaultRank = 60;
        this.mimeTypes = [MIME_TYPE];
    }
    createRenderer(options: IRenderMime.IRendererOptions): LogRenderer {
        const notebook = this.notebookTracker.currentWidget;
        const logger = this.loggerRegistry.getLogger(notebook.context.path);
        return new LogRenderer(options, logger);
    }
};

export {LogRendererFactory};
