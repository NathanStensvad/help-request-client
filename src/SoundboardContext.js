import React from 'react';

export default React.createContext({
    users: [],
    soundboards: [],
    soundboardEntries: [],
    saveSoundboard: () => {},
    addSoundBoard: () => {},
    deleteSoundBoard: () => {},
    addSound: () => {},
    deleteSound: () => {},
})