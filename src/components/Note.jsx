import { useEffect } from 'react';

// A message that removes itself: 4 seconds for confirmations, 8 for errors (so they can be read).
export default function Note({ note, onDone }) {
  useEffect(() => {
    if (!note) return undefined;
    const timer = setTimeout(onDone, note.error ? 8000 : 4000);
    return () => clearTimeout(timer);
  }, [note, onDone]);
  return note ? <p className={`small ${note.error ? 'error' : 'ok-text'}`} role="status">{note.text}</p> : null;
}
