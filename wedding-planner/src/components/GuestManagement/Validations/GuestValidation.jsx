
import React, {useState, useEffect, useRef } from 'react';

export default function validateGuest (g)  {
    return g.name.trim().length > 0 && g.email.length > 0
    && g.attendingSide != null && g.numPax > 0;
}
