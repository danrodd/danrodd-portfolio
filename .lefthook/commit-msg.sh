#!/bin/sh
# Valida que el subject del commit siga Conventional Commits.
# $1 = ruta al archivo del mensaje (la pasa lefthook con el token {1}).

subject=$(head -n1 "$1")
pattern='^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([a-z0-9-]+\))?!?: .+'

if printf '%s' "$subject" | grep -qE "$pattern"; then
  exit 0
fi

echo "Commit rechazado: el mensaje no sigue Conventional Commits."
echo "  Formato : tipo(scope opcional): descripcion"
echo "  Ejemplo : feat(nav): agrega el diagrama de secciones"
echo "  Tipos   : feat fix docs style refactor perf test build ci chore revert"
exit 1
