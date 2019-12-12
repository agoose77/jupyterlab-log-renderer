import {RenderedCommon} from "@jupyterlab/rendermime"
import {IRenderMime} from '@jupyterlab/rendermime-interfaces';
import {ILogger, ILogPayload, LogLevel} from '@jupyterlab/logconsole'
import {JSONObject} from '@phosphor/coreutils'


type LogType = "text" | "html" | "output";

/**
 * A mime renderer for displaying Markdown with embedded latex.
 */
export class LogRenderer extends RenderedCommon {
    /**
     * Construct a new rendered markdown widget.
     *
     * @param options - The options for initializing the widget.
     */

    logger: ILogger;

    constructor(options: IRenderMime.IRendererOptions, logger: ILogger) {
        super(options);
        this.logger = logger;
    }

    /**
     * Render a mime model.
     *
     * @param model - The mime model to render.
     *
     * @returns A promise which resolves when rendering is complete.
     */
    render(model: IRenderMime.IMimeModel): Promise<void> {
        const modelData = model.data[this.mimeType] as JSONObject;
        this.logger.log({
            type: modelData['type'] as LogType,
            data: modelData['data'],
            level: modelData['level'] as LogLevel
        } as ILogPayload);
        return Promise.resolve();
    }

}
