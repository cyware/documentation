# Running in Docker

## Running the Image

We offer images on [Dockerhub](https://hub.docker.com/r/cyware/cyware) that you can run directly on `x86`:

```
docker run --rm -p 7000:8080 cyware/cyware:latest
```

This will start Cyware on port 7000. You can then point your browser's proxy settings to `127.0.0.1:7000`.

To use another port, replace `7000` in the command above with a different port.

::: info
For M1 users, it is now possible to enable [Rosetta](https://docs.docker.com/desktop/settings/mac/#use-rosetta-for-x86amd64-emulation-on-apple-silicon) in the Docker settings. You can then run images with `--platform linux/amd64`.
:::

## Project Persistence

By default, Projects created in the Docker container are not saved between `docker run` commands.

We recommend mounting a volume to keep your data on your file system and to avoid losing data between Cyware updates.

This is done by appending the `-v` parameter to the `docker run` command using the format `-v <HOST PATH>:/home/cyware/.local/share/cyware`.

Note that the host path must be an absolute path.

Make sure you give the right permissions to `<HOST PATH>` via `chown -R 999:999 <HOSTPATH>`.

Your running command should look like the following:

```
docker run --rm -p 7000:8080 \
  -v /home/my_user/my_data:/home/cyware/.local/share/cyware cyware/cyware:latest
```

::: info
`/home/my_user/my_data` will be the folder containing Cyware projects.
:::

## Building the Image

If you prefer to build the image yourself, here is a `Dockerfile` sample you can use:

```Dockerfile
## Base ##
FROM debian:bullseye-slim as base

RUN \
  apt-get update && \
  apt-get -y install ca-certificates && \
  apt-get clean

## Download ##
FROM base as download

RUN \
  apt-get -y install curl jq && \
  curl -s https://api.cyware.khulnasoft.com/releases/latest \
    | jq '.links[] | select(.display == "Linux") | .link' \
    | xargs curl -s --output cyware.tar.gz && \
  tar -xf cyware.tar.gz && \
  rm cyware.tar.gz

## Runtime ##
FROM base

RUN groupadd -r cyware && useradd --no-log-init -m -r -g cyware cyware

COPY --from=download cyware /usr/bin/cyware

USER cyware

EXPOSE 8080

ENTRYPOINT ["cyware"]
CMD ["--listen", "0.0.0.0:8080"]
```
