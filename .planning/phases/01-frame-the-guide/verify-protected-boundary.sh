#!/bin/sh

set -eu

SNAPSHOT=.planning/phases/01-frame-the-guide/01-protected-prefix.md
CHECKSUM=.planning/phases/01-frame-the-guide/01-protected-prefix.sha256
GUIDE=AgenticAIGuide.md

TMP_FILE=$(mktemp)
trap 'rm -f "$TMP_FILE"' EXIT HUP INT TERM

LINE_COUNT=$(wc -l < "$SNAPSHOT")
sed -n "1,${LINE_COUNT}p" "$GUIDE" > "$TMP_FILE"

diff -u "$SNAPSHOT" "$TMP_FILE"
sha256sum -c .planning/phases/01-frame-the-guide/01-protected-prefix.sha256

printf '%s\n' 'Protected boundary OK: AgenticAIGuide.md prefix matches Phase 1 snapshot.'
