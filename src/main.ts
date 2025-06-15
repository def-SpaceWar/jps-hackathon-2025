import { listenInput } from "./input.ts";
import { initRender } from "./render.ts";
import { dialogue1, level1, level2, level3, Scene } from "./scene.ts";
import "./style.css";

initRender();
listenInput();

for (
    let scene: Scene | undefined = dialogue1;
    scene != undefined;
    scene = await scene()
);
