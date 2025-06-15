import { keys } from "./input.ts";
import {
    breagBB,
    breagCG,
    breagNB,
    breagNF,
    brigBB,
    brigCG,
    brigNB,
    brigNF,
    cargoBB,
    cargoCG,
    cargoNB,
    cargoNF,
    engineBB,
    engineCG,
    engineNB,
    engineNF,
} from "./map.ts";
import { Vector2D } from "./physics.ts";
import { Player } from "./player.ts";
import {
    AnimatedSprite,
    camera,
    canvas,
    createMap,
    ctx,
    Dialogue,
    Orb,
    Sprite,
    updateLoop,
} from "./render.ts";
import { explosion } from "./rithvik/animation.ts";
import {
    cargoBack,
    dialogueBox,
    engineRoom,
    invinciMark,
    jailCell,
    key,
    skyBox,
} from "./rithvik/misc.ts";

export type Scene = () => Promise<Scene | undefined>;

export const dialogue1: Scene = async () => {
    const dialogues = [
        new Dialogue(["You find yourself waking up", "'Where am I?'"]),
        new Dialogue(["'What's going on?'", "'Why am I here?'"]),
        new Dialogue([
            "'My head hurts'",
            "'I think I got hit in the head pretty hard'",
        ]),
        new Dialogue(["Use WASD or Arrow Keys to move", "Enjoy :)"]),
    ];
    let dialogueIdx = 0;

    const decoratedDialogueSprite = await Sprite.fromSpriteSource(
        dialogueBox,
        Vector2D.xy(0, 0),
        800,
        250,
    );

    return new Promise((res) => {
        const stop = updateLoop((_) => {
            decoratedDialogueSprite.render();
            dialogues[dialogueIdx].render();
        });

        function spacePress(e: KeyboardEvent) {
            if (e.key != " ") return;

            if (dialogueIdx < dialogues.length - 1) dialogueIdx++;
            else {
                document.removeEventListener("keypress", spacePress);
                stop();
                res(level1);
            }
        }
        document.addEventListener("keypress", spacePress);
    });
};

export const dialogue2: Scene = async () => {
    const dialogues = [
        new Dialogue(["'Ohhh, so orbs send you places'", "'Good knowledge'"]),
        new Dialogue([
            "'Whatever it is, I probably will need a few more more orbs'",
            "'To get out of this hellhole'",
        ]),
    ];
    let dialogueIdx = 0;

    const decoratedDialogueSprite = await Sprite.fromSpriteSource(
        dialogueBox,
        Vector2D.xy(0, 0),
        800,
        250,
    );

    return new Promise((res) => {
        const stop = updateLoop((_) => {
            decoratedDialogueSprite.render();
            dialogues[dialogueIdx].render();
        });

        function spacePress(e: KeyboardEvent) {
            if (e.key != " ") return;

            if (dialogueIdx < dialogues.length - 1) dialogueIdx++;
            else {
                document.removeEventListener("keypress", spacePress);
                stop();
                res(level2);
            }
        }
        document.addEventListener("keypress", spacePress);
    });
};

export const dialogue3: Scene = async () => {
    const dialogues = [
        new Dialogue([
            "'Wow, three orbs'",
            "'Well, I have a feeling I'm almost out of here'",
        ]),
        new Dialogue([
            "'Ah, the engine room'",
            "'I can blow myself out of this place'",
        ]),
    ];
    let dialogueIdx = 0;

    const decoratedDialogueSprite = await Sprite.fromSpriteSource(
        dialogueBox,
        Vector2D.xy(0, 0),
        800,
        250,
    );

    return new Promise((res) => {
        const stop = updateLoop((_) => {
            decoratedDialogueSprite.render();
            dialogues[dialogueIdx].render();
        });

        function spacePress(e: KeyboardEvent) {
            if (e.key != " ") return;

            if (dialogueIdx < dialogues.length - 1) dialogueIdx++;
            else {
                document.removeEventListener("keypress", spacePress);
                stop();
                res(level3);
            }
        }
        document.addEventListener("keypress", spacePress);
    });
};

