(() => {
    "use strict";

    // ============================================================
    // 1) PASTE ORIGINAL BASE64 ASSETS HERE (do not change them)
    // ============================================================
    const DROP_ALPHA_SRC = "data:image/png;base64,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";
    const DROP_COLOR_SRC = "data:image/png;base64,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";
    const REFLECTION_JPEG_SRC = "data:image/jpeg;base64,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";

    // ============================================================
    // 2) Small helpers (modern browsers only)
    // ============================================================
    const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
    const easeOutQuint = t => 1 - Math.pow(1 - t, 5);

    function times(n, fn) {
        for (let i = 0; i < n; i++) fn.call(null, i);
    }

    // core'daki random modülünün aynısı
    function random(min = null, max = null, ease = null) {
        if (min == null) { min = 0; max = 1; }
        else if (min != null && max == null) { max = min; min = 0; }
        const range = max - min;
        if (ease == null) ease = t => t;
        return min + ease(Math.random()) * range;
    }

    function createCanvas(w, h) {
        const c = document.createElement("canvas");
        c.width = w; c.height = h;
        return c;
    }

    function loadImages(list) {
        return Promise.all(list.map((item, idx) => new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "anonymous";
            img.onload = () => resolve({ name: item.name, img });
            img.onerror = () => reject(new Error("Image load failed: " + item.name));
            img.src = item.src;
        }))).then(arr => {
            const out = {};
            arr.forEach(x => out[x.name] = x.img);
            return out;
        });
    }

    // ============================================================
    // 3) WebGL minimal (same behavior as original)
    // ============================================================
    function getGL(canvas, opts) {
        for (const n of ["webgl", "experimental-webgl"]) {
            try { const gl = canvas.getContext(n, opts); if (gl) return gl; } catch (_) { }
        }
        return null;
    }
    function compileShader(gl, src, type) {
        const sh = gl.createShader(type);
        gl.shaderSource(sh, src);
        gl.compileShader(sh);
        if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
            console.error(gl.getShaderInfoLog(sh));
            gl.deleteShader(sh);
            return null;
        }
        return sh;
    }
    function createProgram(gl, vsSrc, fsSrc) {
        const vs = compileShader(gl, vsSrc, gl.VERTEX_SHADER);
        const fs = compileShader(gl, fsSrc, gl.FRAGMENT_SHADER);
        const p = gl.createProgram();
        gl.attachShader(p, vs);
        gl.attachShader(p, fs);
        gl.linkProgram(p);
        if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
            console.error(gl.getProgramInfoLog(p));
            gl.deleteProgram(p);
            return null;
        }

        // a_texCoord buffer
        const a_tex = gl.getAttribLocation(p, "a_texCoord");
        const texBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texBuf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            0, 0, 1, 0, 0, 1,
            0, 1, 1, 0, 1, 1
        ]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(a_tex);
        gl.vertexAttribPointer(a_tex, 2, gl.FLOAT, false, 0, 0);

        // a_position buffer (will be updated each frame)
        const a_pos = gl.getAttribLocation(p, "a_position");
        const posBuf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, posBuf);
        gl.enableVertexAttribArray(a_pos);
        gl.vertexAttribPointer(a_pos, 2, gl.FLOAT, false, 0, 0);

        return p;
    }
    function setRectangle(gl, x, y, w, h) {
        const x1 = x, x2 = x + w, y1 = y, y2 = y + h;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1, x2, y1, x1, y2,
            x1, y2, x2, y1, x2, y2
        ]), gl.STATIC_DRAW);
    }
    function createTexture(gl, unit, source) {
        gl.activeTexture(gl["TEXTURE" + unit]);
        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
        return tex;
    }
    function updateTexture(gl, unit, tex, source) {
        gl.activeTexture(gl["TEXTURE" + unit]);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);
    }

    // ============================================================
    // 4) GLObj wrapper (like original)
    // ============================================================
    class GLObj {
        constructor(canvas, glOpts, vs, fs) {
            this.canvas = canvas;
            this.gl = getGL(canvas, glOpts || {});
            if (!this.gl) throw new Error("WebGL not supported");
            this.program = createProgram(this.gl, vs, fs);
            this.gl.useProgram(this.program);
            this.width = canvas.width;
            this.height = canvas.height;
        }
        uniform2f(name, a, b) {
            const loc = this.gl.getUniformLocation(this.program, "u_" + name);
            this.gl.uniform2f(loc, a, b);
        }
        uniform1f(name, a) {
            const loc = this.gl.getUniformLocation(this.program, "u_" + name);
            this.gl.uniform1f(loc, a);
        }
        uniform1i(name, a) {
            const loc = this.gl.getUniformLocation(this.program, "u_" + name);
            this.gl.uniform1i(loc, a);
        }
        draw() {
            setRectangle(this.gl, 0, 0, this.width, this.height);
            this.gl.drawArrays(this.gl.TRIANGLES, 0, 6);
        }
    }

    // ============================================================
    // 5) RainRenderer (same shader logic as original 206)
    // ============================================================
    class RainRenderer {
        constructor(canvas, canvasLiquid, imageFg, imageBg, imageShine = null, opts = {}) {
            this.canvas = canvas;
            this.canvasLiquid = canvasLiquid;
            this.imageFg = imageFg;
            this.imageBg = imageBg;
            this.imageShine = imageShine;
            this.options = Object.assign({
                renderShadow: false,
                minRefraction: 256,
                maxRefraction: 512,
                brightness: 1,
                alphaMultiply: 20,
                alphaSubtract: 5
            }, opts);

            this.parallaxX = 0;
            this.parallaxY = 0;

            this._init();
        }

        _init() {
            const vs = `#define GLSLIFY 1
precision mediump float;
attribute vec2 a_position;
attribute vec2 a_texCoord;
uniform vec2 u_resolution;
varying vec2 v_texCoord;
varying vec2 v_resolution;
void main() {
  vec2 zeroToOne = a_position / u_resolution;
  vec2 zeroToTwo = zeroToOne * 2.0;
  vec2 clipSpace = zeroToTwo - 1.0;
  gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
  v_texCoord = a_texCoord;
  v_resolution = u_resolution;
}`;

            // shader is kept compatible with original (shine/shadow uniforms exist)
            const fs = `#define GLSLIFY 1
precision mediump float;
uniform sampler2D u_waterMap;
uniform sampler2D u_textureShine;
uniform sampler2D u_textureFg;
uniform sampler2D u_textureBg;
varying vec2 v_texCoord;
varying vec2 v_resolution;
uniform vec2 u_parallax;
uniform float u_textureRatio;
uniform int u_renderShine;
uniform int u_renderShadow;
uniform float u_minRefraction;
uniform float u_refractionDelta;
uniform float u_brightness;
uniform float u_alphaMultiply;
uniform float u_alphaSubtract;

vec4 blend(vec4 bg,vec4 fg){
  vec3 bgm=bg.rgb*bg.a;
  vec3 fgm=fg.rgb*fg.a;
  float ia=1.-fg.a;
  float a=(fg.a + bg.a * ia);
  vec3 rgb;
  if(a!=0.){
    rgb=(fgm + bgm * ia) / a;
  }else{
    rgb=vec3(0.,0.,0.);
  }
  return vec4(rgb,a);
}
vec2 scaledTexCoord(){
  float ratio=v_resolution.x/v_resolution.y;
  vec2 scale=vec2(1.,1.);
  vec2 offset=vec2(0.,0.);
  float ratioDelta=ratio-u_textureRatio;
  if(ratioDelta>=0.){
    scale.y=(1.+ratioDelta);
    offset.y=ratioDelta/2.;
  }else{
    scale.x=(1.-ratioDelta);
    offset.x=-ratioDelta/2.;
  }
  return (v_texCoord+offset)/scale;
}
vec2 pixel(){ return vec2(1.,1.)/v_resolution; }
vec2 parallax(float v){ return u_parallax*pixel()*v; }

vec4 offset(float x, float y){
  vec2 scale=vec2( (v_resolution.x+40.)/v_resolution.x, (v_resolution.y+40.)/v_resolution.y);
  vec2 scaledTexCoord=v_texCoord/scale;
  vec2 scaleOffset=vec2((1.-(1./scale.x))/2.,(1.-(1./scale.y))/2.);
  return texture2D(u_waterMap, (scaledTexCoord+scaleOffset)+(pixel()*vec2(x,y))+parallax(20.));
}

void main() {
  vec4 center = offset(0.,0.);
  float d=center.b;
  float x=center.g;
  float y=center.r;

  float a=clamp(center.a*u_alphaMultiply-u_alphaSubtract, 0.,1.);
  vec2 refraction=(vec2(x,y)-0.5)*2.;
  vec2 texturePos=scaledTexCoord() +( pixel()*refraction*(u_minRefraction+(d*u_refractionDelta)))+parallax(-15.);
  vec4 tex=texture2D(u_textureFg,texturePos);

  if(u_renderShine==1){
    float maxShine=490.;
    float minShine=maxShine*0.18;
    vec4 shine=texture2D(u_textureShine,vec2(0.5,0.5) + ((1./512.)*refraction)*-(minShine+((maxShine-minShine)*d)));
    tex=blend(tex,shine);
  }

  vec4 bg=texture2D(u_textureBg,scaledTexCoord()+parallax(5.));
  vec4 fg=vec4(tex.rgb*u_brightness,a);

  if(u_renderShadow==1){
    float borderAlpha = offset(0.,0.-(d*6.)).a;
    borderAlpha=borderAlpha*u_alphaMultiply-(u_alphaSubtract+0.5);
    borderAlpha=clamp(borderAlpha,0.,1.);
    borderAlpha*=0.2;
    vec4 border=vec4(0.,0.,0.,borderAlpha);
    fg=blend(border,fg);
  }

  gl_FragColor = blend(bg,fg);
}`;

            this.glObj = new GLObj(this.canvas, { alpha: false }, vs, fs);
            const gl = this.glObj.gl;

            // uniforms
            this.glObj.uniform2f("resolution", this.canvas.width, this.canvas.height);
            this.glObj.uniform1f("textureRatio", this.imageBg.width / this.imageBg.height);
            this.glObj.uniform1i("renderShine", this.imageShine ? 1 : 0);
            this.glObj.uniform1i("renderShadow", this.options.renderShadow ? 1 : 0);
            this.glObj.uniform1f("minRefraction", this.options.minRefraction);
            this.glObj.uniform1f("refractionDelta", this.options.maxRefraction - this.options.minRefraction);
            this.glObj.uniform1f("brightness", this.options.brightness);
            this.glObj.uniform1f("alphaMultiply", this.options.alphaMultiply);
            this.glObj.uniform1f("alphaSubtract", this.options.alphaSubtract);

            // textures
            this.texWater = createTexture(gl, 0, this.canvasLiquid);

            // textureShine (dummy 2x2 canvas if null)
            const shineCanvas = this.imageShine || createCanvas(2, 2);
            this.texShine = createTexture(gl, 1, shineCanvas);
            this.texFg = createTexture(gl, 2, this.imageFg);
            this.texBg = createTexture(gl, 3, this.imageBg);

            // sampler uniforms
            this.glObj.uniform1i("waterMap", 0);
            this.glObj.uniform1i("textureShine", 1);
            this.glObj.uniform1i("textureFg", 2);
            this.glObj.uniform1i("textureBg", 3);

            this._raf = requestAnimationFrame(this._draw.bind(this));
        }

        _draw() {
            // update parallax uniform
            const gl = this.glObj.gl;
            const loc = gl.getUniformLocation(this.glObj.program, "u_parallax");
            gl.uniform2f(loc, this.parallaxX, this.parallaxY);

            // update water texture
            updateTexture(gl, 0, this.texWater, this.canvasLiquid);

            this.glObj.draw();
            this._raf = requestAnimationFrame(this._draw.bind(this));
        }
    }

    // ============================================================
    // 6) Raindrops (same logic as original 207, kept intact)
    // ============================================================
    const GFX_SIZE = 64;
    const dropProto = {
        x: 0, y: 0, r: 0, spreadX: 0, spreadY: 0, momentum: 0, momentumX: 0,
        lastSpawn: 0, nextSpawn: 0, parent: null, isNew: true, killed: false, tension: 0, shrink: 0
    };

    class Raindrops {
        constructor(width, height, scale, dropAlpha, dropColor) {
            this.width = width; this.height = height; this.scale = scale;
            this.dropAlpha = dropAlpha; this.dropColor = dropColor;

            this.minR = 10; this.maxR = 40; this.maxDrops = 800;
            this.texturePixelDensity = 1;

            this.rainChance = 0.3; this.rainLimit = 3;
            this.drizzleCounter = 0; this.drizzle = 50;
            this.drizzleSize = [2, 4];
            this.drizzleCleaningRadiusMultiplier = 0.45;

            this.globalTimeScale = 1;
            this.trailRate = 1;
            this.autoShrink = true;
            this.spawnArea = [-0.1, 0.95];
            this.trailScaleRange = [0.2, 0.45];
            this.collisionRadius = 0.65;
            this.collisionRadiusIncrease = 0.01;
            this.dropFallMultiplier = 1;

            this.raining = true;
            this.lastRender = null;
            this.textureCleaningIterations = 0;

            this.canvas = createCanvas(width, height);
            this.ctx = this.canvas.getContext("2d");
            this.texture = createCanvas(width * this.texturePixelDensity, height * this.texturePixelDensity);
            this.textureCtx = this.texture.getContext("2d");
            this.drops = [];
            this.dropsGfx = [];
            this._buildGfx();
        }

        get deltaR() { return this.maxR - this.minR; }
        get area() { return this.width * this.height / this.scale; }
        get areaMultiplier() { return this.area / 786432; }

        _buildGfx() {
            const base = createCanvas(GFX_SIZE, GFX_SIZE);
            const i = base.getContext("2d");

            this.dropsGfx = Array.from({ length: 255 }, (_, blue) => {
                const sprite = createCanvas(GFX_SIZE, GFX_SIZE);
                const a = sprite.getContext("2d");

                i.clearRect(0, 0, GFX_SIZE, GFX_SIZE);
                i.globalCompositeOperation = "source-over";
                i.drawImage(this.dropColor, 0, 0, GFX_SIZE, GFX_SIZE);
                i.globalCompositeOperation = "screen";
                i.fillStyle = `rgba(0,0,${blue},1)`;
                i.fillRect(0, 0, GFX_SIZE, GFX_SIZE);

                a.globalCompositeOperation = "source-over";
                a.drawImage(this.dropAlpha, 0, 0, GFX_SIZE, GFX_SIZE);
                a.globalCompositeOperation = "source-in";
                a.drawImage(base, 0, 0, GFX_SIZE, GFX_SIZE);

                return sprite;
            });

            this.paintGfx = createCanvas(128, 128);
            const p = this.paintGfx.getContext("2d");
            p.fillStyle = "#000";
            p.beginPath(); p.arc(64, 64, 64, 0, 2 * Math.PI); p.fill();

            this._update();
        }

        _drawDrop(ctx, d) {
            if (!this.dropsGfx.length) return;

            let a = Math.max(0, Math.min(1, (d.r - this.minR) / this.deltaR * 0.9));
            a *= 1 / (0.5 * (d.spreadX + d.spreadY) + 1);
            a = Math.floor(a * (this.dropsGfx.length - 1));

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = "source-over";
            ctx.drawImage(this.dropsGfx[a],
                (d.x - 1 * d.r * (d.spreadX + 1)) * this.scale,
                (d.y - 1.5 * d.r * (d.spreadY + 1)) * this.scale,
                (2 * d.r * 1 * (d.spreadX + 1)) * this.scale,
                (2 * d.r * 1.5 * (d.spreadY + 1)) * this.scale
            );
        }

        _paint(x, y, r = 30) {
            const ctx = this.textureCtx;
            ctx.globalCompositeOperation = "destination-out";
            ctx.drawImage(this.paintGfx,
                (x - r) * this.texturePixelDensity * this.scale,
                (y - r) * this.texturePixelDensity * this.scale,
                (2 * r) * this.texturePixelDensity * this.scale,
                (2 * r) * this.texturePixelDensity * this.scale * 1.5
            );
        }

        _createDrop(props) {
            if (this.drops.length >= this.maxDrops) return null;
            return Object.assign(Object.create(dropProto), props);
        }

        _updateRain(dt) {
            const out = [];
            if (!this.raining) return out;

            const limit = this.rainLimit * dt * this.areaMultiplier;
            let i = 0;
            while (Math.random() <= this.rainChance * dt * this.areaMultiplier && i < limit) {
                i++;
                const rr = random(this.minR, this.maxR, t => Math.pow(t, 3));
                const d = this._createDrop({
                    x: random(this.width / this.scale),
                    y: random(this.height / this.scale * this.spawnArea[0], this.height / this.scale * this.spawnArea[1]),
                    r: rr,
                    momentum: 1 + 0.3 * (rr - this.minR) + random(0.5),
                    spreadX: 1.5,
                    spreadY: 1.5
                });
                if (d) out.push(d);
            }
            return out;
        }

        _updateTexture(dt) {
            if (this.textureCleaningIterations > 0) {
                this.textureCleaningIterations -= 1 * dt;
                this.textureCtx.globalCompositeOperation = "destination-out";
                this.textureCtx.fillStyle = `rgba(0,0,0,${0.05 * dt})`;
                this.textureCtx.fillRect(0, 0, this.width * this.texturePixelDensity, this.height * this.texturePixelDensity);
            }

            if (this.raining) {
                this.drizzleCounter += this.drizzle * dt * this.areaMultiplier;
                times(this.drizzleCounter | 0, () => {
                    this.drizzleCounter--;
                    this._drawDrop(this.textureCtx, Object.assign(Object.create(dropProto), {
                        x: random(this.width / this.scale),
                        y: random(this.height / this.scale),
                        r: random(this.drizzleSize[0], this.drizzleSize[1], t => t * t)
                    }));
                });
            }
            this.ctx.drawImage(this.texture, 0, 0, this.width, this.height);
        }

        _updateDrops(dt) {
            const next = [];
            this._updateTexture(dt);
            next.push(...this._updateRain(dt));

            const W = this.width / this.scale;
            this.drops.sort((a, b) => (a.y * W + a.x) - (b.y * W + b.x));

            this.drops.forEach((d, idx) => {
                if (d.killed) return;

                if (Math.random() <= (d.r - this.minR * this.dropFallMultiplier) * (0.1 / this.deltaR) * dt) {
                    d.momentum += random(d.r / this.maxR * 4);
                }

                if (this.autoShrink && d.r <= this.minR && Math.random() <= 0.05 * dt) {
                    d.shrink += 0.01;
                }

                d.r -= d.shrink * dt;
                if (d.r <= 0) { d.killed = true; return; }

                if (this.raining) {
                    d.lastSpawn += d.momentum * dt * this.trailRate;
                    if (d.lastSpawn > d.nextSpawn) {
                        const child = this._createDrop({
                            x: d.x + 0.1 * random(-d.r, d.r),
                            y: d.y - 0.01 * d.r,
                            r: d.r * random(this.trailScaleRange[0], this.trailScaleRange[1]),
                            spreadY: 0.15 * d.momentum,
                            parent: d
                        });
                        if (child) {
                            next.push(child);
                            d.r *= Math.pow(0.97, dt);
                            d.lastSpawn = 0;
                            d.nextSpawn = random(this.minR, this.maxR) - 2 * d.momentum * this.trailRate + (this.maxR - d.r);
                        }
                    }
                }

                d.spreadX *= Math.pow(0.4, dt);
                d.spreadY *= Math.pow(0.7, dt);

                const falling = d.momentum > 0;
                if (falling && !d.killed) {
                    d.y += d.momentum;
                    d.x += d.momentumX;
                    if (d.y > this.height / this.scale + d.r) d.killed = true;
                }

                const mayCollide = (falling || d.isNew) && !d.killed;
                d.isNew = false;

                if (mayCollide) {
                    this.drops.slice(idx + 1, idx + 70).forEach(o => {
                        if (d === o || d.r <= o.r || d.parent === o || o.parent === d || o.killed) return;
                        const dx = o.x - d.x, dy = o.y - d.y;
                        const dist = Math.sqrt(dx * dx + dy * dy);
                        const cr = (d.r + o.r) * (this.collisionRadius + d.momentum * this.collisionRadiusIncrease * dt);
                        if (dist < cr) {
                            const PI = Math.PI;
                            let nr = Math.sqrt((PI * d.r * d.r + 0.8 * PI * o.r * o.r) / PI);
                            nr = Math.min(this.maxR, nr);
                            d.r = nr;
                            d.momentumX += 0.1 * dx;
                            d.spreadX = 0; d.spreadY = 0;
                            o.killed = true;
                            d.momentum = Math.max(o.momentum, Math.min(40, d.momentum + 0.04 * nr + 1));
                        }
                    });
                }

                d.momentum -= 0.1 * Math.max(1, 0.5 * this.minR - d.momentum) * dt;
                if (d.momentum < 0) d.momentum = 0;
                d.momentumX *= Math.pow(0.7, dt);

                if (!d.killed) {
                    next.push(d);
                    if (falling && this.drizzle > 0) this._paint(d.x, d.y, d.r * this.drizzleCleaningRadiusMultiplier);
                    this._drawDrop(this.ctx, d);
                }
            });

            this.drops = next;
        }

        _update() {
            this.ctx.clearRect(0, 0, this.width, this.height);

            const now = Date.now();
            if (this.lastRender == null) this.lastRender = now;

            let dt = (now - this.lastRender) / (1000 / 60);
            dt = Math.min(2, dt) * this.globalTimeScale;
            this.lastRender = now;

            this._updateDrops(dt);
            requestAnimationFrame(this._update.bind(this));
        }
    }

    // ============================================================
    // 7) Boot (same params as original)
    // ============================================================
    const canvas = document.getElementById("bg-canvas");
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
    canvas.width = Math.floor(window.innerWidth * dpr);
    canvas.height = Math.floor(window.innerHeight * dpr);

    // load original assets
    loadImages([
        { name: "dropAlpha", src: DROP_ALPHA_SRC },
        { name: "dropColor", src: DROP_COLOR_SRC },
        { name: "tex", src: REFLECTION_JPEG_SRC }
    ]).then(({ dropAlpha, dropColor, tex }) => {

        // create raindrops
        const drops = new Raindrops(canvas.width, canvas.height, dpr, dropAlpha, dropColor);
        drops.trailRate = 1;
        drops.trailScaleRange = [0.2, 0.45];

        // fg/bg texture canvases (same as original sizes)
        const fg = createCanvas(192, 128);
        const bg = createCanvas(384, 256);
        fg.getContext("2d").drawImage(tex, 0, 0, 192, 128);
        bg.getContext("2d").drawImage(tex, 0, 0, 384, 256);

        const renderer = new RainRenderer(
            canvas,
            drops.canvas,
            fg,
            bg,
            null,
            { brightness: 1.04, alphaMultiply: 10, alphaSubtract: 3, minRefraction: 128, maxRefraction: 512 }
        );

        // minimal GSAP replacement: 1s easeOutQuint tween to parallax target
        let tween = null;
        const T = { x: 0, y: 0 };

        function tweenTo(nx, ny) {
            const sx = T.x, sy = T.y;
            const t0 = performance.now(), dur = 1000;
            function step(now) {
                const t = clamp((now - t0) / dur, 0, 1);
                const k = easeOutQuint(t);
                T.x = sx + (nx - sx) * k;
                T.y = sy + (ny - sy) * k;
                renderer.parallaxX = T.x;
                renderer.parallaxY = T.y;
                if (t < 1) tween = requestAnimationFrame(step);
            }
            if (tween) cancelAnimationFrame(tween);
            tween = requestAnimationFrame(step);
        }

        document.addEventListener("mousemove", (ev) => {
            // intentionally same style as original (pageX / canvas.width)
            const px = (ev.pageX ?? ev.clientX ?? 0);
            const py = (ev.pageY ?? ev.clientY ?? 0);
            const x = px / canvas.width * 2 - 1;
            const y = py / canvas.height * 2 - 1;
            tweenTo(x, y);
        }, { passive: true });

    }).catch(err => {
        console.error(err);
    });

})();
