export type PokemonEncounters = {
    id: number;
    name: string;
    encounters: {
        encountersByVersion: VersionEncounter[];
    };
};

export type VersionEncounter = {
    versionKey: string;
    encountersByVersion: EncounterItem[];
};

export type EncounterItem = {
    locationAreaKey: string;
    chance: number;
    levelRanges: EncounterLevelRange[];
};

export type EncounterLevelRange = {
    min: number;
    max: number;
};