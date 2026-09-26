import React from "react";
import { colors } from "@apollo/space-kit/colors";
import { Card } from "@apollo/space-kit/Card";
import { Button } from "@apollo/space-kit/Button";

/**
 * TvPanel — a screen-style preview panel (16:9 frame with a title bar
 * and status row) for embedding a video/media preview in a dashboard.
 *
 * Everything under `panel` is a plain style object rather than a CSS
 * module so this stays a single, framework-minimal file — swap in
 * emotion/styled-components if this repo settles on one.
 */
export function TvPanel({
  title = "Untitled",
  status = "offline",
  children,
  onPowerToggle,
}) {
  const isOnline = status === "online";

  return (
    <Card className="tv-panel" theme="dark" style={styles.card}>
      <div style={styles.titleBar}>
        <span style={styles.title}>{title}</span>
        <span
          style={{
            ...styles.statusDot,
            backgroundColor: isOnline ? colors.green.base : colors.grey.base,
          }}
        />
      </div>

      <div style={styles.screen}>
        {children ?? <span style={styles.placeholder}>No signal</span>}
      </div>

      <div style={styles.footer}>
        <span style={styles.statusLabel}>
          {isOnline ? "Online" : "Offline"}
        </span>
        <Button size="small" onClick={onPowerToggle}>
          {isOnline ? "Turn off" : "Turn on"}
        </Button>
      </div>
    </Card>
  );
}

const styles = {
  card: {
    width: 320,
    padding: 12,
    backgroundColor: colors.midnight.darkest,
    borderRadius: 12,
  },
  titleBar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  title: {
    color: colors.silver.light,
    fontSize: 14,
    fontWeight: 600,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: "50%",
  },
  screen: {
    aspectRatio: "16 / 9",
    backgroundColor: colors.black.base,
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    color: colors.grey.base,
    fontSize: 13,
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  statusLabel: {
    color: colors.silver.base,
    fontSize: 12,
  },
};

export default TvPanel;
