import {RenderedHTMLCommon} from "@jupyterlab/rendermime"
import {IRenderMime} from '@jupyterlab/rendermime-interfaces';
import {ILogger, LogLevel} from '@jupyterlab/logconsole'
import {JSONObject} from '@phosphor/coreutils'
import { nbformat } from '@jupyterlab/coreutils';

/**
 * A mime renderer for displaying Markdown with embedded latex.
 */
export class LogRenderer extends RenderedHTMLCommon {
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
        const level = modelData['level'] as LogLevel;
        const data = modelData['data'] as nbformat.IDisplayData|nbformat.IDisplayUpdate;

        this.logger.log({type:'output', data: data, level: level});
        return Promise.resolve();
    }

}

/**
 * The namespace for the `renderMarkdown` function statics.
 */
export namespace renderLog {
    /**
     * The options for the `renderMarkdown` function.
     */
    export interface IRenderOptions {
        /**
         * The Markdown source to render.
         */
        source: string;

        /**
         * Whether the source is trusted.
         */
        trusted: boolean;
    }
}
