import {RenderedCommon} from "@jupyterlab/rendermime"
import {IRenderMime} from '@jupyterlab/rendermime-interfaces';
import {ILogger, LogLevel} from '@jupyterlab/logconsole'
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
        const type = modelData['type'] as LogType;
        const level = modelData['level'] as LogLevel;
        const data = modelData['data'] as any;

        this.logger.log({type: type, data: data, level: level});
        return Promise.resolve();
    }

}
