#!/bin/bash
set -e

echo "*****"
echo "** Application preparing to start up... Hi!"
echo "** Local time         :$(date -Is)"
echo "** SERVICE_TITLE      :${SERVICE_TITLE}"
echo "** SERVICE_DESCRIPTION:${SERVICE_DESCRIPTION}"
echo "** SERVICE_VERSION    :${SERVICE_VERSION}"
echo "** SERVICE_IDENTIFIER :${SERVICE_IDENTIFIER}"
echo "** SERVICE_NAME       :${SERVICE_NAME}"
echo "*****"

if [ -d "/app" ]
then
  pushd /app

  if [ "$NPM_INSTALL" = "ENABLE" ]
  then
    echo "+Running npm install - disable with .env entry NPM_INSTALL=DISABLE"
    npm install
    npm run build
  else
    echo "+Skipping npm install - enable with .env entry NPM_INSTALL=ENABLE"
  fi

  if [ "$TYPEORM_MIGRATION" = "ENABLE" ]
  then
    echo "+Running typeorm migrations (caches will be cleared) - disable with .env entry TYPEORM_MIGRATION=DISABLE"
    npm run migration:run
  else
    echo "+Skipping typeorm migrations - enable with .env entry TYPEORM_MIGRATION=ENABLE"
  fi

  popd
fi

if [ "${1#-}" != "${1}" ] || [ -z "$(command -v "${1}")" ]; then
  set -- node "$@"
fi

exec "$@"