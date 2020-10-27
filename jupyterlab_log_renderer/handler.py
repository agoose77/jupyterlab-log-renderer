from IPython.display import display
import logging


class JupyterHandler(logging.Handler):
    """A logging handler which implements the MIME-renderer log display protocol"""

    def _get_jupyter_level(self, level):
        level_name = logging.getLevelName(level)
        return level_name.lower()

    def emit(self, record):
        message = self.format(record)
        data = {
            'application/vnd.jupyterlab.log': {
                'type': 'text',
                'data': message,
                'level': self._get_jupyter_level(record.levelno)
            }
        }
        display(data, raw=True)