export const level1: Scene = async () => {
    const player = new Player(true),
        mapOffset = Vector2D.xy(0, 0),
        [map, spawnPoint] = await createMap(brigCG, mapOffset),
        [bg, _0] = await createMap(brigNB, mapOffset),
        [bb, _1] = await createMap(brigBB, mapOffset),
        [fg, _2] = await createMap(brigNF, mapOffset);
    player.pos.add(spawnPoint);
    camera.target = player.pos;
    const decoratedDialogueSprite = await Sprite.fromSpriteSource(
        dialogueBox,
        Vector2D.xy(0, 0),
        800,
        250,
    );

    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(910, 674),
            182,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(920, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1090, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1260, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(990, 290),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1160, 290),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1330, 290),
            192,
            143,
        ),
    );

    const skybox = await Sprite.fromSpriteSource(
        skyBox,
        Vector2D.xy(500, 800),
        3200,
        2400,
    );

    await player.load();
    let showDialogue = false;
    const dialogues = [
        new Dialogue(["'Yes!, A key'", "'I can use this to escape'"]),
        new Dialogue(["'WHAT!!!'", "'It's glued down'"]),
        new Dialogue([
            "'Well, there is bread here..'",
            "'Looks nasty, but might as well try it'",
        ]),
        new Dialogue([
            "'Why would I eveer pick up the bread though?'",
            "'...'",
        ]),
        new Dialogue(["Because", "Br-"]),
    ];
    let dialogueIdx = 0;

    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            if (!showDialogue) player.update(dt, map);
            skybox.render();
            ctx.globalAlpha = .875;
            bg.forEach((t) => t.render(dt));
            ctx.globalAlpha = 1;
            bb.forEach((t) => t.render(dt));
            map.forEach((t) => t.render(dt));
            player.renderable.render(dt);
            fg.forEach((t) => t.render(dt));
            if (showDialogue) {
                ctx.save();
                ctx.translate(camera.pos.x, camera.pos.y);
                decoratedDialogueSprite.render();
                dialogues[dialogueIdx].render();
                ctx.restore();
                if (
                    dialogues[dialogues.length - 1]
                        .animatedTexts[
                            dialogues[dialogues.length - 1].animatedTexts
                                .length - 1
                        ].isDone
                ) {
                    keys.clear();
                    camera.reset();
                    stop();
                    document.removeEventListener("keypress", spacePress);
                    res(titleCard);
                }
            }
            if (
                Vector2D.xy(1120, 760).subtract(player.pos)
                    .getMagnitudeSquared() < 25_600
            ) {
                showDialogue = true;
            }
            if (keys.has("r")) {
                keys.clear();
                camera.reset();
                stop();
                document.removeEventListener("keypress", spacePress);
                res(level1);
            }
        });

        function spacePress(e: KeyboardEvent) {
            if (!showDialogue) return;
            if (e.key != " ") return;

            if (dialogueIdx < dialogues.length - 1) dialogueIdx++;
        }
        document.addEventListener("keypress", spacePress);
    });
};

export const titleCard: Scene = async () => {
    const img = await Sprite.fromSpriteSource(
        invinciMark,
        Vector2D.xy(0, -100),
        600,
        450,
    );
    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            img.render();
            img.w += 180 * dt;
            img.h += 120 * dt;
        });

        setTimeout(() => {
            keys.clear();
            camera.reset();
            stop();
            res(level1B);
        }, 2100);
    });
};

export const level1B: Scene = async () => {
    const player = new Player(true),
        mapOffset = Vector2D.xy(0, 0),
        [map, spawnPoint] = await createMap(breagCG, mapOffset),
        [bg, _0] = await createMap(breagNB, mapOffset),
        [bb, _1] = await createMap(breagBB, mapOffset),
        [fg, _2] = await createMap(breagNF, mapOffset);
    player.pos.add(spawnPoint);
    camera.target = player.pos;

    const decoratedDialogueSprite = await Sprite.fromSpriteSource(
        dialogueBox,
        Vector2D.xy(0, 0),
        800,
        250,
    );

    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(910, 674),
            182,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(920, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1090, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1260, 482),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(990, 290),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1160, 290),
            192,
            143,
        ),
    );
    fg.push(
        await Sprite.fromSpriteSource(
            jailCell,
            Vector2D.xy(1330, 290),
            192,
            143,
        ),
    );

    const skybox = await Sprite.fromSpriteSource(
        skyBox,
        Vector2D.xy(500, 800),
        3200,
        2400,
    );

    await player.load();
    let showDialogue = false;
    const dialogues = [
        new Dialogue([
            "'Okay, I guess with the bread placed here, I can climb further up'",
            "'There might be a way out of here'",
        ]),
        new Dialogue([
            "'If I find that, I can bring it back here and leave through this door!'",
            "'I have my work cut out for me'",
        ]),
    ];
    let dialogueIdx = 0;

    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            if (!showDialogue) player.update(dt, map);
            skybox.render();
            ctx.globalAlpha = .875;
            bg.forEach((t) => t.render(dt));
            ctx.globalAlpha = 1;
            bb.forEach((t) => t.render(dt));
            map.forEach((t) => t.render(dt));
            player.renderable.render(dt);
            fg.forEach((t) => t.render(dt));
            if (showDialogue) {
                ctx.save();
                ctx.translate(camera.pos.x, camera.pos.y);
                decoratedDialogueSprite.render();
                dialogues[dialogueIdx].render();
                ctx.restore();
            }
            if (
                Vector2D.xy(280, 760).subtract(player.pos)
                    .getMagnitudeSquared() < 8_192
            ) {
                showDialogue = true;
            }
            if (keys.has("r")) {
                keys.clear();
                camera.reset();
                stop();
                document.removeEventListener("keypress", spacePress);
                res(level1);
            }
        });

        function spacePress(e: KeyboardEvent) {
            if (!showDialogue) return;
            if (e.key != " ") return;

            if (dialogueIdx < dialogues.length - 1) dialogueIdx++;
            else {
                keys.clear();
                camera.reset();
                stop();
                document.removeEventListener("keypress", spacePress);
                res(dialogue2);
            }
        }
        document.addEventListener("keypress", spacePress);
    });
};

