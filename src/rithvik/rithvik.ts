/**
 * @example
 * export const variedSpriteSheet: SpriteSource = {
 *  url: importedUrl,
 *  srcX: 0,
 *  srcY: 0,
 *  srcW: width,
 *  srcH: height,
 * }
 */
export type SpriteSource = {
    url: string;
    srcX: number;
    srcY: number;
    srcW: number;
    srcH: number;
};

/**
 * @example
 * export const variedSpriteSheet: VariedSpriteSource = {
 *  url: importedUrl,
 *  still: { nameOfStill: {srcX:..., srcY, srcW, srcH} },
 *  animations: { nameOfAnimation: [{...},...] },
 * }
 */
export type VariedSpriteSource = {
    url: string;
    still: Record<string, SubSource>;
    animated: Record<string, FrameSource[]>;
};
export type SubSource = {
    srcX: number;
    srcY: number;
    srcW: number;
    srcH: number;
};
export type FrameSource = {
    srcX: number;
    srcY: number;
    srcW: number;
    srcH: number;
    time: number;
};
