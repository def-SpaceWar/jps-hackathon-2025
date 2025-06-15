import { keys } from "./input.ts";
import { Vector2D } from "./physics.ts";
import {
    AnimatedSprite,
    Rectangle,
    Renderable,
    Sprite,
} from "./render.ts";
import { walk } from "./rithvik/animation.ts";

export class Player {
    pos: Vector2D;
    vel: Vector2D;
    renderable: Renderable;
    gravity = 2_500;
    isGrounded = false;
    w = 32;
    h = 32;
    speed = 2500;
    jumpPower = 900;

    constructor(public DEBUG = false) {
        this.pos = Vector2D.xy(0, 0);
        this.vel = Vector2D.xy(0, 0);
        this.renderable = new Rectangle("red", this.pos, this.w, this.h, 0);
    }

    idle?: Sprite;
    animatedWalk?: AnimatedSprite;
    async load() {
        this.renderable = this.idle = await Sprite.fromVariedSpriteSource(
            walk,
            "stillPlayer",
            this.pos,
            this.w * 1.2,
            this.h * 1.2,
        );
        this.animatedWalk = await AnimatedSprite.fromVariedSpriteSource(
            walk,
            "walkAnimation",
            this.pos,
            this.w * 1.2,
            this.h * 1.2,
            0,
        );
    }

    update(dt: number, platforms: Renderable[]) {
        this.renderable = this.idle!;
        this.vel.ay(this.gravity / 2 * dt);
        this.pos.add(this.vel.clone().scale(dt));
        this.vel.ay(this.gravity / 2 * dt);
        this.vel.sx(Math.exp(-10 * dt)).sy(Math.exp(-2 * dt));
        this.collisionResolution(platforms);

        if (keys.has("a") || keys.has("ArrowLeft")) {
            this.vel.x -= this.speed * dt;
            this.idle!.w = this.animatedWalk!.w = this.renderable.w = -this.w *
                1.2;
            this.renderable = this.animatedWalk!;
        }

        if (keys.has("d") || keys.has("ArrowRight")) {
            this.vel.x += this.speed * dt;
            this.idle!.w = this.animatedWalk!.w = this.renderable.w = this.w *
                1.2;
            this.renderable = this.animatedWalk!;
        }

        if ((keys.has("w") || keys.has("ArrowUp")) && this.isGrounded) {
            this.vel.y -= this.jumpPower;
            this.isGrounded = false;
        }
    }

    collisionResolution(platforms: Renderable[]) {
        this.isGrounded = false;

        for (const p of platforms) {
            if (
                (this.pos.y + this.h / 2 > p.pos.y - p.h / 2 &&
                    this.pos.y + this.h / 2 < p.pos.y + p.h / 2) ||
                (this.pos.y - this.h / 2 < p.pos.y + p.h / 2 &&
                    this.pos.y - this.h / 2 > p.pos.y - p.h / 2)
            ) {
                if (
                    this.pos.x - this.w / 2 < p.pos.x + p.w / 2 &&
                    this.pos.x + this.w / 2 > p.pos.x - p.w / 2
                ) {
                    const angle = p.pos.clone()
                        .subtract(this.pos)
                        .sx(1 / this.w).sy(1 / this.h)
                        .atan2();

                    if (
                        Math.PI / 4 + .01 < angle &&
                        angle < Math.PI * 3 / 4 - .01
                    ) {
                        this.pos.y = p.pos.y - p.h / 2 - this.h / 2;
                        this.vel.y = Math.min(0, this.vel.y);
                        this.isGrounded = true;
                    } else if (
                        -Math.PI * 3 / 4 + .01 < angle &&
                        angle < -Math.PI / 4 - .01
                    ) {
                        this.pos.y = p.pos.y + p.h / 2 + this.h / 2;
                        this.vel.y = Math.max(0, this.vel.y);
                    } else if (
                        -Math.PI / 4 + .01 < angle && angle < Math.PI / 4 - .01
                    ) {
                        this.pos.x = p.pos.x - p.w / 2 - this.w / 2;
                        this.vel.x = Math.min(0, this.vel.x);
                    } else if (
                        Math.PI * 3 / 4 + .01 < angle ||
                        angle < -Math.PI * 3 / 4
                    ) {
                        this.pos.x = p.pos.x + p.w / 2 + this.w / 2;
                        this.vel.x = Math.max(0, this.vel.x);
                    }
                }
            }
        }
    }
}
