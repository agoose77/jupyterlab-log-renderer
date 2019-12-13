import {IRenderMimeRegistry} from '@jupyterlab/rendermime';
import {ILoggerRegistry} from '@jupyterlab/logconsole'
import {INotebookTracker} from '@jupyterlab/notebook'
import {LogRendererFactory} from "./factories";
import {JupyterFrontEnd, JupyterFrontEndPlugin} from '@jupyterlab/application';


const extension: JupyterFrontEndPlugin<void> = {
    id: '@agoose77/jupyterlab_log_renderer',
    autoStart: true,
    requires: [IRenderMimeRegistry, ILoggerRegistry, INotebookTracker],
    activate: (app: JupyterFrontEnd, registry: IRenderMimeRegistry, loggerRegistry: ILoggerRegistry, tracker: INotebookTracker) => {
        console.log('JupyterLab extension @agoose77/jupyterlab_log_renderer is activated!');
        registry.addFactory(new LogRendererFactory(loggerRegistry, tracker));
    }
};


export default extension;
