import React, {useState, useEffect, useRef } from 'react';
import ErrorBoundary from './ErrorBoundary.jsx';
import TableLayout from './TableLayout.jsx';
import Table from './Table.jsx';

export default function MainTable() {

    return (
        <ErrorBoundary>
            <TableLayout></TableLayout>
        </ErrorBoundary>
    )
}
