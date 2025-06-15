import { VariedSpriteSource } from "../rithvik/rithvik.ts";

import fastWalkUrl from "../assets/img/animation/playerFastWalking.png";
export const fastWalk: VariedSpriteSource = {
    url: fastWalkUrl,
    still: {},
    animated: {
        fastWalkAnimation: [
            { srcX: 0, srcY: 0, srcW: 24, srcH: 24, time: .05},
            { srcX: 24, srcY: 0, srcW: 24, srcH: 24, time: 0.1},
            { srcX: 48, srcY: 0, srcW: 24, srcH: 24, time: 0.15 },
            { srcX: 72, srcY: 0, srcW: 24,srcH: 24, time: 0.2},
            { srcX: 96, srcY: 0, srcW: 24, srcH: 24, time: 0.25 },
            { srcX: 120, srcY: 0, srcW: 24, srcH:24, time: 0.3},

            { srcX: 0, srcY: 24, srcW: 24, srcH: 24, time: 0.35},
            { srcX: 24, srcY: 24, srcW: 24, srcH: 24, time: 0.4 },
            { srcX: 48, srcY: 24, srcW: 24, srcH: 24, time: 0.45},
            { srcX: 72, srcY: 24, srcW: 24, srcH: 24, time: 0.5 },
            { srcX: 96, srcY: 24, srcW: 24, srcH: 24, time: 0.55 },
            { srcX: 120, srcY: 24, srcW: 24, srcH: 24, time: 0.6 },

            { srcX: 0, srcY: 48, srcW: 24, srcH: 24, time: 0.65 },
            { srcX: 24, srcY: 48, srcW: 24, srcH: 24, time: 0.7 },
            { srcX: 48, srcY: 48, srcW: 24, srcH: 24, time: 0.75 },
            { srcX: 72, srcY: 48, srcW: 24, srcH: 24, time: 0.8 },
            { srcX: 96, srcY: 48, srcW: 24, srcH: 24, time: 0.85 },
            { srcX: 120, srcY: 48, srcW: 24, srcH: 24, time: 0.9 },

            { srcX: 0, srcY: 72, srcW: 24, srcH: 24, time: 0.95 },
            { srcX: 24, srcY: 72, srcW: 24, srcH: 24, time: 1.0 },
            { srcX: 48, srcY: 72, srcW: 24, srcH: 24, time: 1.05 },
            { srcX: 72, srcY: 72, srcW: 24, srcH: 24, time: 1.1 },
            { srcX: 96, srcY: 72, srcW: 24, srcH: 24, time: 1.15 },
            { srcX: 120, srcY: 72, srcW: 24, srcH: 24, time: 1.2 },

            { srcX: 0, srcY: 96, srcW: 24, srcH: 24, time: 1.25 },
            { srcX: 24, srcY: 96, srcW: 24, srcH: 24, time: 1.3 },
            { srcX: 48, srcY: 96, srcW: 24, srcH: 24, time: 1.35 },
            { srcX: 72, srcY: 96, srcW: 24, srcH: 24, time: 1.4 },
            { srcX: 96, srcY: 96, srcW: 24, srcH: 24, time: 1.45 },
            { srcX: 120, srcY: 96, srcW: 24, srcH: 24, time: 1.5 },

            { srcX: 0, srcY: 120, srcW: 24, srcH: 24, time: 1.55 },
            { srcX: 24, srcY: 120, srcW: 24, srcH: 24, time: 1.6 },
            { srcX: 48, srcY: 120, srcW: 24, srcH: 24, time: 1.65 },
            { srcX: 72, srcY: 120, srcW: 24, srcH: 24, time: 1.7 },
            { srcX: 96, srcY: 120, srcW: 24, srcH: 24, time: 1.75 },
            { srcX: 120, srcY: 120, srcW: 24, srcH: 24, time: 1.8 },

            { srcX: 0, srcY: 144, srcW: 24, srcH: 24, time: 1.85},
            { srcX: 24, srcY: 144, srcW: 24, srcH: 24, time: 1.9 },
            { srcX: 48, srcY: 144, srcW: 24, srcH: 24, time: 1.95 },
        ],
    },
};

