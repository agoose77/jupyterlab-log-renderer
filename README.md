# jupyterlab-log-renderer

![Github Actions Status](https://github.com/agoose77/jupyterlab-log-renderer/workflows/Build/badge.svg)

A JupyterLab extension to expose the JupyterLab log console to the mimebundle render API.

### Example
```python
from IPython.display import display

def log_mimebundle(level, type, data,):
    display(
        {
            "application/vnd.jupyterlab.log": {
                "level": level,
                "type": type,
                "data": data
            }
        },
        raw=True,
    )
```
#### Simple text log
```python
log_mimebundle('critical', 'text', 'Hello world')
```
#### HTML log
```python
log_mimebundle('critical', 'html', '<b>Hello world</b>')
```
#### MIME-bundle log
```python
data = {'text/html': '<b>Hello world</b>'}
output = {
    "output_type": "display_data",
    "data": data,
    "metadata": {} ,
}
log_mimebundle('critical', 'output', output)
```


## Requirements

* JupyterLab >= 1.0

## Install

```bash
jupyter labextension install @agoose77/jupyterlab_log_renderer
```

## Contributing

### Install

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Move to jupyterlab-log-renderer directory
# Install dependencies
jlpm
# Build Typescript source
jlpm build
# Link your development version of the extension with JupyterLab
jupyter labextension link .
# Rebuild Typescript source after making changes
jlpm build
# Rebuild JupyterLab after making any changes
jupyter lab build
```

You can watch the source directory and run JupyterLab in watch mode to watch for changes in the extension's source and automatically rebuild the extension and application.

```bash
# Watch the source directory in another terminal tab
jlpm watch
# Run jupyterlab in watch mode in one terminal tab
jupyter lab --watch
```

### Uninstall

```bash
jupyter labextension uninstall @agoose77/jupyterlab_log_renderer
```

