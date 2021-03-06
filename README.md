# jupyterlab_log_renderer
[![pypi-badge][]][pypi] ![ci-badge][]

[pypi-badge]: https://img.shields.io/pypi/v/jupyterlab-log-renderer
[pypi]: https://pypi.org/project/jupyterlab-log-renderer
[ci-badge]: https://github.com/agoose77/jupyterlab-log-renderer/actions/workflows/build.yml/badge.svg

A JupyterLab extension to render rich-display objects to the JupyterLab log window.



## Requirements

* JupyterLab >= 3.0

## Install

```bash
pip install jupyterlab_log_renderer
```


## Contributing

### Development install

Note: You will need NodeJS to build the extension package.

The `jlpm` command is JupyterLab's pinned version of
[yarn](https://yarnpkg.com/) that is installed with JupyterLab. You may use
`yarn` or `npm` in lieu of `jlpm` below.

```bash
# Clone the repo to your local environment
# Change directory to the jupyterlab_log_renderer directory
# Install package in development mode
pip install -e .
# Link your development version of the extension with JupyterLab
jupyter labextension develop . --overwrite
# Rebuild extension Typescript source after making changes
jlpm run build
```

You can watch the source directory and run JupyterLab at the same time in different terminals to watch for changes in the extension's source and automatically rebuild the extension.

```bash
# Watch the source directory in one terminal, automatically rebuilding when needed
jlpm run watch
# Run JupyterLab in another terminal
jupyter lab
```

With the watch command running, every saved change will immediately be built locally and available in your running JupyterLab. Refresh JupyterLab to load the change in your browser (you may need to wait several seconds for the extension to be rebuilt).

### Uninstall

```bash
pip uninstall jupyterlab_log_renderer
jupyter labextension uninstall @agoose77/jupyterlab_log_renderer
```
