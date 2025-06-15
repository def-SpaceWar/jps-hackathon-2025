import { Vector2D } from "./physics.ts";
import {
    brickBottomSlab,
    brickHalfSlopeLeft0,
    brickHalfSlopeLeft1,
    brickHalfSlopeRight0,
    brickHalfSlopeRight1,
    brickPlank,
    brickSlopeLeft,
    brickSlopeRight,
    brickTopSlab,
} from "./rithvik/brick.ts";
import { hotBarTileSelected, hotBarTileUnselected } from "./rithvik/hotbar.ts";
import {
    box,
    boxBlue,
    boxGreen,
    boxRed,
    bread,
    brigOutline,
    chain,
    chainHook,
    clock,
    concrete,
    guardRailTile,
    jail,
    jailCell,
    key,
    ladder,
    light,
    O2Barrel,
    orb,
    windowTile,
} from "./rithvik/misc.ts";
import {
    pipeE,
    pipeH,
    pipeN,
    pipeNE,
    pipeNW,
    pipeS,
    pipeSE,
    pipeSW,
    pipeV,
    pipeW,
} from "./rithvik/pipes.ts";
import { SpriteSource, VariedSpriteSource } from "./rithvik/rithvik.ts";
import {
    woodBG,
    woodBottomSlab,
    woodBox,
    woodCorner,
    woodHalfSlopeLeft0,
    woodHalfSlopeLeft1,
    woodHalfSlopeRight0,
    woodHalfSlopeRight1,
    woodPlank,
    woodSlopeLeft,
    woodSlopeRight,
    woodTopSlab,
} from "./rithvik/wood.ts";

export let canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D;

export function initRender() {
    ctx = (canvas = document.getElementById("app")!
        .appendChild(document.createElement("canvas"))).getContext("2d")!;
    [camera.offset.x, camera.offset.y] = [canvas.width, canvas.height] = [
        800,
        600,
    ];
    camera.offset.scale(.5).ay(100);
    ctx.imageSmoothingEnabled = false;
}

export const camera = {
    pos: Vector2D.xy(0, 0),
    offset: Vector2D.xy(0, 0),
    target: Vector2D.xy(0, 0),
    exponentialFactor: 100,
    threshold: 100,
    isFollowing: true,
    update(dt: number) {
        const distance = this.target.clone().subtract(this.pos).getMagnitude();
        if (distance < this.threshold / 5) {
            this.isFollowing = false;
        } else if (distance > this.threshold) {
            this.isFollowing = true;
        }

        if (!this.isFollowing) return;
        this.pos.add(
            this.target.clone().add(this.pos.clone().scale(-1)).scale(
                dt,
            ),
        );
    },
    reset() {
        this.pos = Vector2D.xy(0, 0);
        this.target = Vector2D.xy(0, 0);
    },
};

export function updateLoop(f: (dt: number) => void) {
    let id: number, before = performance.now(), isDone = false;
    const callback: FrameRequestCallback = (now) => {
        if (isDone) return;
        const dt = (now - before) / 1_000;
        before = now;

        ctx.reset();
        ctx.translate(-camera.pos.x, -camera.pos.y);
        ctx.translate(camera.offset.x, camera.offset.y);
        camera.update(dt);
        // configuration

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        f(Math.min(dt, 0.017));
        id = requestAnimationFrame(callback);
    };
    id = requestAnimationFrame(callback);
    return () => {
        isDone = true;
        cancelAnimationFrame(id);
    };
}

export interface Renderable {
    pos: Vector2D;
    w: number;
    h: number;
    render(dt: number): void;
    z: number;
}

export class Rectangle implements Renderable {
    constructor(
        public fillStyle: typeof CanvasRenderingContext2D.prototype.fillStyle,
        public pos: Vector2D,
        public w: number,
        public h: number,
        public z: number = 0,
    ) {}

    render() {
        ctx.fillStyle = this.fillStyle;
        ctx.fillRect(
            this.pos.x - this.w / 2,
            this.pos.y - this.h / 2,
            this.w,
            this.h,
        );
    }
}

export const loadImage = (imageUrl: string) => {
    return new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = imageUrl;
        img.onload = () => resolve(img);
        img.onerror = (e) => reject(e);
    });
};

export class Sprite implements Renderable {
    static async fromSpriteSource(
        src: SpriteSource,
        pos: Vector2D,
        w: number,
        h: number,
        z: number = 0,
    ) {
        return new Sprite(
            await loadImage(src.url),
            src.srcX,
            src.srcY,
            src.srcW,
            src.srcH,
            pos,
            w,
            h,
            z,
        );
    }

    /**
     * @requires src.still[@param frameName]
     */
    static async fromVariedSpriteSource(
        src: VariedSpriteSource,
        frameName: string,
        pos: Vector2D,
        w: number,
        h: number,
        z: number = 0,
    ) {
        const srcRect = src.still[frameName];
        return new Sprite(
            await loadImage(src.url),
            srcRect.srcX,
            srcRect.srcY,
            srcRect.srcW,
            srcRect.srcH,
            pos,
            w,
            h,
            z,
        );
    }

