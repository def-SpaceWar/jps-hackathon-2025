export class Vector2D {
    static xy(x: number, y: number) {
        return new this(x, y);
    }

    static x(x: number) {
        return new this(x, 0);
    }

    static y(y: number) {
        return new this(0, y);
    }

    static dot(u: Vector2D, v: Vector2D) {
        return u.x * v.x + u.y + v.y;
    }

    static unit(theta: number) {
        return Vector2D.xy(Math.cos(theta), Math.sin(theta));
    }

    private constructor(public x: number, public y: number) {}

    clone() {
        return Vector2D.xy(this.x, this.y);
    }

    add(v: Vector2D) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }

    axy(x: number, y: number) {
        this.x += x;
        this.y += y;
        return this;
    }

    ax(x: number) {
        this.x += x;
        return this;
    }

    ay(y: number) {
        this.y += y;
        return this;
    }

    subtract(v: Vector2D) {
        this.x -= v.x;
        this.y -= v.y;
        return this;
    }

    scale(n: number) {
        this.x *= n;
        this.y *= n;
        return this;
    }

    sx(n: number) {
        this.x *= n;
        return this;
    }

    sy(n: number) {
        this.y *= n;
        return this;
    }

    toUnit() {
        return this.clone().scale(1 / this.getMagnitude());
    }

    rotate(angle: number) {
        [this.x, this.y] = [
            this.x * Math.cos(angle) - this.y * Math.sin(angle),
            this.y * Math.cos(angle) + this.x * Math.sin(angle),
        ];
        return this;
    }

    getMagnitudeSquared() {
        return this.x ** 2 + this.y ** 2;
    }

    getMagnitude() {
        return Math.sqrt(this.getMagnitudeSquared());
    }

    nearZero() {
        return this.getMagnitudeSquared() < 0.0001;
    }

    toTuple(): [number, number] {
        return [this.x, this.y];
    }

    atan2() {
        return Math.atan2(this.y, this.x);
    }
}