export const level2: Scene = async () => {
    const player = new Player(true),
        mapOffset = Vector2D.xy(0, 0),
        [map, spawnPoint] = await createMap(cargoCG, mapOffset),
        [bg, _0] = await createMap(cargoNB, mapOffset),
        [bb, _1] = await createMap(cargoBB, mapOffset),
        [fg, _2] = await createMap(cargoNF, mapOffset);
    player.pos.add(spawnPoint);
    camera.target = player.pos;
    let orbCount = 3;

    const skybox = await Sprite.fromSpriteSource(
        skyBox,
        Vector2D.xy(500, 800),
        3200,
        2400,
    );

    bg.push(
        await Sprite.fromSpriteSource(
            cargoBack,
            Vector2D.xy(730, 415),
            1420,
            820,
        ),
    );

    await player.load();

    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            player.update(dt, map);
            skybox.render();
            ctx.globalAlpha = .875;
            bg.forEach((t) => t.render(dt));
            ctx.globalAlpha = 1;
            bb.forEach((t) => t.render(dt));
            map.forEach((t) => t.render(dt));
            player.renderable.render(dt);
            fg.forEach((t) => t.render(dt));

            // @ts-ignore:
            map.filter((t) => t.isOrb).forEach((o) => {
                if (
                    o.pos.clone().subtract(player.pos).getMagnitudeSquared() <
                        8_192
                ) {
                    const index = map.indexOf(o);
                    if (index > -1) {
                        map.splice(index, 1);
                    }
                    orbCount--;
                }
            });

            if (orbCount == 0) {
                keys.clear();
                camera.reset();
                stop();
                res(dialogue3);
            }

            if (keys.has("r")) {
                keys.clear();
                camera.reset();
                stop();
                res(level2);
            }
        });
    });
};

export const level3: Scene = async () => {
    const player = new Player(true),
        mapOffset = Vector2D.xy(0, 0),
        [map, spawnPoint] = await createMap(engineCG, mapOffset),
        [bg, _0] = await createMap(engineNB, mapOffset),
        [bb, _1] = await createMap(engineBB, mapOffset),
        [fg, _2] = await createMap(engineNF, mapOffset);
    player.pos.add(spawnPoint);
    camera.target = player.pos;

    bg.push(
        await Sprite.fromSpriteSource(
            engineRoom,
            Vector2D.xy(730, 370),
            1420,
            720,
        ),
    );

    const skybox = await Sprite.fromSpriteSource(
        skyBox,
        Vector2D.xy(500, 800),
        3200,
        2400,
    );

    await player.load();
    let done = false;

    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            player.update(dt, map);
            skybox.render();
            ctx.globalAlpha = .875;
            bg.forEach((t) => t.render(dt));
            ctx.globalAlpha = 1;
            bb.forEach((t) => t.render(dt));
            map.forEach((t) => t.render(dt));
            player.renderable.render(dt);
            fg.forEach((t) => t.render(dt));

            // @ts-ignore:
            map.filter((t) => t.isO2).forEach((o) => {
                if (
                    o.pos.clone().subtract(player.pos).getMagnitudeSquared() <
                        8_192 && !done
                ) {
                    done = true;
                    const id = setInterval(() => {
                        o.pos.x += 8;
                        o.pos.y -= 12;
                    }, 20);
                    setTimeout(() => {
                        const index = map.indexOf(o);
                        if (index > -1) {
                            map.splice(index, 1);
                        }
                        keys.clear();
                        camera.reset();
                        clearInterval(id);
                        stop();
                        res(endCutscene);
                    }, 1_500);
                }
            });

            if (keys.has("r")) {
                keys.clear();
                camera.reset();
                stop();
                res(level1);
            }
        });
    });
};

export const endCutscene: Scene = async () => {
    const explosion_ = await AnimatedSprite.fromVariedSpriteSource(
        explosion,
        "doorAnimation",
        Vector2D.xy(400, 300),
        800,
        600,
    );
    camera.offset = Vector2D.xy(0, 0);

    return new Promise((res) => {
        const stop = updateLoop((dt) => {
            explosion_.render(dt);
        });
        setTimeout(() => {
            stop();
            res(undefined);
            ctx.reset();
            ctx.clearRect(0, 0, canvas.width, canvas.height);
        }, 10_000);
    });
};
