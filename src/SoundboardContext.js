import React from 'react';

export default React.createContext({
    users: [],
    soundboards: [],
    soundboardEntries: [],
    newSoundBoard: () => {},
    saveSoundboard: () => {},
    deleteSoundBoard: () => {},
    addSound: () => {},
    deleteSound: () => {},
})