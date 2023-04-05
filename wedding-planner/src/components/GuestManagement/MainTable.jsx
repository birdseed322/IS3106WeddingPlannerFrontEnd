import React, {useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';
import TableLayout from './TableLayout.jsx';
import Table from './Table.jsx';

export default function MainTable() {
    const defaultOnErrorFn = useRef(window.onerror);

useEffect(() => {
  window.onerror = (...args) => {
    if (args[0] === 'ResizeObserver loop limit exceeded') {
      return true;
    } else {
      defaultOnErrorFn.current && defaultOnErrorFn.current(...args);
    }
  };
  return () => {
    window.onerror = defaultOnErrorFn.current;
  };
    }, []);

    return (
        <ErrorBoundary>
            <TableLayout></TableLayout>
        </ErrorBoundary>
    )
}