import walkClimbUrl from "../assets/img/animation/playerWalkingAndClimbing.png";
export const walk: VariedSpriteSource = {
    url: walkClimbUrl,
    still: {
        stillPlayer: { srcX: 7, srcY: 3, srcW: 9, srcH: 21}
    },
    animated: {
        walkAnimation: [
            //{ srcX: 7, srcY: 3, srcW: 9, srcH: 21, time: .1},
            { srcX: 31, srcY: 3, srcW: 9, srcH: 21, time: 0.2 },
            { srcX: 55, srcY: 3, srcW: 9 , srcH: 21, time: 0.3 },
            { srcX: 79, srcY: 3, srcW: 9, srcH: 21, time: 0.4},

            { srcX: 7, srcY: 27, srcW: 9, srcH: 21, time: 0.5},
            { srcX: 31, srcY: 27, srcW: 9, srcH: 21, time: 0.6 },
            { srcX: 55, srcY: 27, srcW: 9, srcH: 21, time: 0.7},
            { srcX: 79, srcY: 27, srcW: 9, srcH: 21, time: 0.8},
        ],
    },
};

export const climb: VariedSpriteSource = {
    url: walkClimbUrl,
    still: {},
    animated: {
        walkAnimation: [
            { srcX: 5, srcY: 2, srcW: 14, srcH: 21, time: .1 },
            { srcX: 29, srcY: 2, srcW: 14, srcH: 21, time: 0.2 },
            { srcX: 53, srcY: 2, srcW: 14, srcH: 21, time: 0.3 },
            { srcX: 77, srcY: 2, srcW: 14, srcH: 21, time: 0.4},

            { srcX: 5, srcY: 26, srcW: 14, srcH: 21, time: 0.5 },
            { srcX: 29, srcY: 26, srcW: 14, srcH: 21, time: 0.6 },
        ],
    },
};

import ventUrl from "../assets/img/animation/vent.png";
export const vent: VariedSpriteSource = {
    url: ventUrl,
    still: {
        ventClosed: {srcX: 0, srcY: 0, srcW: 32, srcH: 32},
        ventOpen: {srcX: 32, srcY: 64, srcW: 32, srcH: 32},
    },
    animated: {
        ventAnimation: [
            { srcX: 0, srcY: 0, srcW: 32, srcH: 32, time: 0.05},
            { srcX: 32, srcY: 0, srcW: 32, srcH: 32, time: 0.1 },
            { srcX: 64, srcY: 0, srcW: 32, srcH: 32, time: 0.15 },
            
            { srcX: 0, srcY: 32, srcW: 32, srcH: 32, time: 0.2 },
            { srcX: 32, srcY: 32, srcW: 32, srcH: 32, time: 0.25 },
            { srcX: 64, srcY: 32, srcW: 32, srcH: 32, time: 0.3 },
            
            { srcX: 0, srcY: 64, srcW: 32, srcH: 32, time: 0.35 },
            { srcX: 32, srcY: 64, srcW: 32, srcH: 32, time: 0.4 },
        ],
    },
};

import doorUrl from "../assets/img/animation/vent.png";
export const door: VariedSpriteSource = {
    url: doorUrl,
    still: {
        doorClosed: {srcX: 0, srcY: 0, srcW: 32, srcH: 32},
        doorOpen: {srcX: 0, srcY: 64, srcW: 32, srcH: 32},
    },
    animated: {
        doorAnimation: [
            { srcX: 0, srcY: 0, srcW: 32, srcH: 32, time: 0.05},
            { srcX: 32, srcY: 0, srcW: 32, srcH: 32, time: 0.1 },
            { srcX: 64, srcY: 0, srcW: 32, srcH: 32, time: 0.15 },
            
            { srcX: 0, srcY: 32, srcW: 32, srcH: 32, time: 0.2 },
            { srcX: 32, srcY: 32, srcW: 32, srcH: 32, time: 0.25 },
            { srcX: 64, srcY: 32, srcW: 32, srcH: 32, time: 0.3 },
            
            { srcX: 0, srcY: 64, srcW: 32, srcH: 32, time: 0.35 },
        ],
    },
};

