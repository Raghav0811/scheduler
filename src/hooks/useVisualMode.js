import {useState} from 'react';

export default function useVisualMode (initialMode) {
  const [history, setHistory] = useState([initialMode]);

  function transition(nextMode, replace = false) {
      setHistory(prevHistory => {

        if (replace) {
         return [nextMode, ...prevHistory.slice(1)]
        } else {
          return [nextMode, ...prevHistory]
        }
      })
  }


  function back() {
    if (history.length > 1) {
      setHistory(prevHistory =>
        prevHistory.slice(1))
    }
  }

  return { 
    mode: history[0],
    transition,
    back
  };

} 