    constructor(
        public image: CanvasImageSource,
        public srcX: number,
        public srcY: number,
        public srcW: number,
        public srcH: number,
        public pos: Vector2D,
        public w: number,
        public h: number,
        public z: number = 0,
    ) {}

    render() {
        ctx.save();
        ctx.translate(this.pos.x - this.w / 2, this.pos.y - this.h / 2);
        ctx.scale(this.w, this.h);
        ctx.drawImage(
            this.image,
            this.srcX,
            this.srcY,
            this.srcW,
            this.srcH,
            0,
            0,
            1,
            1,
        );
        ctx.restore();
    }
}

export class AnimatedSprite implements Renderable {
    /**
     * @requires src.animated[@param frameName]
     */
    static async fromVariedSpriteSource(
        src: VariedSpriteSource,
        frameName: string,
        pos: Vector2D,
        w: number,
        h: number,
        z: number = 0,
    ) {
        return new AnimatedSprite(
            await loadImage(src.url),
            src.animated[frameName],
            pos,
            w,
            h,
            z,
        );
    }

    animationLength: number;
    timer = 0;
    speed = 1;
    constructor(
        public image: CanvasImageSource,
        public animation: VariedSpriteSource["animated"][string],
        public pos: Vector2D,
        public w: number,
        public h: number,
        public z: number = 0,
    ) {
        this.animationLength = animation[animation.length - 1].time;
    }

    render(dt: number): void {
        this.timer += this.speed * dt;
        if (this.timer > this.animationLength) {
            this.timer -= this.animationLength;
        }
        if (this.timer < 0) this.timer += this.animationLength;

        let anim = this.animation[0];
        for (let i = 0; i < this.animation.length; i++) {
            const animation = this.animation[i];
            if (animation.time < this.timer) continue;
            anim = animation;
            break;
        }
        ctx.save();
        ctx.translate(this.pos.x - this.w / 2, this.pos.y - this.h / 2);
        ctx.scale(this.w, this.h);
        ctx.drawImage(
            this.image,
            anim.srcX,
            anim.srcY,
            anim.srcW,
            anim.srcH,
            0,
            0,
            1,
            1,
        );
        ctx.restore();
    }

    reset() {
        this.timer = 0;
    }
}

const TILE_SIZE = 48;
const tileMap = {
    "BRP": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickPlank,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WBG": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodBG,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "BTS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickTopSlab,
            p.ay(-TILE_SIZE / 4),
            TILE_SIZE,
            TILE_SIZE / 2,
            z,
        );
    },
    "BBS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickBottomSlab,
            p.ay(TILE_SIZE / 4),
            TILE_SIZE,
            TILE_SIZE / 2,
            z,
        );
    },
    "BRS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickSlopeRight,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "BH0": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickHalfSlopeRight0,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "ORB": async (p: Vector2D, z: number = 0) => {
        return await Orb.fromSpriteSource(
            orb,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "BH1": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickHalfSlopeRight1,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "Brs": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickSlopeLeft,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "Bh0": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickHalfSlopeLeft0,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "Bh1": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brickHalfSlopeLeft1,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WCR": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodCorner,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WTS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodTopSlab,
            p.ay(-TILE_SIZE / 4),
            TILE_SIZE,
            TILE_SIZE / 2,
            z,
        );
    },
    "WBS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodBottomSlab,
            p.ay(TILE_SIZE / 4),
            TILE_SIZE,
            TILE_SIZE / 2,
            z,
        );
    },
    "WPK": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodPlank,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "Wsl": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodSlopeLeft,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "Wh0": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeLeft0,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "Wh1": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeLeft1,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WSL": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodSlopeRight,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WH0": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeRight0,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WH1": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeRight1,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "wsl": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodSlopeRight,
            p,
            TILE_SIZE,
            -TILE_SIZE,
            z,
        );
    },
    "wH0": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeLeft0,
            p,
            TILE_SIZE,
            -TILE_SIZE,
            z,
        );
    },
    "wh1": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodHalfSlopeLeft1,
            p,
            TILE_SIZE,
            -TILE_SIZE,
            z,
        );
    },
    "PPH": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeH,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PPV": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeV,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PPN": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeN,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PPE": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeE,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PPS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeS,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PPW": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeW,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PNE": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeNE,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PNW": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeNW,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PSE": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeSE,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "PSW": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            pipeSW,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "HBS": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            hotBarTileSelected,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "HBU": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            hotBarTileUnselected,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "BOX": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            box,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "WBX": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            woodBox,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "RBX": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            boxRed,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "GBX": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            boxGreen,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "BBX": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            boxBlue,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },

    "BRD": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            bread,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "BOU": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            brigOutline,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "CON": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            concrete,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "CHN": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            chain,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "CHK": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            chainHook,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "CLK": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            clock,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "GRL": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            guardRailTile,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "JAL": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            jail,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "JLC": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            jailCell,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "KEY": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            key,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "LDR": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            ladder,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "LGT": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            light,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "O2B": async (p: Vector2D, z: number = 0) => {
        return await O2.fromSpriteSource(
            O2Barrel,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
    "WND": async (p: Vector2D, z: number = 0) => {
        return await Sprite.fromSpriteSource(
            windowTile,
            p,
            TILE_SIZE,
            TILE_SIZE,
            z,
        );
    },
} as const;
type NonEmptyTile = keyof typeof tileMap;
export type Tile = NonEmptyTile | "   " | "XXX";

export async function createMap(
    map: Tile[][],
    offset: Vector2D,
    z: number = 0,
): Promise<[Renderable[], Vector2D]> {
    const list: Renderable[] = [];
    let spawnPoint: Vector2D = Vector2D.xy(0, 0);
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[i].length; j++) {
            const pos: Vector2D = Vector2D.xy(j * TILE_SIZE, i * TILE_SIZE).add(
                    offset,
                ),
                tile = map[i][j];
            switch (tile) {
                case "XXX":
                    spawnPoint = pos;
                    /* falls through */
                case "   ":
                    continue;
                default:
                    list.push(await createTile(pos, tile, z));
            }
        }
    }
    return [list, spawnPoint];
}
export async function createTile(p: Vector2D, t: NonEmptyTile, z: number = 0) {
    return await tileMap[t](p, z);
}