import explosionUrl from "../assets/img/animation/explosionSprite.png";
export const explosion: VariedSpriteSource = {
    url: explosionUrl,
    still: {},
    animated: {
        doorAnimation: [
            { srcX: 0, srcY: 0, srcW: 960, srcH: 524, time: 0.25},
            { srcX: 960, srcY: 0, srcW: 960, srcH: 524, time: 0.5 },
            { srcX: 1920, srcY: 0, srcW: 960, srcH: 524, time: 0.75 },
            
            { srcX: 0, srcY: 524, srcW: 960, srcH: 524, time: 1 },
            { srcX: 960, srcY: 524, srcW: 960, srcH: 524, time: 1+.25 },
            { srcX: 1920, srcY: 524, srcW: 960, srcH: 524, time: 1.25+.25 },

            { srcX: 0, srcY: 1048, srcW: 960, srcH: 524, time: 1.5+.25},
            { srcX: 960, srcY: 1048, srcW: 960, srcH: 524, time: 1.75 +.25},
            { srcX: 1920, srcY: 1048, srcW: 960, srcH: 524, time: 2+.25 },
            
            { srcX: 0, srcY: 1572, srcW: 960, srcH: 524, time: 2.25+.25 },
            { srcX: 960, srcY: 1572, srcW: 960, srcH: 524, time: 2.5 +.25 },
            { srcX: 1920, srcY: 1572, srcW: 960, srcH: 524, time: 2.75+.25 },
            
            { srcX: 0, srcY: 2096, srcW: 960, srcH: 524, time: 3+.25},
            { srcX: 960, srcY: 2096, srcW: 960, srcH: 524, time: 3.25+.25 },
            { srcX: 1920, srcY: 2096, srcW: 960, srcH: 524, time: 9999},
        ],
    },
};


import freeFallUrl from "../assets/img/animation/playerFreeFall.png";
export const freeFall: VariedSpriteSource = {
    url: freeFallUrl,
    still: {},
    animated: {
        fallAnimation: [
            { srcX: 0, srcY: 0, srcW: 32, srcH: 32, time: 0.05},
            { srcX: 32, srcY: 0, srcW: 32, srcH: 32, time: 0.1 },
            { srcX: 64, srcY: 0, srcW: 32, srcH: 32, time: 0.15 },
            { srcX: 96, srcY: 0, srcW: 32, srcH: 32, time: 0.2},
            { srcX: 128, srcY: 0, srcW: 32, srcH: 32, time: 0.25 },

            { srcX: 0, srcY: 32, srcW: 32, srcH: 32, time: 0.3},
            { srcX: 32, srcY: 32, srcW: 32, srcH: 32, time: 0.35 },
            { srcX: 64, srcY: 32, srcW: 32, srcH: 32, time: 0.4 },
            { srcX: 96, srcY: 32, srcW: 32, srcH: 32, time: 0.45},
            { srcX: 128, srcY: 32, srcW: 32, srcH: 32, time: 0.5 },

            { srcX: 0, srcY: 64, srcW: 32, srcH: 32, time: 0.55},
            { srcX: 32, srcY: 64, srcW: 32, srcH: 32, time: 0.6 },
            { srcX: 64, srcY: 64, srcW: 32, srcH: 32, time: 0.65 },
            { srcX: 96, srcY: 64, srcW: 32, srcH: 32, time: 0.7},
            { srcX: 128, srcY: 64, srcW: 32, srcH: 32, time: 0.75 },

            { srcX: 0, srcY: 96, srcW: 32, srcH: 32, time: 0.8},
            { srcX: 32, srcY: 96, srcW: 32, srcH: 32, time: 0.85 },
            { srcX: 64, srcY: 96, srcW: 32, srcH: 32, time: 0.9},
            { srcX: 96, srcY: 96, srcW: 32, srcH: 32, time: 0.95},
            { srcX: 128, srcY: 96, srcW: 32, srcH: 32, time: 1 },

            { srcX: 0, srcY: 128, srcW: 32, srcH: 32, time: 1.05},
            { srcX: 32, srcY: 128, srcW: 32, srcH: 32, time: 1.1},
            

            
        ],
    },
};