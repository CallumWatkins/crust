import { error, warn, info, debug, trace } from 'tauri-plugin-log-api';

const production_logging_enabled = {
  error: true,
  warn: true,
  log: true,
  debug: true,
  trace: true,
};

export default async function setup_logging() {
  attach_console('error', error);
  attach_console('warn', warn);
  attach_console('log', info);
  attach_console('debug', debug);
  attach_console('trace', trace);
}

function attach_console(level: keyof typeof production_logging_enabled, handler: (message: string) => void) {
  const original = window.console[level];
  window.console[level] = (...data) => {
    if (production_logging_enabled[level]) handler(data.join(' '));
    if (import.meta.env.DEV) original(...data);
  };
}
