#!/bin/sh

set -eu

SNAPSHOT=.planning/phases/03.1-document-architecture-and-flow/03.1-stabilized-prefix.md
CHECKSUM=.planning/phases/03.1-document-architecture-and-flow/03.1-stabilized-prefix.sha256
GUIDE=AgenticEngineeringGuide.md

TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT HUP INT TERM

LINE_COUNT=$(wc -l < "$SNAPSHOT")
sed -n "1,${LINE_COUNT}p" "$GUIDE" > "$TMP_FILE"

diff -u "$SNAPSHOT" "$TMP_FILE"
sha256sum -c "$CHECKSUM"

printf '%s\n' 'Stabilized boundary OK: AgenticEngineeringGuide.md prefix matches the Phase 03.1 snapshot.'