export class AnimatedText implements Renderable {
    h: number;
    color: string;
    strokeColor: string;

    private isUpdatingStartedYet = false;
    private updateIntervalId = 0;
    isDone = false;

    private shownText: string = "";
    private stringIdx: number = 0;

    constructor(
        public pos: Vector2D,
        public w: number,
        public text: string,
        public readSpeed: number,
        public fontSize = 60,
        colors: { color?: string; strokeColor?: string } = {},
        public strokeWidth: number = 3,
        public z: number = 0,
    ) {
        this.h = fontSize;
        this.color = colors.color || "#fff";
        this.strokeColor = colors.strokeColor || "#AAA";
    }

    render() {
        if (!this.isUpdatingStartedYet) {
            this.updateIntervalId = setInterval(
                this.update(this),
                100 / this.readSpeed,
            );
            this.isUpdatingStartedYet = true;
        }

        ctx.font = `${this.fontSize}px Comic Sans MS`;
        ctx.fillStyle = this.color;
        ctx.fillText(
            this.shownText,
            this.pos.x,
            this.pos.y + this.fontSize,
            this.w,
        );
        ctx.strokeStyle = this.strokeColor;
        ctx.lineWidth = this.strokeWidth;
        ctx.strokeText(
            this.shownText,
            this.pos.x,
            this.pos.y + this.fontSize,
            this.w,
        );
    }

    update(self: AnimatedText) {
        return () => {
            if (self.stringIdx == self.text.length) {
                clearInterval(self.updateIntervalId);
                self.isDone = true;
                return;
            }
            self.shownText += self.text[this.stringIdx];
            self.stringIdx++;
        };
    }
}

export class Dialogue {
    animatedTexts: AnimatedText[];
    animNum = 0;

    constructor(lines: string[]) {
        this.animatedTexts = [];
        for (let i = 0; i < lines.length; i++) {
            this.animatedTexts.push(
                new AnimatedText(
                    Vector2D.xy(-375, i * 50),
                    750,
                    lines[i],
                    3,
                    50,
                    { color: "#fff", strokeColor: "#aaa" },
                    1,
                ),
            );
        }

        this.animatedTexts.push(
            new AnimatedText(
                Vector2D.xy(-375, 150),
                750,
                "Press Space To Continue",
                5,
                30,
                { color: "#2f8", strokeColor: "#1B5" },
                1,
            ),
        );
    }

    render() {
        this.animatedTexts[0].render();
        for (let i = 0; i < this.animatedTexts.length - 1; i++) {
            if (this.animatedTexts[i].isDone) {
                this.animatedTexts[i + 1].render();
            }
        }
    }
}

export class Orb extends Sprite {
    isOrb = true;
    
    static override async fromSpriteSource(
        src: SpriteSource,
        pos: Vector2D,
        w: number,
        h: number,
        z: number = 0,
    ) {
        return new Orb(
            await loadImage(src.url),
            src.srcX,
            src.srcY,
            src.srcW,
            src.srcH,
            pos,
            w,
            h,
            z,
        );
    }

}

export class O2 extends Sprite {
    isO2 = true;
    
    static override async fromSpriteSource(
        src: SpriteSource,
        pos: Vector2D,
        w: number,
        h: number,
        z: number = 0,
    ) {
        return new O2(
            await loadImage(src.url),
            src.srcX,
            src.srcY,
            src.srcW,
            src.srcH,
            pos,
            w,
            h,
            z,
        );
    }

}