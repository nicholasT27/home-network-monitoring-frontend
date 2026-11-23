import { useEffect } from 'react';

// This function shows a message that goes away by itself after a few seconds.
export default function Note({ note, onDone }) {
  useEffect(() => {
    if (!note) return undefined;
    const timer = setTimeout(onDone, note.error ? 8000 : 4000);
    return () => clearTimeout(timer);
  }, [note, onDone]);
  return note ? <p className={`small ${note.error ? 'error' : 'ok-text'}`} role="status">{note.text}</p> : null;
}
