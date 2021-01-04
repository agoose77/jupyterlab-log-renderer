import { RenderedCommon } from '@jupyterlab/rendermime';
import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import {
  IHtmlLog,
  ILogger,
  ILogPayloadBase,
  IOutputLog,
  ITextLog,
  LogLevel
} from '@jupyterlab/logconsole';
import { ReadonlyJSONObject } from '@lumino/coreutils';
import * as nbformat from '@jupyterlab/nbformat';

/**
 * Interface guards
 */

/////////////////////////////////

function isLogPayloadBase(data: any): data is ILogPayloadBase {
  return (
    typeof data.type === 'string' &&
    isLevelType(data.level) &&
    data.data !== undefined
  );
}

function isLevelType(level: any): level is LogLevel {
  return (
    level === 'critical' ||
    level === 'error' ||
    level === 'warning' ||
    level === 'info' ||
    level === 'debug'
  );
}

////////////////////////
function isOutputLog(model: ILogPayloadBase): model is IOutputLog {
  return model.type === 'output' && model.data.output_type !== undefined;
}

function isTextLog(model: ILogPayloadBase): model is ITextLog {
  return model.type === 'text';
}

function isHtmlLog(model: ILogPayloadBase): model is IHtmlLog {
  return model.type === 'html';
}

////////////////////////////////
function isDisplayUpdate(
  data: nbformat.IBaseOutput
): data is nbformat.IDisplayUpdate {
  return data.output_type === 'display_update';
}

function isDisplayData(
  data: nbformat.IBaseOutput
): data is nbformat.IDisplayData {
  return data.output_type === 'display_data';
}

function isStream(data: nbformat.IBaseOutput): data is nbformat.IStream {
  return data.output_type === 'stream';
}

function isError(data: nbformat.IBaseOutput): data is nbformat.IError {
  return data.output_type === 'error';
}

function isExecuteResult(
  data: nbformat.IBaseOutput
): data is nbformat.IExecuteResult {
  return data.output_type === 'execute_result';
}

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
    const log = model.data[this.mimeType] as ReadonlyJSONObject;
    if (log === null || !isLogPayloadBase(log)) {
      return Promise.resolve();
    }

    if (isOutputLog(log)) {
      if (
        isDisplayData(log.data) ||
        isDisplayUpdate(log.data) ||
        isError(log.data) ||
        isStream(log.data) ||
        isExecuteResult(log.data)
      ) {
        this.logger.log(log);
      }
    } else if (isHtmlLog(log) || isTextLog(log)) {
      this.logger.log(log);
    }

    return Promise.resolve();
  }
}
