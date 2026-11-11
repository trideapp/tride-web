import type * as FilamentNs from './filament-types.js';

export declare type AdvanceOutcome = ReturnType<ScenePlayer['advance']>;

declare type AntiAliasingMethod = 'NONE' | 'FXAA';



declare type AudioInputKind = 'track' | 'stream';

/** Which input of the scene a sound feeds. */
declare interface AudioInputOptions {
    /** The scene's input name (`audio.<input>.<probe>`); default `music`. */
    readonly input?: string | undefined;
}

/** Options of `attachAudioMedia`: the scene's input (`music` by default), the `context`. */
export declare type AudioMediaAttachOptions = AudioMediaTapOptions & AudioInputOptions;

/** An element the scene hears; the page plays it as before. */
export declare interface AudioMediaTap extends SceneAudioSource {
    readonly media: HTMLMediaElement;
    /** Resume the audio context and play the element — from a user gesture. */
    play(): Promise<void>;
    pause(): void;
}

declare interface AudioMediaTapOptions {
    /** The context the element plays through; default: the page's. */
    readonly context?: AudioContext | undefined;
}

/** Where a source's PCM goes: one runtime's audio input. */
declare interface AudioPcmSink {
    /** Interleaved PCM whose first sample sounds at `startTimeS` of the source's audio time. */
    append(startTimeS: number, pcm: Float32Array): void;
    /** A track is complete: silence follows its tail. */
    end(): void;
    /** Drop what the input was given (a new track, another station). */
    reset(): void;
    /** Say something about this input once (a stream the browser keeps silent, a suspended context). */
    problem(key: string, message: string): void;
}

/** A track the page controls and the scene hears. */
export declare interface AudioTrack extends SceneAudioSource {
    /** Length in seconds. */
    readonly duration: number;
    /** Playback position in seconds. */
    readonly currentTime: number;
    readonly playing: boolean;
    loop: boolean;
    /** Playback volume (1 = as decoded); the scene hears it too. */
    volume: number;
    muted: boolean;
    /** Start (or resume) playback — from a user gesture, which lets the browser start the sound. */
    play(): Promise<void>;
    pause(): void;
    /** Jump to `timeS` seconds (playing or not). */
    seek(timeS: number): void;
}

/** Options of `attachAudioTrack`: the scene's input (`music` by default), `loop`, the `context`. */
export declare type AudioTrackAttachOptions = AudioTrackOptions & AudioInputOptions;

/** A track by URL, its encoded bytes, or audio the page decoded itself. */
declare type AudioTrackData = string | URL | ArrayBuffer | Uint8Array | AudioBuffer;

declare interface AudioTrackOptions {
    /** The context the track plays through; default: the page's. */
    readonly context?: AudioContext | undefined;
    /** Start again at the end (default: no). */
    readonly loop?: boolean | undefined;
}

/** A track: its URL, the file's bytes, or audio the page decoded itself (`AudioBuffer`). */
export declare type AudioTrackSource = AudioTrackData;

/** Linear RGB. */
declare type BackgroundColor = readonly [number, number, number];

declare interface BindingDescriptor {
    name: string;

    kind: "number" | "bool" | "trigger" | "enum" | "vec3" | "quat" | "color" | "image" | "string";

    options: string[];

    computed?: string;
}

/**
 * A binding the scene declares: `name`, `kind`, an enum's `options`, and for a computed value what
 * computes it (a formula, or a graph node's `node.port`).
 */
export declare type BindingInfo = ReturnType<ScenePlayer['availableBindings']>[number];

export declare type BindingValue = Parameters<ScenePlayer['setBinding']>[1];

/** A scalar, a text, or the components of a vec3 `[x,y,z]` / quat `[x,y,z,w]` / colour `[r,g,b,a]` input. */
declare type BindingValue_2 = number | boolean | string | number[];

declare interface BloomOptions {
    enabled?: boolean;
    strength?: number;
    resolution?: number;
    levels?: number;
    threshold?: boolean;
    highlight?: number;
    quality?: QualityLevel;
    lensFlare?: boolean;
}

declare interface BonePaletteCheck {
    /** Palettes measured. */
    readonly palettes: number;
    /** Bones measured. */
    readonly bones: number;
    /** The largest difference relative to the largest element of the bone's factors. */
    readonly worst: number;
    /** Palettes the host could not place (a row without an entity, a joint the skin lacks). */
    readonly unplaced: number;
}

/** One binding the page made: the input, its source and the range it maps. */
export declare type BoundInput = ReturnType<ScenePlayer['boundInputs']>[number];

/**
 * One host binding of an input.
 */
declare interface BoundInput_2 {
    input: string;
    source: InputSource_2;
    from: [number, number];
    to: [number, number];
}

declare type Camera = FilamentNs.Camera;

/** A member of Filament's `Camera$Fov` (`VERTICAL`, `HORIZONTAL`) as embind hands it out. */
declare interface CameraFovMember {
    readonly value: number;
}

/**
 * Optional writable Filament-compatible camera surface used by
 * {@link OrbitControls.applyTo}. Only the subset of methods we actually
 * call is required so the unit test can pass in a tiny stub.
 */
declare interface CameraLike {
    lookAt(eye: readonly [number, number, number], center: readonly [number, number, number], up: readonly [number, number, number]): void;
    setProjectionFov(fovDegrees: number, aspect: number, near: number, far: number, fov: CameraFovMember): void;
    /** Explicit-frustum projection (Filament `Camera.setProjection`). */
    setProjection(projection: CameraProjectionMember, left: number, right: number, bottom: number, top: number, near: number, far: number): void;

    setFocusDistance?(distance: number): void;

    setExposure?(aperture: number, shutterSpeed: number, sensitivity: number): void;
}

/** A member of Filament's `Camera$Projection` (`PERSPECTIVE`, `ORTHO`) as embind hands it out. */
declare interface CameraProjectionMember {
    readonly value: number;
}

/** The canvas' WebGL context attributes a page chooses at `create`: `preserveDrawingBuffer`. */
export declare type ContextAttributes = NonNullable<ScenePlayerOptions['contextAttributes']>;


declare interface ContextAttributes_2 {
    /**
     * Keep the painted frame on the canvas until the next one is painted (`false` by default: the
     * browser clears the buffer once it has shown the frame, so the frame can be read only in the
     * task that painted it). With `true` the frame is read at any time — `new VideoFrame(canvas)`,
     * `drawImage`, `createImageBitmap`, `toBlob`.
     */
    readonly preserveDrawingBuffer?: boolean | undefined;
}

/** A picture as stb gives it: RGBA8, rows top to bottom. */
declare interface DecodedPicture {
    readonly width: number;
    readonly height: number;
    readonly pixels: Uint8Array;
}


declare type DecorationKind = 'grid' | 'helper' | 'gizmo' | 'wireframe';

declare type DepthOfFieldFilter = 'NONE' | 'UNUSED' | 'MEDIAN';

declare interface DepthOfFieldOptions {
    enabled?: boolean;
    cocScale?: number;
    cocAspectRatio?: number;
    maxApertureDiameter?: number;
    filter?: DepthOfFieldFilter;
    nativeResolution?: boolean;

    maxForegroundCoc?: number;
    maxBackgroundCoc?: number;
    /** Gather-kernel rings, 0..17 (`(2n − 1)²` samples); 0 = engine default (3). */
    foregroundRingCount?: number;
    backgroundRingCount?: number;
    fastGatherRingCount?: number;
}

declare type DitherMethod = 'NONE' | 'TEMPORAL';

/** The view axes the scene's drag interactions claim. */
export declare type DragAxes = ReturnType<ScenePlayer['dragAxes']>;


declare interface DragAxes_2 {
    x: boolean;
    y: boolean;
}


declare interface DrawnStats {
    readonly triangles: number;
    readonly vertices: number;
    readonly selectedTriangles: number;
    readonly selectedVertices: number;
}

declare interface DynamicResolutionOptions {
    enabled?: boolean;
    minScale?: number;
    maxScale?: number;
    quality?: QualityLevel;
}

/**
 * A server that renders a page which imports this package has no `HTMLElement`: the class is still
 * declared, so the import works, and the tag is registered only in a browser (below).
 */
declare const ElementBase: typeof HTMLElement;

declare type Engine = FilamentNs.Engine;

declare type Entity = FilamentNs.Entity;

declare type Entity_2 = FilamentNs.Entity;

declare type Entity_3 = FilamentNs.Entity;


declare interface EnvBlobResolver {
    /** Retained KTX blob pair for `uid`, or `undefined` when none is registered. */
    get(uid: string): {
        readonly iblKtx: Uint8Array;
        readonly skyboxKtx: Uint8Array | null;
    } | undefined;
}

declare interface EnvironmentSources {
    /** The SDK preset `name`'s IBL KTX, and its skybox when `wantSkybox`. Absent = presets unavailable. */
    readonly preset?: ((name: string, wantSkybox: boolean) => Promise<{
        readonly iblKtx: Uint8Array;
        readonly skyboxKtx: Uint8Array | null;
    }>) | undefined;
    /** A custom environment's retained blobs (`assets/ibl/<uid>_{ibl,skybox}.ktx`). */
    readonly custom?: EnvBlobResolver | null | undefined;
    /** Where a problem is reported; default `console.warn`. */
    readonly warn?: ((message: string, cause?: unknown) => void) | undefined;
}

declare type FilamentAsset = FilamentNs.gltfio$FilamentAsset;

declare interface FilamentEngineHandle {
    readonly runtime: FilamentRuntime;
    readonly engine: Engine;
    readonly scene: Scene;
    readonly view: View;
    readonly renderer: Renderer;
    readonly camera: Camera & CameraLike;
    readonly swapChain: SwapChain;
    /** gltfio asset loader of the editor decorations (`gltfio-loader.ts`). */
    readonly loader: GltfioLoader;

    paletteInstancesFor?(slug: string): PaletteInstances | null;

    holdPaletteWrites?(slug: string, held: HeldPaletteWrites): void;

    rekeyMaterial?(slug: string, key: unknown): MaterialRekey;

    setSize(widthPx: number, heightPx: number, pixelsPerPoint?: number): void;

    loadAsset(buffer: Uint8Array, basePath?: string | null, opts?: {
        overlay?: boolean;
        decoration?: DecorationKind;
    }): Promise<FilamentAsset>;

    readonly overlayActive: boolean;

    prepareScene(materials?: SceneMaterialSource | null): Promise<PreparedScene>;
    /**
     * From now on every scene call (node entities, generated meshes, clone batches, palette and
     * material writes) lands on `prepared`; the shown scene draws as it was.
     */
    addressScene(prepared: PreparedScene): void;
    /**
     * Show `prepared` at the start of the next `render()`: the shown scene's entities leave and the
     * prepared one's enter in the same frame; the old scene is then disposed.
     */
    commitScene(prepared: PreparedScene): void;
    /** Drop `prepared` unseen (a cancelled reload). */
    discardScene(prepared: PreparedScene): void;
    /** Remove entity/entities from the scene (hide a node). */
    hideEntity(entities: readonly Entity[]): void;
    /** Add previously-removed entity/entities back to the scene (show a node). */
    showEntity(entities: readonly Entity[]): void;

    setEntityTransform(entity: Entity, position: readonly [number, number, number], rotation: readonly [number, number, number, number], scale: readonly [number, number, number]): void;
    /**
     * Re-parent `entity` under `newParent` in Filament's TransformManager
     * hierarchy; `null` leaves it where it is. Synchronises the Filament
     * entity hierarchy with the editor manifest `node.parent` field
     * after reparent operations.
     *
     * Filament warning: re-parenting to a descendant = undefined behavior.
     * Caller must ensure no cycles.
     */
    reparentEntity(entity: Entity, newParent: Entity | null): void;
    /**
     * A new entity of the addressed scene with a transform only — `parent`'s child (`null`: a root),
     * at the LOCAL pose `position`, quaternion `rotation` `[x, y, z, w]`, `scale`: a scene node, light
     * or camera built from the core's scene record. It goes with its scene, after what hangs
     * under it. `null` on a Filament build without `TransformManager.create`.
     */
    createNodeEntity(parent: Entity | null, position: readonly [number, number, number], rotation: readonly [number, number, number, number], scale: readonly [number, number, number]): Entity | null;

    attachEntityToParent(entity: Entity, parent: Entity | null, position: readonly [number, number, number], rotation: readonly [number, number, number, number], scale: readonly [number, number, number]): void;

    render(options?: RenderOptions_2): boolean;

    bumpCameraVersion(): void;
    /**
     * Manually bump the scene-version counter. Useful for callers who
     * mutate the scene through Filament APIs not wrapped by this
     * handle (e.g. plugin extensions). Auto-bumped by all built-in
     * mutators ({@link loadAsset}, {@link hideEntity}, {@link showEntity},
     * {@link setEntityTransform}, {@link setSize}).
     */
    bumpSceneVersion(): void;
    /**
     * Inspect the current dirty-version counters. Primarily for
     * tests / diagnostics — production code should rely on the
     * implicit dirty-throttle behaviour of {@link render}.
     */
    getRenderState(): {
        readonly sceneVersion: number;
        readonly cameraVersion: number;
        readonly lastRenderedSceneVersion: number;
        readonly lastRenderedCameraVersion: number;
        readonly pendingResourceLoads: number;
    };

    pauseRender(): void;
    /**
     * Resume the rAF render loop after a {@link pauseRender} call.
     * Idempotent — multiple calls are safe. No-op if the engine is disposed
     * or not currently paused.
     */
    resumeRender(): void;
    /** Whether the render loop is currently paused. */
    isPaused(): boolean;
    /* Excluded from this release type: setRenderLoopCallbacks */

    pickNodeIdAtCoords(x: number, y: number, projection: SceneProjection): Promise<string | null>;

    applyRenderSettings(settings: RenderSettings, options?: {
        readonly keepLive?: boolean;
    }): void;
    /**
     * Remove a decoration `FilamentAsset` from the engine's internal tracking array WITHOUT
     * destroying it — for a caller that already called `loader.destroyAsset(asset)`, so the
     * engine's own `dispose()` does not free the same native handle twice.
     */
    removeAssetRef(asset: FilamentAsset): void;

    setDecorationsVisible(visible: boolean): void;

    setDecorationKindsVisible(kinds: Readonly<Partial<Record<DecorationKind, boolean>>>): void;

    setMaterialsVisible(visible: boolean): void;

    setPolygonsVisible(visible: boolean): void;
    /**
     * The edge lines of mesh node `id` from its triangle mesh (the editor decodes the datablock),
     * parented under the node's entity so they follow it; `null` removes them. The engine finds
     * the unique edges (the core's `triangleEdges`) and counts the triangles and vertices.
     */
    setWireframe(id: string, mesh: {
        readonly positions: Float32Array;
        readonly indices: Uint32Array;
    } | null, parent: unknown): void;
    /** Node ids that currently have mesh edge lines (`setWireframe`). */
    wireframeIds(): string[];

    setHelperLines(id: string, lines: {
        readonly positions: Float32Array;
        readonly edges: Uint32Array;
    } | null, parent: unknown): void;
    /** Ids of the helper line sets the engine draws (`setHelperLines`). */
    helperLineIds(): string[];
    /**
     * Triangles and vertices the overlay counts — the visible meshes, generated meshes and clones —
     * and the part hosted by `selectedHosts` (node entities). Hidden hosts count nothing.
     */
    drawnStats(selectedHosts?: readonly unknown[] | null): DrawnStats;

    removeOverlayEntities(entities: readonly Entity[]): void;

    applyManifestLights(lights: readonly ManifestLightView[]): void;

    applyLightMutations(mutations: readonly FilamentLightMutation[]): void;

    getLightView(lightId: string): ManifestLightView | undefined;

    getLightEntity(lightId: string): Entity | undefined;

    upsertGeneratedMesh(id: string, geometry: GeneratedMeshGeometry, opts?: {
        readonly parent?: Entity | null;
        readonly materialSlug?: string | null;
        /** Palette entry for `materialSlug` when the baked asset has no instance for it. */
        readonly materialParams?: GeneratedMeshMaterialParams | null;

        readonly objectUid?: string | null;

        readonly flow?: {
            readonly pulseParams: GeneratedMeshMaterialParams | null;
        } | null;
        /**
         * gltfio's key of the trunk's primitive: a file mesh of a scene built from the core's scene
         * record — drawn in the record's scene-mesh form of `materialSlug` (`prepareScene` materials).
         */
        readonly materialKey?: MaterialKeyView | null;

        readonly groups?: readonly {
            readonly materialSlug: string | null;
            readonly materialParams: GeneratedMeshMaterialParams | null;
            readonly materialKey?: MaterialKeyView | null | undefined;
        }[] | null;
        /**
         * A file mesh's parts (same order as `geometry.parts`): each wears its own look on its own
         * key; absent = the trunk's.
         */
        readonly parts?: readonly {
            readonly materialSlug: string | null;
            readonly materialParams: GeneratedMeshMaterialParams | null;
            readonly materialKey?: MaterialKeyView | null | undefined;
        }[] | null;
    }): Entity | null;
    /**
     * Upload the pulse table of generator `id` (the core's `PulseTable`; `null` clears it).
     * No-op for a mesh drawn without `flow`. Bumps scene version.
     */
    setGeneratedMeshFlow(id: string, table: FlowPulseTable | null): void;
    /** Remove the procedural mesh of generator `id` (no-op when unknown). */
    removeGeneratedMesh(id: string): void;
    /** Entity of the procedural mesh of generator `id`, or `undefined`. */
    getGeneratedMeshEntity(id: string): Entity | undefined;
    /**
     * Morph weights of the file mesh `id` (a node's mesh of a scene built from the core's scene
     * record): `weights` maps index → value, missing ones 0; kept across rebuilds of its renderable.
     * No-op for a mesh without morph targets.
     */
    setGeneratedMeshMorphWeights(id: string, weights: ReadonlyMap<number, number>): void;
    /**
     * Bend the skinned file mesh `id`'s part `part` (0 for an unsplit skin) by the core's palette
     * (`bones`: `f32 × 16` column-major per bone, `inv(W_mesh) × W_joint × IBM`) and set its box
     * (`null` keeps the last); kept across rebuilds. No-op for an unknown mesh or part.
     */
    setGeneratedMeshBones(id: string, part: number, bones: Float32Array, bounds: {
        readonly min: readonly number[];
        readonly max: readonly number[];
    } | null): void;

    syncModuleInstances(generatorId: string, symbol: string, batch: ModuleInstanceBatch, opts?: {
        readonly parent?: Entity | null;
    }): void;
    /** Drop every module instance of generator `generatorId` (no-op when unknown). */
    removeModuleInstances(generatorId: string): void;

    refreshModuleMesh(uid: string, mesh: ModuleMeshView): void;
    /** Visible module instances of generator `generatorId` (test / debug introspection). */
    getModuleInstanceCount(generatorId: string): number;

    setMaterialGraphSource(source: MaterialGraphSource | null, opts?: {

        readonly keep?: boolean;
    }): void;
    /**
     * Pull the uniforms of node materials `slugs` touched this tick (`/materialOverrides/{slug}/…`)
     * onto their instances. Bumps scene version when one applied.
     */
    refreshMaterialGraphs(slugs: Iterable<string>): void;

    getGeneratedTextureCount(): number;

    inFlight?(): number;
    /**
     * Resolves once nothing of `inFlight` is left (E6-I): a host shows a scene with its pictures, as
     * iOS decodes them before its first frame and gltfio's `loadResources` before a GLB is shown.
     * `true` when there was something to wait for. It waits on decodes, uploads and package loads
     * only — never on a timer or an animation frame, which a hidden page slows.
     */
    picturesLanded?(): Promise<boolean>;

    decodePicture?(bytes: Uint8Array): Promise<DecodedPicture | null>;

    applyManifestEnvironment(env: ResolvedEnvironment | null): void;

    applyBackgroundColor(rgb: BackgroundColor): void;

    applyEnvironmentMutations(mutations: readonly FilamentEnvironmentMutation[]): void;

    applyRenderSettingsMutations(mutations: readonly FilamentRenderSettingsMutation[], options?: {
        readonly complete?: boolean;
    }): void;

    readonly pixelationGrid: {
        readonly block: number;
        readonly shiftX: number;
        readonly shiftY: number;
        readonly columns: number;
        readonly rows: number;
    } | null;
    /** The pixelation pass's render targets and textures now — 0 while it is off (leak checks). */
    pixelationResources(): {
        readonly targets: number;
        readonly textures: number;
    };
    /** Dispose all engine-owned resources and the engine itself. */
    dispose(): void;

    isDisposed(): boolean;
}


declare interface FilamentEnvironmentMutation {
    readonly property: 'rotation' | 'intensity' | 'background_color';
    readonly component?: 0 | 1 | 2;
    readonly value: number | readonly number[];
}


declare interface FilamentLightMutation {
    readonly lightId: string;
    readonly property: 'intensity' | 'color' | 'range' | 'innerConeAngle' | 'outerConeAngle' | 'castShadows';
    readonly component?: 0 | 1 | 2;
    readonly value: number | boolean | readonly number[];
}


/** Filament rendering quality profile. */
declare type FilamentQuality = 'editor' | 'production';

/** One live render-settings write — see `CanonicalRenderSettingsMutation` (`frame/pointer-dispatch`). */
declare interface FilamentRenderSettingsMutation {
    readonly property: 'saturation' | 'fog_color' | 'bloom_strength' | 'pixelation_enabled' | 'pixelation_size';
    readonly component?: 0 | 1 | 2;
    readonly value: number | boolean | readonly number[];
}

declare type FilamentRuntime = typeof FilamentNs;

/** The core's `PulseTable` as a host receives it (`PulseTableView`). */
declare interface FlowPulseTable {
    readonly rows: Float32Array;
    readonly count: number;
    readonly capacity: number;
    readonly length: number;
    readonly tail: number;
    readonly spread: number;
}

declare interface FogOptions {
    enabled?: boolean;
    distance?: number;
    maximumOpacity?: number;
    height?: number;
    heightFalloff?: number;
    density?: number;
    fogColorFromIbl?: boolean;
    color?: [number, number, number];
}

/** A step that was painted. */
export declare interface FrameReport {
    /** The step's number in its session, from 0. */
    readonly index: number;
    /** The scene's time after the step, nanoseconds since its load: the steps and ticks so far. */
    readonly sceneTimeNs: number;
    /**
     * What the frame was painted without: pictures and material packages still on their way after
     * the step (`FrameSession.pending`). Above 0, `await settled()` then `redraw()` gives the frame
     * with them.
     */
    readonly pending: number;
}

export declare interface FrameSession {
    /**
     * Advance the scene by `dtSec` seconds and paint the frame, in this call: the same path as
     * `tick`, the frame never skipped. Throws, nothing moved, a `RangeError` for a `dtSec` that is
     * not a finite number above 0 and at most 0.1 s, and an `Error` once the session is closed or
     * while the WebGL context is lost; an `Error` when the scene advanced and no frame was painted.
     */
    step(dtSec: number): FrameReport;
    /** Paint the current state once more (after `settled()`); the scene's time does not move. */
    redraw(): void;
    /**
     * Resolves once nothing is on its way to the scene: pictures the engine decodes, the standard
     * materials' pictures, `setImage` calls not answered yet, node-material packages. Rejects when
     * the session closes meanwhile. Paints nothing: the next `step` or `redraw` does.
     */
    settled(): Promise<void>;
    /** How much `settled()` would wait for now; 0 once the session is closed. */
    readonly pending: number;
    /**
     * The canvas keeps the painted frame until the next one is painted (its context was made with
     * `preserveDrawingBuffer: true`): it can be read in a later task. `false`: read the frame in the
     * task of its step.
     */
    readonly keepsFrame: boolean;
    /** `false` once ended, or closed by a lost context or the player's `dispose`. */
    readonly isOpen: boolean;
    /** The frame size, the host's render knobs and the loop back as they were before the session. */
    end(): void;
}


export declare interface FrameSessionOptions {
    /** The frame's width in device pixels: the drawing buffer exactly (`setRenderSize`). */
    readonly width: number;
    readonly height: number;
    /** How many device pixels make a point of pixelation; 1 by default. */
    readonly pixelsPerPoint?: number | undefined;
    /**
     * `false` (the default): the session switches dithering, temporal anti-aliasing and dynamic
     * resolution off over the host's render knobs, so the same scene state and time give the same
     * frame. `true` keeps the scene's settings — and then a frame may depend on the frames painted
     * before it.
     */
    readonly temporalEffects?: boolean | undefined;
}

/** Flat geometry streams as emitted by `RuntimeHandle.generatedGeometry` (WASM). */
declare interface GeneratedMeshGeometry {
    readonly topology: 'triangles' | 'lines';
    readonly positions: Float32Array;
    /** Empty for `lines`. */
    readonly normals: Float32Array;
    /** Empty for `lines`. */
    readonly uvs: Float32Array;

    readonly flow?: Float32Array | undefined;

    readonly colors?: Float32Array | undefined;

    readonly tangents?: Float32Array | undefined;
    readonly indices: Uint32Array;
    readonly epoch: number;

    readonly groups?: readonly GeneratedMeshGroup[] | undefined;
    /** `TEXCOORD_1` per vertex (2 each); absent / empty = gltfio's dummy (1, 1) in the gltfio layout. */
    readonly uvs1?: Float32Array | undefined;
    /**
     * A file mesh drawn as gltfio draws its primitives (a scene built from the core's scene record):
     * the attributes each primitive carries in the file — one per group, or one without groups.
     * Present → {@link gltfioLayout}; absent → the procedural layout.
     */
    readonly primitives?: readonly PrimitiveAttributes[] | undefined;
    /** Mesh-space box of the positions (the core's `bounds`); absent / `null` = computed here. */
    readonly bounds?: {
        readonly min: readonly number[];
        readonly max: readonly number[];
    } | null | undefined;
    /**
     * A file mesh's points / lines / strips (the core's `parts`): more primitives of the same
     * renderable, each in its own buffers in gltfio's layout, drawn with its own Filament
     * `PrimitiveType`. Absent / empty = the mesh's groups alone; a mesh of parts alone has no indices.
     */
    readonly parts?: readonly GeneratedMeshPart[] | undefined;
    /**
     * A file mesh's morph targets (glTF §3.7.2.2): one buffer over every primitive's vertices — the
     * mesh's groups at offset 0, then each part — with each target's position deltas and tangent
     * frames. Their count is the mesh's (at most {@link MAX_MORPH_TARGETS}).
     */
    readonly morphTargets?: readonly GeneratedMeshMorphTarget[] | undefined;
    /**
     * A skinned file mesh: `JOINTS_0` (4 per vertex, positions in its skin's joints — in its part's
     * palette once cut) and `WEIGHTS_0` (4 per vertex). Both present → the renderable is skinned and
     * bent by the palettes {@link GeneratedMeshSceneManager.setBones} hands it.
     */
    readonly joints?: Uint16Array | undefined;
    readonly weights?: Float32Array | undefined;
    /** Bones of an unsplit skin: its skin's joint count, the palette's length. */
    readonly skinBones?: number | undefined;
    /**
     * A skin cut over 256 joints (the core's `skinParts`): one renderable per part, drawing its index
     * range of its group with its own palette. Absent / empty = one renderable, `skinBones` bones.
     */
    readonly skinParts?: readonly GeneratedMeshSkinPart[] | undefined;

    readonly stored?: StoredStreamsView | undefined;
}


declare interface GeneratedMeshGroup {
    /** Palette slug of the pen; `null` = the trunk's material. */
    readonly material: string | null;
    readonly indexStart: number;
    readonly indexCount: number;
}


declare interface GeneratedMeshMaterialParams {
    readonly baseColor: readonly [number, number, number, number];
    readonly metallic: number;
    readonly roughness: number;

    readonly emissive: readonly [number, number, number];

    readonly emissiveColor?: readonly [number, number, number] | null | undefined;

    readonly slug?: string | null | undefined;
    readonly emissiveStrength?: number | null | undefined;

    readonly baseColorTexture?: GeneratedMeshTextureRef | null | undefined;

    readonly emissiveTexture?: GeneratedMeshTextureRef | null | undefined;

    readonly alphaMode?: 'opaque' | 'mask' | 'blend' | 'add' | null | undefined;
    readonly alphaCutoff?: number | null | undefined;

    readonly thin?: boolean | undefined;

    readonly diffuseTransmission?: number | null | undefined;
    readonly diffuseTransmissionColor?: readonly [number, number, number] | null | undefined;

    readonly diffuseTransmissionColorTexture?: GeneratedMeshTextureRef | null | undefined;

    readonly rim?: {
        readonly color: readonly [number, number, number];
        readonly power: number;
    } | null | undefined;
}

/** One morph target's deltas over a primitive's vertices (`xyz` each; empty = moves none). */
declare interface GeneratedMeshMorphTarget {
    readonly positions: Float32Array;
    readonly normals: Float32Array;
    readonly tangents: Float32Array;
}

/** A file mesh's point / line / strip primitive (one of the core's `parts`). */
declare interface GeneratedMeshPart {
    readonly topology: PartTopology;
    readonly positions: Float32Array;
    readonly normals: Float32Array;
    readonly uvs: Float32Array;
    readonly uvs1?: Float32Array | undefined;
    readonly colors?: Float32Array | undefined;
    readonly tangents?: Float32Array | undefined;
    readonly indices: Uint32Array;
    /** Which attributes it carries in the file; absent = none beside its positions. */
    readonly attributes?: PrimitiveAttributes | undefined;
    /** Its share of the mesh's morph targets, by target; a missing one moves none of it. */
    readonly morphTargets?: readonly GeneratedMeshMorphTarget[] | undefined;

    readonly stored?: StoredStreamsView | undefined;
    readonly bounds?: {
        readonly min: readonly number[];
        readonly max: readonly number[];
    } | null | undefined;
}

/** One part of a skin cut over 256 joints: its palette's number, its range and bone count. */
declare interface GeneratedMeshSkinPart {
    /** The palette's `part`. */
    readonly part: number;
    /** The group its range lies in (its material). */
    readonly group: number;
    readonly indexStart: number;
    readonly indexCount: number;
    /** Its palette's length. */
    readonly bones: number;
}


declare interface GeneratedMeshTextureRef {
    readonly uri: string;
    readonly bytes: Uint8Array | null;
    readonly mimeType?: string | null | undefined;
    readonly magFilter?: number | null | undefined;
    readonly minFilter?: number | null | undefined;
    readonly wrapS?: number | null | undefined;
    readonly wrapT?: number | null | undefined;
    /** `TEXCOORD_n`; the built-in materials sample uv0 only (others warn once). */
    readonly texCoord?: number | null | undefined;
}


declare interface GltfioLoader {
    createAsset(bytes: Parameters<FilamentNs.gltfio$AssetLoader['createAsset']>[0]): FilamentAsset | null;
    destroyAsset(asset: FilamentAsset): void;
}

/** Writes a palette look keeps for instances filled later, and whom to tell what came of them. */
declare interface HeldPaletteWrites {
    /** The live writes by the parameter each sets (`liveWrites`). */
    readonly writes: ReadonlyMap<string, ParamWrite>;
    /** Writes kept for scene-mesh instances (else built-in ones). */
    readonly sceneMesh?: boolean | undefined;
    /** Nothing draws the slug at the next render (an unassigned material or a stale GLB). */
    readonly miss: () => void;
    /** The instances of `material` that draw the slug at the next render lack `parameters`. */
    readonly lacking: (material: string, parameters: readonly string[]) => void;
}

/**
 * How a `set` ended: the picture is the input's now (`loaded`), the placeholder shows (`failed`), or
 * a later call of the same input overtook it before the core saw it (`superseded`).
 */
declare type HostImageOutcome = 'loaded' | 'failed' | 'superseded';


declare interface HostPicturePixels {
    readonly width: number;
    readonly height: number;
    /** `width × height × 4` bytes; copied by the call, so the host may write on. */
    readonly data: Uint8Array | Uint8ClampedArray;
    /** Absent or `'srgb'`; any other colour space is refused. */
    readonly colorSpace?: string | undefined;
}

/** What a host hands in: the file's bytes, a `Blob` / `File`, or a URL. */
declare type HostPictureSource = Blob | ArrayBuffer | Uint8Array | string;

/** How `setImage` ended: the scene shows the picture, its placeholder stays, or a later call came first. */
export declare type ImageOutcome = HostImageOutcome;

/**
 * A picture as pixels, for `setImagePixels`: `width × height` RGBA8 texels in `data` (a
 * `Uint8Array` or a `Uint8ClampedArray` of `width × height × 4` bytes), straight alpha, sRGB, rows
 * top to bottom, each side 1…2048. An `ImageData` fits as it is.
 */
export declare type ImagePixels = HostPicturePixels;

/** A picture for an image input: a `Blob` / `File`, the file's bytes, or a URL (fetched with CORS). */
export declare type ImageSource = HostPictureSource;

/**
 * One input whose value changed over a tick: its `name`, its `value` after the tick and the one
 * `previous` to it — a number, a bool, a string (an enum's variant, a text) or an array of numbers
 * (a vector, a rotation, a colour), as `getInputs().values` holds them.
 */
export declare type InputChange = Parameters<Parameters<ScenePlayer['onInputChange']>[0]>[0];


declare interface InputChange_2 {
    name: string;
    value: number | boolean | string | number[] | null;
    previous: number | boolean | string | number[] | null;
}

/** One input in `getInputs()`: `name`, `kind` (`'string'` among them), `value`, `default`, limits, `settings`. */
export declare type InputDescription = InputsSnapshot['inputs'][number];


declare interface InputDescription_2 {
    name: string;
    kind: BindingDescriptor["kind"];
    /** The current value; an image input's `{status, revision, width, height}`; none for a trigger. */
    value?: BindingValue_2 | { status: string; revision: number; width: number; height: number };
    default?: unknown;
    options?: string[];
    min?: number;
    max?: number;
    /** Most Unicode code points (line breaks unified); 1024 when absent. */
    maxLength?: number;
    multiline?: boolean;
    computed?: string;
    doc?: string;
    settings?: InputSettings;

    missingGlyphs?: number;
}

/**
 * From the source's `from: [a, b]` onto the input's `to: [c, d]`, clamped; a missing end is the
 * source's own: speed `[0, 2]` screens per second, position `[0, 1]`, onto `[0, 1]`.
 */
export declare type InputMapping = NonNullable<Parameters<ScenePlayer['bindInput']>[2]>;

/**
 * From the source's `[a, b]` to the input's `[c, d]`, clamped: `c + (d − c) × clamp((x − a) /
 * (b − a), 0, 1)`. Defaults: `from` `[0, 2]` for the speed (screens / s), `[0, 1]` for the
 * position; `to` `[0, 1]`.
 */
declare interface InputMapping_2 {
    from?: [number, number];
    to?: [number, number];
}

/** One refused input of an `InputsReport`: its `name`, the `code` (`range`, `length`, …) and a `message`. */
export declare type InputRefusal = InputsReport['rejected'][number];


declare interface InputSettings {
    label?: string;
    description?: string;
    group?: string;
    /** An enum's variant → its label. */
    optionLabels?: Record<string, string>;
    /** A slider's step — a hint, not a constraint. */
    step?: number;
}

/** What the page measures and binds to an input: its scroll speed or the scene's pass through it. */
export declare type InputSource = Parameters<ScenePlayer['bindInput']>[1];


declare type InputSource_2 = "scroll-speed" | "scroll-position";

/** What `setInputs` did: `applied`, `rejected` (by code), `unknown`, `untouched`. */
export declare type InputsReport = ReturnType<ScenePlayer['setInputs']>;


declare interface InputsReport_2 {
    applied: string[];
    rejected: {
        name: string;
        code:
        | "unknown" | "kind" | "variant" | "range" | "length" | "newline"
        | "computed" | "bound" | "image" | "trigger";
        message: string;
    }[];
    unknown: string[];
    untouched: string[];
}


export declare type InputsSnapshot = ReturnType<ScenePlayer['getInputs']>;


declare interface InputsSnapshot_2 {
    inputs: InputDescription_2[];
    values: Record<string, BindingValue_2>;
}

export declare type LayerState = ReturnType<ScenePlayer['layerStates']>[number];


declare interface ManifestLightView {
    readonly id: string;
    readonly lightType: 'directional' | 'point' | 'spot';
    /** RGB linear [0..1]. */
    readonly color: readonly [number, number, number];
    /** Lux (directional) or candela (point/spot). */
    readonly intensity: number;

    readonly range: number;
    /** Spot inner cone half-angle (radians). */
    readonly innerConeAngle: number;
    /** Spot outer cone half-angle (radians). */
    readonly outerConeAngle: number;
    /** Whether the light casts shadows. */
    readonly castShadows: boolean;

    readonly position?: readonly [number, number, number] | null | undefined;

    readonly rotation?: readonly [number, number, number] | null | undefined;
    /**
     * Pre-resolved world direction (directional/spot). Legacy/node-Euler fallback
     * used only when `rotation` is absent; defaults applied if both absent.
     */
    readonly direction?: readonly [number, number, number] | null | undefined;

    readonly parentEntity?: Entity_3 | null | undefined;

    readonly carrierAnchored?: boolean | undefined;
}


declare type MaterialGraphFamily = "mesh" | "generated" | "instanced";


declare type MaterialGraphFamily_2 = 'mesh' | 'generated' | 'instanced';

/** One texture array: its sampler uniform, colour space, size and `manifest.textures[]` layers. */
declare interface MaterialGraphGroup {
    readonly sampler: string;
    readonly srgb: boolean;
    readonly width: number;
    readonly height: number;
    readonly textures: readonly number[];

    readonly hostImage?: string | undefined;
    /** The app's picture the slot shows now: `(hostImage, revision)` at its own size. */
    readonly picture?: MaterialGraphPicture | undefined;
}

/** The app's picture a photo slot shows (`HostPicture` of the runtime). */
declare interface MaterialGraphPicture {
    readonly revision: number;
    readonly width: number;
    readonly height: number;
}

/** A host picture's pixels (`HostPicture` of `../images/host-picture-store.ts`). */
declare interface MaterialGraphPixels {
    readonly width: number;
    readonly height: number;
    readonly rgba: Uint8Array;
}

/** What the host gives the manager for one scene. */
declare interface MaterialGraphSource {
    /** The core's generated material of `slug` on `family`; `undefined` = the built-in path. */
    graph(slug: string, family: MaterialGraphFamily_2): MaterialGraphView | undefined;

    missed(slug: string, family: MaterialGraphFamily_2): boolean;
    /** Its uniforms at the scene's current values (`objectSeed` excluded, `maskThreshold` included). */
    values(slug: string, family: MaterialGraphFamily_2): Readonly<Record<string, readonly number[]>> | undefined;
    /** The package (the `.trd` asset or the editor's compile); `null` = none, the built-in path. */
    packageBytes(view: MaterialGraphView): Uint8Array | null | Promise<Uint8Array | null>;
    /** A package's Filament version and backends, read without loading it (`materialPackageInfo`). */
    packageInfo(bytes: Uint8Array): {
        readonly version: number;
        readonly backends: readonly string[];
    } | undefined;
    /** `manifest.textures[index]`: its picture bytes and glTF sampler. */
    texture(index: number): GeneratedMeshTextureRef | null;
    /** The `objectSeed` of the object `uid` (`materialObjectSeed`). */
    objectSeed(uid: string): number;

    hostPicture?(name: string, revision: number): MaterialGraphPixels | undefined;

    refused?(slug: string, family: MaterialGraphFamily_2, view: MaterialGraphView, reason: string): void;
}

/** The generated material a palette slug draws with on one family (`RuntimeHandle.materialGraph`). */
declare interface MaterialGraphView {
    readonly packageUri: string;
    readonly hash: string;
    readonly name: string;

    readonly blending: 'opaque' | 'masked' | 'transparent' | 'add';
    /** Renderables drawn with it cast shadows; `false` for `add`. Absent = they do. */
    readonly castShadows?: boolean | undefined;
    readonly requires: readonly string[];

    readonly instanceColors?: boolean | undefined;
    readonly groups: readonly MaterialGraphGroup[];
    readonly params: readonly {
        readonly name: string;
        readonly kind: 'float' | 'float3' | 'float4';
    }[];
}

/** Filament's `gltfio::MaterialKey`, field for field (`tride_core::material_graph::MaterialKey`). */
declare interface MaterialKeyView {
    readonly doubleSided: boolean;
    readonly unlit: boolean;
    readonly hasVertexColors: boolean;
    readonly hasBaseColorTexture: boolean;
    readonly hasNormalTexture: boolean;
    readonly hasOcclusionTexture: boolean;
    readonly hasEmissiveTexture: boolean;
    readonly useSpecularGlossiness: boolean;
    readonly alphaMode: 'opaque' | 'mask' | 'blend';
    readonly enableDiagnostics: boolean;
    readonly hasMetallicRoughnessTexture: boolean;
    readonly metallicRoughnessUv: number;
    readonly baseColorUv: number;
    readonly hasClearCoatTexture: boolean;
    readonly clearCoatUv: number;
    readonly hasClearCoatRoughnessTexture: boolean;
    readonly clearCoatRoughnessUv: number;
    readonly hasClearCoatNormalTexture: boolean;
    readonly clearCoatNormalUv: number;
    readonly hasClearCoat: boolean;
    readonly hasTransmission: boolean;
    readonly hasTextureTransforms: boolean;
    readonly emissiveUv: number;
    readonly aoUv: number;
    readonly normalUv: number;
    readonly hasTransmissionTexture: boolean;
    readonly transmissionUv: number;
    readonly hasSheenColorTexture: boolean;
    readonly sheenColorUv: number;
    readonly hasSheenRoughnessTexture: boolean;
    readonly sheenRoughnessUv: number;
    readonly hasVolumeThicknessTexture: boolean;
    readonly volumeThicknessUv: number;
    readonly hasSheen: boolean;
    readonly hasIor: boolean;
    readonly hasVolume: boolean;
    readonly hasDispersion: boolean;
    readonly hasSpecular: boolean;
    readonly hasSpecularTexture: boolean;
    readonly hasSpecularColorTexture: boolean;
    readonly specularTextureUv: number;
    readonly specularColorTextureUv: number;
}


declare type MaterialPackageProblemCode = 'material.package-missing' | 'material.package-stale' | 'material.package-version' | 'material.package-refused' | 'material.package-renderer-refused';

/**
 * Live wrapper around a per-canvas Filament engine. All resources are
 * tracked so {@link FilamentEngineHandle.dispose} releases them in a
 * safe order.
 */

declare interface MaterialPaletteEntry {
    readonly baseColor?: readonly number[] | null | undefined;
    readonly emissive?: readonly number[] | null | undefined;
    readonly emissiveStrength?: number | null | undefined;
    readonly attenuationColor?: readonly number[] | null | undefined;
    readonly attenuationDistance?: number | null | undefined;
}

/** What {@link FilamentEngineHandle.rekeyMaterial} did: the instances made again, or why none. */
declare type MaterialRekey = {
    readonly changed: number;
} | {
    readonly problem: string;
};


/**
 * What a path B material draws without, and why: values its key asks for that the scene record
 * does not carry (`missing`), a picture of its maps (`slots`) the scene does not hold (`absent`)
 * or that could not be decoded, or a changed key Filament made no instance for (`kept`: the
 * instances still drawn with the old key).
 */
declare type MaterialShortfall = {
    readonly kind: 'uncarried';
    readonly missing: readonly string[];
} | {
    readonly kind: 'picture';
    readonly uri: string;
    readonly slots: readonly string[];
    readonly absent: boolean;
} | {
    readonly kind: 'key';
    readonly kept: number;
};

declare interface ModuleInstanceBatch {
    readonly datablockUid: string;
    /**
     * Decoded mesh; required the first time `datablockUid` is seen. Afterwards `null` keeps the
     * cached GPU mesh, a mesh with another `contentHash` replaces it (every batch on that
     * datablock is rebuilt on the new buffers — an edited datablock lands without a reload).
     */
    readonly mesh: ModuleMeshView | null;
    /** Flat column-major `mat4[]`, local to the host (`MODULE_TRANSFORM_STRIDE` each). Empty = hide. */
    readonly transforms: Float32Array;

    readonly colors?: Uint16Array | null | undefined;
    /** Palette slug of the datablock's material + its entry (built-in material params). */
    readonly materialSlug?: string | null | undefined;
    readonly materialParams?: GeneratedMeshMaterialParams | null | undefined;
}

/** One datablock decoded by the core (`datablockMesh` / `datablock_mesh`). */
declare interface ModuleMeshView {
    readonly positions: Float32Array;
    readonly normals: Float32Array;
    readonly uvs: Float32Array;

    readonly colors?: Float32Array | undefined;

    readonly tangents?: Float32Array | undefined;
    readonly indices: Uint32Array;
    readonly material: string | null;

    readonly contentHash: string;
}

declare interface MsaaOptions {
    enabled?: boolean;
    sampleCount?: number;
}


declare interface PaletteInstances {
    readonly instances: readonly FilamentNs.MaterialInstance[];
    /**
     * Those of `instances` a scene mesh wears as its glTF material (path B's standard instances):
     * the core's alone — they take its `gltf/{name}` parameters, not the look's fields (L3).
     */
    readonly sceneMesh?: ReadonlySet<FilamentNs.MaterialInstance> | undefined;
    readonly emissiveStrength: number;
    /** The palette entry the instances were filled from — what a lone live write folds with. */
    readonly authored?: MaterialPaletteEntry | undefined;
    /**
     * Keep a live write, by the parameter it sets, for instances filled later: the look's built-in
     * ones, or with `sceneMesh` the scene-mesh ones. Each family keeps what it took — a parameter,
     * the cut-off, the double side — and an instance made later takes it all (`applyLive`).
     */
    remember(parameter: string, write: ParamWrite, sceneMesh?: boolean): void;
}

/**
 * One Filament parameter write a material write turns into (`filament-material-apply.ts`); kept
 * live by the parameter it sets (`_maskThreshold` / `_doubleSided` for the instance state).
 */
declare type ParamWrite = {
    readonly kind: 'float';
    readonly name: string;
    readonly value: number;
} | {
    readonly kind: 'float3';
    readonly name: string;
    readonly value: [number, number, number];
} | {
    readonly kind: 'float4';
    readonly name: string;
    readonly value: [number, number, number, number];
} | {
    readonly kind: 'mat3';
    readonly name: string;
    readonly value: number[];
} | {
    readonly kind: 'doubleSided';
    readonly value: boolean;
} | {
    readonly kind: 'maskThreshold';
    readonly value: number;
};

/** How a file primitive's indices assemble (the core's `MeshTopology`). */
declare type PartTopology = 'triangles' | 'lines' | 'points' | 'line_strip' | 'triangle_strip';


declare interface PixelationOptions {
    enabled?: boolean;
    size?: number;
}

export declare type PointerHit = ReturnType<ScenePlayer['pick']>[number];

/** One node under a view point, nearest first; `instance` for a generator's module / clone. */
declare interface PointerHit_2 {
    node: string;
    instance?: { key: string; index: number };
    distance: number;
}

export declare type PointerPhase = Parameters<ScenePlayer['pointer']>[0];


declare type PointerPhase_2 = "down" | "move" | "up" | "cancel";

declare interface PreparedScene {
    readonly id: number;
}

/** Which attributes a glTF primitive carries in its file (the core's `VertexAttributesView`). */
declare interface PrimitiveAttributes {
    readonly normals: boolean;
    readonly uv0: boolean;
    readonly tangents: boolean;
    readonly colors: boolean;
}

declare type QualityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA';

declare type QualityPreset = 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA' | 'CUSTOM';

declare type Renderer = FilamentNs.Renderer;

/** How `renderNow` paints: `neverSkip` draws the frame the renderer asks to skip. */
export declare type RenderOptions = NonNullable<Parameters<ScenePlayer['renderNow']>[0]>;

/** How one {@link FilamentEngineHandle.render} call paints. */
declare interface RenderOptions_2 {

    readonly neverSkip?: boolean | undefined;
}

/**
 * The page's render knobs: `msaa` (on or off), `msaaSamples` (2, 4 or 8), and `bloom`, `shadows`,
 * `depthOfField` (`false` switches it off, `true` keeps the scene's); unset or `null` = the scene's.
 */
export declare type RenderOverrides = NonNullable<Parameters<ScenePlayer['setRenderOverrides']>[0]>;


declare interface RenderOverrides_2 {
    msaa?: boolean | null;
    /** 2, 4 or 8. */
    msaaSamples?: number | null;
    /** `false` switches bloom off; `true` keeps the scene's. */
    bloom?: boolean | null;
    /** `false` switches shadows off; `true` keeps the scene's. */
    shadows?: boolean | null;
    /** `false` switches depth of field off; `true` keeps the scene's. */
    depthOfField?: boolean | null;

    temporalEffects?: boolean | null;
}

declare interface RenderSettings {
    qualityPreset?: QualityPreset;
    antiAliasing?: AntiAliasingMethod;
    msaa?: MsaaOptions;
    taa?: TaaOptions;
    dithering?: DitherMethod;
    postProcessing?: boolean;
    shadowingEnabled?: boolean;
    shadowType?: ShadowType;
    vsmShadowOptions?: VsmShadowOptions;
    softShadowOptions?: SoftShadowOptions;
    ssao?: SsaoOptions;
    bloom?: BloomOptions;
    fog?: FogOptions;
    vignette?: VignetteOptions;
    toneMapping?: ToneMappingOptions;
    dynamicResolution?: DynamicResolutionOptions;
    depthOfField?: DepthOfFieldOptions;
    screenSpaceReflections?: ScreenSpaceReflectionsOptions;
    pixelation?: PixelationOptions;
}

/** A frame size the page said: `width` × `height` in device pixels, and the pixels a point. */
export declare type RenderSize = NonNullable<ScenePlayer['renderSize']>;


declare interface RenderSize_2 {
    readonly width: number;
    readonly height: number;
    readonly pixelsPerPoint: number;
}

declare type RenderSizeArgs = [width: number, height: number, pixelsPerPoint?: number | undefined] | [size: null];

/**
 * Environment fully resolved to renderer inputs by the caller (preset registry
 * lookup or custom-blob retrieval happens upstream — this manager is asset-source
 * agnostic, R-OneLookupPath).
 */
declare interface ResolvedEnvironment {
    /** KTX1 specular-prefiltered cubemap bytes (`<name>_ibl.ktx`). Carries SH in metadata. */
    readonly iblKtx: Uint8Array;
    /** KTX1 skybox cubemap bytes (`<name>_skybox.ktx`); `null` → IBL-only (background hidden). */
    readonly skyboxKtx: Uint8Array | null;
    /** IBL intensity in lux (`IndirectLight.setIntensity`). */
    readonly intensity: number;

    readonly rotation: readonly [number, number, number];
}

declare interface RouteProblem {
    readonly pointer: string;
    readonly code: 'expression-eval-failed' | 'unsupported-target' | 'node-not-found' | 'value-shape-mismatch';
    readonly message: string;
}


export declare type RuntimeBuild = 'full' | 'lite';


export declare interface RuntimeBuildInfo {
    /** The release every Tride stream carries (`tools/release/version.json`). */
    readonly version: string;
    /** The commit the runtime WASM was built from; empty outside the artifact builds. */
    readonly commit: string;
    /** The `.trd` format the runtime reads. */
    readonly formatVersion: string;
}

/** A runtime `.wasm`: its URL, a fetch of it, or its bytes. */
declare type RuntimeWasmSource = string | URL | Request | Response | ArrayBuffer | ArrayBufferView<ArrayBuffer>;

declare type Scene = FilamentNs.Scene;

/** A sound a host plays and the scene hears. */
declare interface SceneAudioSource {
    readonly kind: AudioInputKind;
    readonly sampleRate: number;
    readonly channels: number;
    /** Start feeding `sink`: a track feeds its PCM now, a stream as it plays. */
    connect(sink: AudioPcmSink): void;
    /** Stop feeding `sink`. */
    disconnect(sink: AudioPcmSink): void;
    /** What sounds now: the audible time in the source's audio time, and the gain (0 = silent). */
    now(): {
        readonly time: number;
        readonly gain: number;
    };
    /** Release what the source holds (it stops sounding). */
    dispose(): void;
}

export declare interface SceneDownload {
    readonly url: string;
    readonly bytes: Promise<Uint8Array>;
    readonly build: Promise<RuntimeBuild>;
    abort(): void;
}

export declare type SceneEvent = Parameters<Parameters<ScenePlayer['onEvent']>[0]>[0];

/**
 * `SceneEvent` on the wire — payload keys sorted (byte-stable across runtimes).
 */
declare interface SceneEvent_2 {
    /**
     * The event's public name (`events[].name`).
     */
    name: string;
    /**
     * The reporting action's constant payload (B1 scalar kinds).
     */
    payload: Record<string, number | boolean | string>;
}

/**
 * A scene's materials from the core's scene record (path B): the record's `materials`, a picture's
 * bytes by archive path, and who hears of a material drawn short of what it asks for.
 */
declare interface SceneMaterialSource {
    readonly materials: readonly SceneRecordMaterial[];
    readonly image: (uri: string) => Uint8Array | null;
    readonly partial: (slug: string, shortfall: MaterialShortfall) => void;
}

declare class ScenePlayer {
    /** Replaced by `restoreRenderer` once the canvas' WebGL context is back. */
    private engine;
    private readonly filament;
    private readonly canvas;
    private readonly options;
    private runtime;
    /** The last bone palette of each skinned mesh part of the loaded scene, by `mesh:part`. */
    private readonly palettes;
    private scene;
    /** The loaded scene's CPU copies, for `restoreRenderer`. */
    private source;
    /** The canvas' WebGL context is gone: the engine is disposed, the runtime and `source` kept. */
    private rendererLost;
    private elapsedNs;
    private rafId;
    private lastFrameMs;

    private readonly pacer;
    /** A refused render rate was reported: once per player, across loads. */
    private rateRefusalReported;
    /** The host's render knobs, laid by the core over every scene's render settings; `{}` = none. */
    private knobs;
    private viewport;

    private scrollFrame;
    /** The host's explicit frame (`setRenderSize`); `null` = the canvas' CSS box × the density. */
    private frameSize;
    /** The frame the engine was last told; `null` before the first and for a new engine. */
    private sized;
    /** The open frame session (`beginFrames`); `null` = none. */
    private openFrames;
    private readonly eventHandlers;
    private readonly stateHandlers;
    private readonly inputHandlers;
    private readonly warned;
    /** `code:pointer` of the problems already reported to `onProblem` since the last load. */
    private readonly reported;
    private disposed;

    private readonly audio;

    private readonly images;
    private constructor();
    static create(options: ScenePlayerOptions): Promise<ScenePlayer>;
    private static start;
    /**
     * The archive's bytes → the scene on the canvas, its first frame applied and its first pictures
     * on. A load the page's policy ended names what it refused (`PolicyRefusalError`).
     */
    load(archive: Uint8Array): Promise<void>;
    private loadArchive;
    /**
     * The pictures the first tick asked for (a generator's leaf maps, node-material layers) on their
     * slots, then the frame drawn again: the scene a host is told is loaded wears them, as on iOS,
     * whose bridge decodes them before its first frame. A standing scene draws no frame by itself;
     * a scene with no picture on the way is drawn no extra frame.
     */
    private showWithPictures;
    /**
     * The runtime of `archive` on `core`; a lite core that leaves out a module the scene needs
     * (text) gives way to the full build — a scene is never drawn without it (a second instance on a
     * page whose module runs the lite one).
     */
    private openRuntime;

    private stageRecord;
    /**
     * The record's materials for the engine, pictures from the runtime; a material drawn short of
     * what it asks for is said once per shortfall as problem `partialDraw`.
     */
    private sceneMaterials;
    /** The environment `view` asks for; `prepared` is dropped when resolving it fails. */
    private stageEnvironment;
    /**
     * The canvas' WebGL context is gone (`webglcontextlost`; the host calls `preventDefault()` so the
     * browser may give it back): the loop stops and the engine goes with every GPU object. The
     * runtime — the scene's state machine, inputs, time and the host's bindings — and the CPU copies
     * the scene was built from stay for `restoreRenderer`. Until then `tick`, `advance` and
     * `renderNow` do nothing (the scene stands still) and `load` throws; inputs, triggers, pictures
     * and sound reach the runtime as before. An open frame session is closed (its frames so far
     * stand; the frame size is the one before it): after `restoreRenderer` the host begins another.
     */
    loseRenderer(): void;

    nodeWorlds(): Record<string, number[]>;
    /**
     * The core's world matrix of every node of the loaded scene — its node table after the last tick
     * (`RuntimeHandle.nodeWorlds`, column-major, 16 numbers) — by node uid; no lights or cameras (the
     * table has no rows for them). For checks (the parity gate compares `nodeWorlds` with these); `{}`
     * without a scene.
     */
    coreNodeWorlds(): Record<string, number[]>;
    /**
     * The check mode of the skins (the parity gate): the core's last palette of every skinned mesh
     * part against the bones gltfio's animator would set from the worlds this renderer composed
     * (`checkBonePalettes`); `null` without a scene or a palette.
     */
    bonePaletteCheck(): BonePaletteCheck | null;
    /** `loseRenderer` ran and `restoreRenderer` has not finished yet. */
    get isRendererLost(): boolean;

    get keepsStateOnRestore(): boolean;
    /**
     * The canvas' WebGL context is back (`webglcontextrestored`): a new engine on the same canvas,
     * the scene built on it again from the CPU copies, and — the runtime handing out its whole state
     * — its first frame shows the scene where it stood; the loop is the host's to resume (`play`).
     * Resolves `true` once drawn, `false` when the context was lost again meanwhile. Throws when the
     * player is disposed, and what building the engine throws.
     */
    restoreRenderer(): Promise<boolean>;
    /**
     * One entity per row of the core's scene record under its parent row, at its rest pose — the
     * projection; a row's place is its number.
     */
    private placeRecord;
    /**
     * The engine half of a scene: the prepared scene addressed and filled from the record, the
     * runtime's node materials, parametric nodes and module instances wired, then committed. `load`
     * runs it for a new runtime, `restoreRenderer` for the kept one on a new engine.
     */
    private mountScene;
    /**
     * Advance the scene by `dtSec` (clamped to 100 ms), apply the frame and draw it. `true` when a
     * frame was painted; `false` when there is no scene to draw (none loaded, the context lost, the
     * player disposed), the runtime threw (a problem says so), nothing changed since the last
     * painted frame, or Filament asked to skip the frame — the state has advanced all the same, and
     * `renderNow({ neverSkip: true })` paints it.
     */
    tick(dtSec: number): boolean;

    advance(scriptJson: string): {
        readonly stopped: {
            step: number;
            reason: string;
        } | null;
    } | null;
    /** Start the loop. Throws while a frame session is open: its host steps the scene itself. */
    play(): void;
    pause(): void;
    get isPlaying(): boolean;

    setPreferredFps(fps: number | null): void;

    get preferredFps(): number | null;
    /**
     * The host's render knobs over the scene's render settings: `msaa` (on or off), `msaaSamples`
     * (2, 4 or 8), and `bloom` / `shadows` / `depthOfField` — `false` switches it off, `true` keeps the
     * scene's. An unset or `null` knob keeps the scene's value; `null` clears them all. The core lays
     * them (the same rule as iOS and Android). Takes effect on the scene drawn now, without reloading
     * it, and on every scene loaded after; the animated bloom strength, saturation, fog colour and
     * pixelation carry on. A knob of the wrong type draws the scene's settings and is one `host`
     * problem.
     */
    setRenderOverrides(knobs: RenderOverrides_2 | null): void;
    /** The knobs set (`setRenderOverrides`), `null` when none is. */
    get renderOverrides(): RenderOverrides_2 | null;
    /** Back to the scene's render settings: every knob cleared. */
    clearRenderOverrides(): void;
    /**
     * The loaded scene's own render settings, as the designer set them (every default resolved by the
     * core), whatever the knobs; `null` before load and for a scene that sets none (the renderer's
     * defaults are drawn).
     */
    get sceneRenderSettings(): RenderSettings | null;
    /** The knobs the core lays: the host's, and over them a frame session's `temporalEffects: false`. */
    private drawnKnobs;
    /** What the scene is drawn with: the core's laying of the knobs over the scene's settings. */
    private drawnRenderSettings;
    /**
     * Draw the current state again (a resize, a probe) without advancing the clock; `true` when a
     * frame was painted. Filament asks to skip a frame while the GPU has not finished the frame two
     * frames back — in one task, every frame after the second (`RenderOptions`): `false` then,
     * unless `neverSkip` is set, which paints it.
     */
    renderNow(options?: RenderOptions_2): boolean;
    setBinding(name: string, value: BindingValue_2): void;
    trigger(name: string): void;

    getInputs(): InputsSnapshot_2;

    setInputs(values: Record<string, BindingValue_2>, options?: {
        strict?: boolean;
    }): InputsReport_2;

    availableBindings(): BindingDescriptor[];

    setViewport(width: number, height: number): void;

    resize(dpr?: number): void;

    setRenderSize(...args: RenderSizeArgs): void;
    /** The frame size the host set (`setRenderSize`); `null` while the buffer follows the layout. */
    get renderSize(): RenderSize_2 | null;

    beginFrames(options: FrameSessionOptions): FrameSession;
    /** The open frame session; `null` when none is. */
    get frames(): FrameSession | null;
    pointer(phase: PointerPhase_2, x: number, y: number): void;
    pick(x: number, y: number): PointerHit_2[];

    scroll(offset: number, extent: number, sceneTop: number, sceneHeight: number): void;

    dragAxes(): DragAxes_2;

    bindInput(name: string, source: InputSource_2, mapping?: InputMapping_2): void;
    /** The host writes input `name` again; it keeps its value. `true` when it was bound. */
    unbindInput(name: string): boolean;
    /** The host's bindings in the loaded runtime, in the order they were made (none before load). */
    boundInputs(): BoundInput_2[];
    /** A source measured from the page's scroll is bound — the host reports `scroll` only then. */
    readsScroll(): boolean;
    currentState(): string;
    layerStates(): {
        readonly id: string;
        readonly state: string;
    }[];
    onEvent(handler: (event: SceneEvent_2) => void): Unsubscribe_2;
    onStateChange(handler: (change: StateChange_2) => void): Unsubscribe_2;

    onInputChange(handler: (change: InputChange_2) => void): Unsubscribe_2;
    /**
     * Play a track through WebAudio and let the scene hear it as `options.input` (default `music`):
     * a URL, the file's bytes or a decoded `AudioBuffer`, decoded by the browser. Resolves once
     * decoded; call the track's `play()` from a user gesture. `detachAudio` or `dispose` stops it.
     */
    attachAudioTrack(data: AudioTrackData, options?: AudioTrackOptions & AudioInputOptions): Promise<AudioTrack>;
    /**
     * Let the scene hear what an `<audio>` / `<video>` element plays — a file or an endless stream —
     * as `options.input` (default `music`). The element plays through WebAudio from now on; a
     * cross-origin source needs CORS (else the scene hears nothing, and says so once). Start it from a
     * user gesture (the tap's `play()` resumes the audio context too).
     */
    attachAudioMedia(media: HTMLMediaElement, options?: AudioMediaTapOptions & AudioInputOptions): Promise<AudioMediaTap>;
    /**
     * The scene hears a host's own `source` as `options.input` (default `music`); the host keeps
     * owning it. Throws when the runtime refuses the input (a name that is no slug).
     */
    attachAudio(source: SceneAudioSource, options?: AudioInputOptions): void;
    /** The scene stops hearing `input`; a track or element tap the player made stops too. */
    detachAudio(input?: string): void;
    /** The inputs the scene hears now. */
    audioInputs(): string[];

    setImage(name: string, source: HostPictureSource): Promise<HostImageOutcome>;

    setImagePixels(name: string, pixels: HostPicturePixels): void;
    /**
     * A picture for image input `name` is on its way before the app has its bytes (its own picker,
     * a download): the scene sees `'loading'` (a spinner), the picture shown stays. A `setImage`
     * still decoding for `name` ends `'superseded'`. Throws `{ kind: 'image.input' }` for a name
     * that is no image input.
     */
    imageLoading(name: string): void;
    /**
     * Image input `name` back to no picture: the placeholder shows from the next tick. Throws
     * `{ kind: 'image.input' }` for a name that is no image input.
     */
    clearImage(name: string): void;
    /** The engine, for a host that draws its own decorations. */
    get rawEngine(): FilamentEngineHandle;
    dispose(): void;
    /** Whether palette material `slug` draws through a node graph on any family (cached per scene). */
    private drawsGraph;
    /** A source the player made: attached, or disposed when the player went or the input is refused. */
    private adopt;
    private applyFrame;

    private applyPalettes;

    private assertRepeatableSettings;

    private onTheWay;
    /** Resolves once nothing is on its way, or `frames` is no longer the open session. */
    private landed;
    /** A session's `end()`: the frame size, the host's knobs and the loop as they were. */
    private endFrames;

    private sizeFrame;
    private render;
    /** Width / height of the drawing buffer — the aspect the camera is applied with. */
    private canvasAspect;
    /** The default camera's pose at `aspect`; the runtime is asked again only when it changed. */
    private defaultPose;

    private switchCamera;
    private applyCamera;
    /** The runtime picks in the canvas' CSS space; a host camera only while no scene camera is active. */
    private pushScroll;
    private pushViewport;
    private deliver;
    /**
     * `value` to every handler of one kind. A handler that throws does not stop the others or the
     * tick that called them (a throw out of the loop's frame would end the loop): it is a `host`
     * problem, once per kind of handler.
     */
    private tell;
    /**
     * The core compares the inputs while `on` (`inputChanges` in its tick answers); the values as
     * they stand are the base. A runtime file older than the call cannot observe: one problem.
     */
    private observeInputs;

    private textProblem;
    private problem;

    private imageProblem;
    private warnOnce;
    private assertLive;
    /** What a frame session rules out while it is open: the loop, another scene, sound. */
    private refuseInFrames;
}

declare interface ScenePlayerOptions {
    readonly canvas: HTMLCanvasElement;
    /** `/filament/filament.js` by default (its `.wasm` next to it). */
    readonly filamentScriptUrl?: string | undefined;
    /** Where the runtime `.wasm` (the full build) is served; default = next to the wasm-bindgen glue. */
    readonly runtimeWasm?: RuntimeWasmSource | undefined;

    readonly runtimeLiteWasm?: RuntimeWasmSource | undefined;
    /**
     * The build `create` boots beside Filament — `'full'` by default; the web bridge passes the
     * one the archive's table of contents asks for as soon as it is read.
     */
    readonly runtimeBuild?: RuntimeBuild | PromiseLike<RuntimeBuild> | undefined;

    readonly quality?: FilamentQuality | undefined;

    readonly contextAttributes?: ContextAttributes_2 | undefined;
    /** The SDK IBL presets, when the host serves them. */
    readonly presetEnvironment?: EnvironmentSources['preset'] | undefined;
    /** Every problem the frame or the runtime reports; default: `console.warn`, once per pointer. */
    readonly onProblem?: ((problem: ScenePlayerProblem) => void) | undefined;
}

declare interface ScenePlayerProblem {
    /** What the problem is about: a pointer, `<tick>`, `audio.<input>` / `image.<input>` / `text.<input>`. */
    readonly pointer: string;
    /** `host`: something the page itself did — an attribute, a call the element could not take. */
    readonly code: RouteProblem['code'] | 'diagnostic' | 'runtime' | 'audio' | 'image' | 'host' | 'text.missing-glyphs' | 'camera.unknown' | MaterialPackageProblemCode;
    readonly message: string;
}

export declare type SceneProblem = ScenePlayerProblem;

/**
 * Canonical manifest-nodeId → Filament-entity projection.
 * Single source of truth for all entity lookups (L-ARCH-OneLookupPath).
 */
declare class SceneProjection {
    private readonly entries;
    private readonly reverse;
    /** Get primary entity for a manifest node. */
    get(nodeId: string): Entity_2 | null;
    /** Get all entities for a manifest node (multi-primitive hide/show). */
    getAll(nodeId: string): readonly Entity_2[] | null;
    /** Whether a manifest node has a mapped entity. */
    has(nodeId: string): boolean;
    /** Reverse lookup: Filament entity → manifest nodeId (for GPU picking). */
    resolveEntity(entity: Entity_2): string | null;
    /** Register entity for a manifest node. Called by buildProjection + reconciler. */
    set(nodeId: string, primary: Entity_2, all?: readonly Entity_2[]): void;
    /**
     * Add pick/hide entities to an existing entry's `all` (idempotent by entity id;
     * the primary is untouched). Returns `true` when membership grew. No entry →
     * `false` (a glyph manager must never mint a primary).
     */
    augment(id: string, entities: readonly Entity_2[]): boolean;
    /**
     * Remove pick/hide entities from an entry's `all` (the primary is never
     * removed). Returns `true` when membership shrank; no entry → `false`.
     */
    detach(id: string, entities: readonly Entity_2[]): boolean;
    /** Remove entry for a deleted/hidden node. */
    delete(nodeId: string): void;
    /** Number of mapped nodes. */
    get size(): number;
    /** Clear all entries (used on scene reload). */
    clear(): void;
}


declare type SceneRecordDrawForm = "standard" | "built_in" | "graph";

declare interface SceneRecordMaterial {
    slug: string;
    mesh: SceneRecordDrawForm;
    generated: SceneRecordDrawForm;
    instanced: SceneRecordDrawForm;

    standard: {
        params: { name: string; value: number[] }[];
        maps: { slot: string; texture: SceneRecordTexture; srgb: boolean }[];
        doubleSided: boolean;
        alphaMode: "opaque" | "mask" | "blend";
        alphaCutoff: number | null;
    } | null;
    /** When `generated` or `instanced` is `built_in`: the built-in material's parameters. */
    builtIn: {
        baseColor: [number, number, number, number];
        metallic: number;
        roughness: number;
        emissive: [number, number, number];
        baseColorTexture: SceneRecordTexture | null;
        emissiveTexture: SceneRecordTexture | null;
        alphaMode: "mask" | "blend" | "add" | null;
        alphaCutoff: number | null;
        diffuseTransmission: number | null;
        diffuseTransmissionColor: [number, number, number] | null;
        diffuseTransmissionColorTexture: SceneRecordTexture | null;
        rimColor: [number, number, number] | null;
        rimPower: number | null;

        thin: boolean;
    } | null;
    /** One per family drawn `graph`; the package `null` when the scene keeps none there. */
    graphs: {
        family: MaterialGraphFamily;
        packageUri: string | null;
        hash: string | null;
        name: string | null;
        problem: string | null;
    }[];
}

declare interface SceneRecordTexture {
    /** Position in `images`. */
    image: number;
    uri: string;
    mimeType: string | null;
    magFilter: number | null;
    minFilter: number | null;
    wrapS: number | null;
    wrapT: number | null;
    texCoord: number;
}

/** The scene's render settings as its designer set them, every default filled in. */
export declare type SceneRenderSettings = NonNullable<ScenePlayer['sceneRenderSettings']>;

/** A `.trd`: its URL, its bytes, or a download `TrideScene.download` started. */
export declare type SceneSource = string | Uint8Array | ArrayBuffer | SceneDownload;

declare interface ScreenSpaceReflectionsOptions {
    enabled?: boolean;
    thickness?: number;
    bias?: number;
    maxDistance?: number;
    stride?: number;
}

/** Options of `setInputs`. */
export declare interface SetInputsOptions {
    /** All or nothing: a refused or unknown input stops the whole batch. */
    readonly strict?: boolean | undefined;
    /**
     * How a URL given for an image input reaches the scene; `setImage` by default. `<tride-scene>`
     * passes its own, which keeps the picture for the scenes it loads next.
     */
    readonly image?: ((name: string, url: string) => Promise<ImageOutcome>) | undefined;
}

declare type ShadowType = 'PCF' | 'VSM' | 'DPCF' | 'PCSS' | 'PCFd';

declare interface SoftShadowOptions {
    penumbraScale?: number;
    penumbraRatioScale?: number;
}

declare interface SsaoOptions {
    enabled?: boolean;
    radius?: number;
    power?: number;
    bias?: number;
    intensity?: number;
    quality?: QualityLevel;
    resolution?: number;
}

export declare type StateChange = Parameters<Parameters<ScenePlayer['onStateChange']>[0]>[0];

declare interface StateChange_2 {
    /**
     * Layer index in execution order — `currentState()` reads the last layer.
     */
    layerIndex: number;
    /**
     * Layer slug (`layers[].id`; the SM's own id for a legacy single graph).
     */
    layerId: string;
    from: string;
    to: string;

    transition: string;
}


declare interface StoredStreamsView {
    readonly positions?: StoredStreamView;
    readonly uvs?: StoredStreamView;
    readonly uvs1?: StoredStreamView;
    readonly colors?: StoredStreamView;
    readonly weights?: StoredStreamView;
}

/**
 * One vertex stream as the file stores it, for Filament's vertex buffer as gltfio sets it: the
 * `AttributeType` of `component` × `components`, `normalized`, byte stride `stride`.
 */
declare interface StoredStreamView {
    readonly component: 'i8' | 'u8' | 'i16' | 'u16';
    readonly normalized: boolean;
    readonly components: 2 | 3 | 4;
    /** Bytes per vertex: the components padded to a multiple of 4. */
    readonly stride: number;
    /** Little-endian rows, one per vertex. */
    readonly bytes: Uint8Array;
}

declare type SwapChain = FilamentNs.SwapChain;

declare interface TaaOptions {
    enabled?: boolean;
    feedback?: number;
    filterWidth?: number;
    sharpness?: number;
}

declare type ToneMappingOperator =
| 'LINEAR'
| 'ACES_LEGACY'
| 'ACES'
| 'FILMIC'
| 'DISPLAY_RANGE'
| 'ACES_NEUTRAL'
| 'PBR_NEUTRAL'
| 'AGX_PUNCHY';

declare interface ToneMappingOptions {
    operator?: ToneMappingOperator;
    exposure?: number;
    luminanceScaling?: boolean;
    gamutMapping?: boolean;

    saturation?: number;
}

export declare class TrideScene {
    /** The player beneath — the engine and the frame the editor viewport shares. */
    readonly player: ScenePlayer;
    private loaded;
    /** The scene file `load` is downloading: `dispose` (or the next `load`) stops it. */
    private download;
    private constructor();
    static create(canvas: HTMLCanvasElement, options?: TrideSceneOptions): Promise<TrideScene>;

    static download(url: string): SceneDownload;
    /**
     * Which Tride runtime this page runs: the release, the commit the runtime was built from, the
     * `.trd` format it reads. No canvas or scene needed: on a page that runs no runtime yet it boots
     * the lite one (both builds answer the same), so the page's first scene still picks its build.
     */
    static buildInfo(options?: Pick<TrideSceneOptions, 'runtimeWasm' | 'runtimeLiteWasm'>): Promise<RuntimeBuildInfo>;
    get isLoaded(): boolean;
    /**
     * A `.trd` by URL or bytes → the scene on the canvas, its first frame applied. A download still on
     * its way when the scene is disposed, or another `load` starts, is stopped (the promise rejects
     * with an `AbortError`). Rejects while a frame session is open: the scene shown stays loaded.
     */
    load(source: SceneSource): Promise<void>;
    /** Start the loop. Throws while a frame session is open: its page steps the scene itself. */
    play(): void;
    pause(): void;
    get isPlaying(): boolean;
    /**
     * Draw and wake the scene's logic at most `fps` times a second — it still runs 60 steps a second, so
     * animations and timings stay the same. `null` = every animation frame (the default); 0, a negative
     * or not a number keeps the default and is one problem. Takes effect at once, playing or not.
     */
    setPreferredFps(fps: number | null): void;
    /** The render rate the loop keeps; `null` = every animation frame. */
    get preferredFps(): number | null;
    /**
     * Lay the page's render knobs over the scene's render settings: `msaa` turns MSAA on or off,
     * `msaaSamples` picks 2, 4 or 8 samples, `bloom` / `shadows` / `depthOfField` `false` switches it
     * off (`true` keeps the scene's — a knob never turns on what the scene does not show). An unset or
     * `null` knob keeps the scene's value; `null` clears them all. Changes the running scene in place
     * (its state and animation go on) and holds for the scenes loaded next; never written to the scene.
     */
    setRenderOverrides(knobs: RenderOverrides | null): void;
    /** The knobs set, `null` when none is. */
    get renderOverrides(): RenderOverrides | null;
    /** Back to the scene's render settings: every knob cleared. */
    clearRenderOverrides(): void;
    /** The scene's own render settings (whatever the knobs); `null` before load or when it sets none. */
    get sceneRenderSettings(): SceneRenderSettings | null;
    /**
     * One step of `dtSec` seconds outside the loop (a host that drives its own clock). `true` when
     * a frame was painted; on `false` the scene has advanced all the same (nothing changed, or the
     * renderer asked to skip the frame) and `renderNow({ neverSkip: true })` paints it.
     */
    tick(dtSec: number): boolean;
    /** A host script to its end as one frame; `stopped` names an early stop. */
    advance(scriptJson: string): AdvanceOutcome;
    /**
     * Paint the current state again; `true` when a frame was painted. The renderer asks to skip a
     * frame the GPU is not ready for — in one task, every frame after the second: `false` then,
     * unless `neverSkip` is set, which paints it.
     */
    renderNow(options?: RenderOptions): boolean;
    setInput(name: string, value: BindingValue): void;
    trigger(name: string): void;

    getInputs(): InputsSnapshot;

    setInputs(values: Record<string, BindingValue>, options?: SetInputsOptions): InputsReport;
    /** The scene's contract: what `setInput` / `trigger` accept (empty before `load`). */
    availableBindings(): BindingInfo[];
    onEvent(handler: (event: SceneEvent) => void): Unsubscribe;
    onStateChange(handler: (change: StateChange) => void): Unsubscribe;
    /**
     * Hear the scene's inputs change: after each tick `handler` gets every input whose value is not
     * what it was after the tick before, `{ name, value, previous }`, in the scene's order of
     * inputs — one call per input per tick, with the value the tick ended on, so a value that
     * stepped several times within one tick arrives once, `previous` being where it stood before.
     * The page's own `setInput` / `setInputs` writes are reported like any other change, by the tick
     * that follows them, together with the inputs computed from them; an input the scene writes
     * itself (a drag, an action) changes in its tick, and what is computed from it a tick later.
     * Triggers and image inputs are not reported. `advance` reports the changes of every tick of
     * its script, each with its `step`.
     *
     * The handler runs after the frame and after the tick's `onStateChange` and `onEvent` handlers.
     * A `setInput` it makes lands in the next tick and is reported by it: write back only when the
     * value differs, or the two answer each other every tick. A handler that throws is a problem
     * (`onProblem`); the scene plays on.
     *
     * The scene compares its inputs only while a handler is subscribed; subscribing and `load` take
     * the values as they stand as the base, unreported. Works before `load`.
     */
    onInputChange(handler: (change: InputChange) => void): Unsubscribe;
    currentState(): string;
    layerStates(): LayerState[];
    /** The canvas' size in CSS pixels — the space the pointer speaks. */
    setViewport(width: number, height: number): void;
    /**
     * Size the drawing buffer to the canvas' CSS box × `dpr` and tell the scene. While a frame size
     * is set (`setRenderSize`) the buffer stays that size and the scene is told the CSS box only.
     */
    resize(dpr?: number): void;
    /**
     * The frame's size in device pixels, said by the page: the drawing buffer is `width` × `height`
     * exactly, whatever the canvas' CSS size, a CSS `transform` on it and the screen's density;
     * `pixelsPerPoint` (1 by default) is how many of them make a point of pixelation. It stays
     * through `resize`, `load` and a restored context until `setRenderSize(null)`, which sizes the
     * buffer as `resize()` does. The camera's aspect is `width / height`. Works before `load`; draws
     * nothing by itself (the next `tick` or `renderNow` paints at the new size). The layout is not
     * read: a canvas with no CSS size of its own changes its box with the buffer, and `resize()`
     * tells the scene the new box, for the pointer.
     *
     * Throws, the size staying what it was: a `RangeError` for a side that is no whole number of at
     * least 1 or is above what the WebGL context draws, and for a `pixelsPerPoint` that is no finite
     * number above 0 (a size is never rounded or clamped); an `Error` once the scene is disposed,
     * and for a size while the context is lost.
     */
    setRenderSize(...size: Parameters<ScenePlayer['setRenderSize']>): void;
    /** The frame size the page said (`setRenderSize`); `null` while the buffer follows the layout. */
    get renderSize(): RenderSize | null;
    /**
     * Begin writing frames one by one — a recorder's loop: the frame is `width` × `height` device
     * pixels, the loop stands, and the page steps the scene itself. `session.step(dtSec)` advances
     * the scene by `dtSec` seconds (above 0, at most 0.1) and paints the frame in the same call,
     * every time, and answers `{ index, sceneTimeNs, pending }`; it throws when no frame was
     * painted. The frame is the canvas: read it right after the step (`new VideoFrame(canvas)`), or
     * at any time before the next step when the scene was created with
     * `contextAttributes: { preserveDrawingBuffer: true }` (`session.keepsFrame`).
     * `await session.settled()` waits for what is still on its way — pictures being decoded, a
     * `setImage` not answered yet (`session.pending` counts them) — and never for an animation
     * frame or a timer, so it works in a hidden window; `session.redraw()` paints the same state
     * again. `session.end()` puts the frame size, the render knobs and the loop back.
     *
     * The session switches dithering, temporal anti-aliasing and dynamic resolution off, so the
     * same state and time give the same frame, and two runs on one machine give the same frames;
     * `temporalEffects: true` keeps the scene's settings and gives that up.
     *
     * One session at a time. While it is open `play`, `load` and attaching sound throw; inputs,
     * triggers, the pointer, pictures and `advance` work. A lost context closes it: begin another
     * after `contextRestored()`, the scene goes on from the same time.
     *
     * Throws, nothing changed: before `load`, while the context is lost, with a session open, when
     * the scene hears sound (`detachAudio` first: sound follows the real clock), for a size
     * `setRenderSize` refuses, and when the runtime refuses the knob (an older runtime file).
     */
    beginFrames(options: FrameSessionOptions): FrameSession;
    /** The open frame session (`beginFrames`); `null` when none is. */
    get frames(): FrameSession | null;
    pointer(phase: PointerPhase, x: number, y: number): void;
    pick(x: number, y: number): PointerHit[];
    /**
     * Bind source `source` to the scene's number input `name`: from the next tick the scene writes it
     * from the source, `mapping` from the source's range onto the input's (`from` / `to`, clamped),
     * and `setInput` on it throws until `unbindInput`. Binding it again replaces the binding; a new
     * `load` starts with none. Throws for an input the scene lacks, one that is not a number, is
     * computed or is driven by the scene's own pointer interactions, and for an empty or non-finite
     * range.
     */
    bindInput(name: string, source: InputSource, mapping?: InputMapping): void;
    /** The page writes input `name` again; it keeps its value. `true` when it was bound. */
    unbindInput(name: string): boolean;
    /** The page's bindings, in the order they were made (none before `load`). */
    boundInputs(): BoundInput[];
    /** A scroll source is bound: report the page's scroll (`scroll`) only then. */
    readsScroll(): boolean;
    /**
     * The page's scroll, CSS px: `window.scrollY`, `window.innerHeight`, the canvas'
     * top on the page and its height — call it whenever any of them changes while a scroll source
     * is bound. The bound inputs read the speed (screens / s) and the scene's pass through the window.
     */
    scroll(offset: number, extent: number, sceneTop: number, sceneHeight: number): void;
    /** The view axes the scene's drag interactions claim — `y`: it wants vertical swipes too. */
    dragAxes(): DragAxes;
    /**
     * Play a track and let the scene hear it (as `options.input`, `music` by default): a URL, the
     * file's bytes or an `AudioBuffer`, decoded by the browser. Resolves once decoded — call the
     * track's `play()` from a user gesture; `pause`, `seek`, `loop`, `volume`, `muted` control it.
     */
    attachAudioTrack(source: AudioTrackSource, options?: AudioTrackAttachOptions): Promise<AudioTrack>;
    /**
     * Let the scene hear what an `<audio>` / `<video>` element plays — a file or an endless stream
     * such as internet radio. A cross-origin source needs CORS (`crossorigin="anonymous"` and the
     * server's header); without it the scene hears nothing and a problem says so.
     */
    attachAudioMedia(media: HTMLMediaElement, options?: AudioMediaAttachOptions): Promise<AudioMediaTap>;
    /** The scene stops hearing `input` (`music` by default); a track attached here stops playing. */
    detachAudio(input?: string): void;
    /**
     * The app's picture for image input `name` — JPEG, PNG or WebP as a `Blob` / `File`, the file's
     * bytes, or a URL (a cross-origin one needs CORS). Decoded by the browser (EXIF orientation,
     * ≤ 2048 px on the long side); the scene's photo slots show it from the next frame, the previous
     * picture staying while it loads. Resolves `'loaded'`, `'failed'` (the picture could not be
     * fetched or decoded: the placeholder shows, a problem says why) or `'superseded'` (a later call
     * for `name` came first — nothing to show). Rejects, nothing changed, for a name that is no image
     * input of the scene (`{ kind: 'image.input', message }`) and before `load`. The scene reports
     * each status as event `image.<name>`.
     */
    setImage(name: string, source: ImageSource): Promise<ImageOutcome>;
    /**
     * The page's picture for image input `name` as pixels — a screen the page draws itself, a frame
     * of a stream: `{ width, height, data }`, RGBA8 with straight (not premultiplied) alpha, sRGB,
     * rows top to bottom, each side 1…2048; an `ImageData` as it is. The call waits for nothing and
     * answers nothing: the bytes are copied (write on in your array at once), and the scene shows
     * the picture in the frame of the next `tick` — one of 1/60 s or longer, or `tick(0)`; a
     * shorter step shows it once the scene reaches its next 60 Hz step, `renderNow()` alone does
     * not. One `image.<name>` event per call. Nothing is scaled, turned or colour managed (that is
     * `setImage`, which decodes a file), and a `setImage` still decoding for `name` ends
     * `'superseded'`. Pixels read back from a 2D canvas were premultiplied on the way: a transparent
     * texel comes back black; opaque colours are exact.
     *
     * Throws, nothing changed: before `load`; `{ kind: 'image.input', message }` for a name that is
     * no image input, a side outside 1…2048 or not a whole number, `data` that is not 8-bit or not
     * `width × height × 4` bytes, a `colorSpace` other than `'srgb'`.
     */
    setImagePixels(name: string, pixels: ImagePixels): void;
    /**
     * A picture for image input `name` is on its way before the page has its bytes (a picker, a
     * download): the scene sees `'loading'`, the picture shown stays. Throws for a name that is no
     * image input.
     */
    imageLoading(name: string): void;
    /** Image input `name` back to no picture: the placeholder shows. Throws for a name that is no image input. */
    clearImage(name: string): void;
    /**
     * The canvas' WebGL context is lost: call it from a `webglcontextlost` listener that calls
     * `event.preventDefault()` (so the browser may give the context back). The loop stops and the
     * renderer goes; the scene's state — its state machine, inputs, time, bindings — stays, and
     * `setInput` / `trigger` still reach it.
     */
    contextLost(): void;
    /**
     * The canvas' WebGL context is back (`webglcontextrestored`): a new renderer on the same canvas
     * shows the scene where it stood; `play()` resumes the loop. Resolves `false` when the context was
     * lost again meanwhile; rejects when the scene cannot be continued (`keepsStateOnContextRestore`
     * false: load it again) or the renderer fails to start.
     */
    contextRestored(): Promise<boolean>;
    /** `contextLost` ran and the renderer is not back yet. */
    get isContextLost(): boolean;
    /** `contextRestored` continues the scene where it stood (`false`: this runtime build cannot). */
    get keepsStateOnContextRestore(): boolean;
    dispose(): void;
}

export declare class TrideSceneElement extends ElementBase {
    static readonly observedAttributes: string[];
    private _scene;
    /** The page's render knobs, laid over every scene the element loads; `null` = none. */
    private knobs;
    /**
     * The scene of the load in flight, until it is exposed or fails: whatever ends that load (a
     * dispose, a cleared or new `src`) disposes it at once — its download stops and its engine goes.
     */
    private loadingScene;
    /** The scene file of the load in flight, until its scene has it: dropped with the load. */
    private loadingDownload;
    /** The canvas an engine draws on; swapped for a fresh one once its WebGL context is gone. */
    private canvas;
    private readonly loadingSlot;
    private readonly errorSlot;
    private readonly posterSlot;
    private _status;
    private _disposed;
    private loadGeneration;
    private intersection;
    private resizeObserver;
    private visible;
    /** Stops listening for the next change of the devicePixelRatio (page zoom, another screen). */
    private stopPixelRatio;
    /** DOM pointer events of the canvas (and, scope `page`, the document) to the scene. */
    private readonly pointers;
    /** `connectedCallback` ran for this connection: a later `src` change loads, the upgrade's does not. */
    private started;
    /** A document holds the element: from its first connection until it stays out of the document. */
    private held;
    /** The canvas's WebGL context is lost (until the browser restores it). */
    private contextLost;
    /** An engine took a WebGL context from the canvas: it is the engine's to give back. */
    private canvasUsed;
    /** The browser took the canvas's context away, for good: the next engine needs a new canvas. */
    private canvasSpent;
    /** The sound every scene of this element hears, by input. */
    private readonly audio;
    /** The latest picture of each image input, given to every scene the element loads. */
    private readonly images;
    /** `setImage` calls made before a scene was ready: settled by the next load. */
    private waitingImages;
    /** `observe-inputs`: ends the watch of the scene's inputs; `null` while nothing is watched. */
    private stopInputWatch;
    /** `bindInput()` calls, given to every scene the element loads (they win over the attribute). */
    private readonly methodBindings;
    /** The inputs the `bind-inputs` attribute bound in the loaded scene. */
    private attributeBound;
    /** `scroll` / `resize` are heard: the loaded scene has a scroll source bound. */
    private hearingScroll;
    /** Host calls made while no scene was ready, applied by the next load (after the `inputs` attribute). */
    private pendingCalls;
    /** The problems already written to the console in this load. */
    private readonly consoleLines;
    constructor();
    get status(): TrideSceneElementStatus;
    /** The scene beneath, once loaded. */
    get scene(): TrideScene | null;
    connectedCallback(): void;
    disconnectedCallback(): void;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;

    get preferredFps(): number | null;
    set preferredFps(fps: number | null);
    /**
     * Lay the page's render knobs over the scene's render settings: `msaa` (on or off), `msaaSamples`
     * (2, 4 or 8), `bloom` / `shadows` / `depthOfField` `false` switches it off (`true` keeps the
     * scene's). Unset or `null` keeps the scene's value; `null` clears them all. The running scene
     * changes in place; every scene loaded after takes them too.
     */
    setRenderOverrides(knobs: RenderOverrides | null): void;
    /** The knobs set, `null` when none is. */
    get renderOverrides(): RenderOverrides | null;
    /** Back to the scene's render settings: every knob cleared. */
    clearRenderOverrides(): void;
    /** The scene's own render settings, whatever the knobs; `null` before it is ready or when it sets none. */
    get sceneRenderSettings(): SceneRenderSettings | null;
    /** The attribute as a number: `null` without it, `NaN` for one that is no number. */
    private requestedFps;
    play(): void;
    pause(): void;
    /**
     * Write the scene's input `name`. Before the scene is ready the call waits and is applied, in
     * order with the other early calls, right after `tride-ready` (one the scene refuses is then a
     * `tride-problem`; on a loaded scene it throws).
     */
    setInput(name: string, value: BindingValue): void;

    getInputs(): InputsSnapshot;

    setInputs(values: Record<string, BindingValue>, options?: Pick<SetInputsOptions, 'strict'>): Promise<InputsReport>;
    /**
     * Bind a source the page measures to the scene's number input `name` — `'scroll-speed'` (screen
     * heights per second, up or down alike) or `'scroll-position'` (the scene's pass through the
     * window, 0…1) — `mapping` from the source's range onto the input's (`from` / `to`, clamped; a
     * missing end: speed `[0, 2]`, position `[0, 1]`, onto `[0, 1]`). Every scene the element loads
     * gets it. Throws when the loaded scene refuses it (then nothing is kept).
     */
    bindInput(name: string, source: InputSource, mapping?: InputMapping): void;
    /**
     * Drop the binding `bindInput()` made for `name` — the page writes the input again, which keeps
     * its value. `true` when the loaded scene had it bound. A binding of the `bind-inputs` attribute
     * comes back with the next load or attribute change.
     */
    unbindInput(name: string): boolean;
    /** Fire the scene's trigger `name`; before the scene is ready it waits, like `setInput`. */
    trigger(name: string): void;
    /** The loaded scene's bindings and triggers (empty while nothing is loaded). */
    availableBindings(): BindingInfo[];
    /**
     * A host script to its end as one frame; `null` while there is no scene (it cannot wait for one). A
     * script the runtime cannot read is `{ stopped: { step: 0, reason } }`, as on iOS and Android.
     */
    advance(scriptJson: string): AdvanceOutcome;
    /**
     * Play a track and let the scene hear it (as `options.input`, `music` by default): a URL, the
     * file's bytes or an `AudioBuffer`. Resolves once decoded — call the track's `play()` from a user
     * gesture. Every scene the element loads hears it; `detachAudio` or removing the element stops it.
     */
    attachAudioTrack(source: AudioTrackSource, options?: AudioTrackAttachOptions): Promise<AudioTrack>;
    /**
     * Let the scene hear what an `<audio>` / `<video>` element plays — a file or an endless stream
     * such as internet radio. A cross-origin source needs CORS; without it the scene hears nothing and
     * `tride-problem` says so. Start it from a user gesture (the tap's `play()`). A page policy that
     * refuses the tap's worklet module (no `blob:` in `script-src`) is a `tride-problem` (code `host`)
     * and the rejection says the same.
     */
    attachAudioMedia(media: HTMLMediaElement, options?: AudioMediaAttachOptions): Promise<AudioMediaTap>;
    /** The scene stops hearing `input` (`music` by default); its track stops, a tapped element plays on. */
    detachAudio(input?: string): void;
    /**
     * The app's picture for image input `name` — a `Blob` / `File`, the file's bytes, or a URL (a
     * cross-origin one needs CORS). Every scene the element loads shows it; the previous picture
     * stays while it loads. Resolves `'loaded'`, `'failed'` (the picture could not be fetched or
     * decoded: the placeholder shows and `tride-problem` says why) or `'superseded'` (a later
     * `setImage` / `imageLoading` / `clearImage` of `name` came first — nothing to show); an
     * `image.<name>` event follows every status change. Rejects, keeping nothing, when the scene has
     * no image input `name` (`{ kind: 'image.input', message }`) and once the element is disposed.
     */
    setImage(name: string, source: ImageSource): Promise<ImageOutcome>;
    /**
     * The page's picture for image input `name` as pixels — a screen the page draws itself, a frame
     * of a stream: `{ width, height, data }`, RGBA8 with straight alpha, sRGB, rows top to bottom,
     * each side 1…2048; an `ImageData` as it is. The bytes are copied by the call. On a ready
     * scene the picture is in at once and shows in the next frame, and a wrong call throws,
     * nothing changed (`{ kind: 'image.input', message }` for a name that is no image input, a
     * wrong size, bytes that do not make `width × height` pixels). While the scene loads the call
     * waits for it with the other early calls and a refusal is a `tride-problem`; with no scene
     * coming it is a `tride-problem` too. Every scene the element loads next shows the picture. A
     * `setImage` of `name` still on its way ends `'superseded'` once the pixels are in; a later
     * `setImage`, `imageLoading`, `clearImage` or `setImagePixels` of `name` takes its place.
     */
    setImagePixels(name: string, pixels: ImagePixels): void;
    /**
     * A picture for image input `name` is on its way before the page has its bytes (a file picker,
     * a download): the scene sees `'loading'` — show a spinner on `image.<name>` — and the picture
     * shown stays. A `setImage` still on its way for `name` ends `'superseded'`. Throws, changing
     * nothing, when the scene has no image input `name`.
     */
    imageLoading(name: string): void;
    /**
     * Image input `name` back to no picture, in this scene and the next ones. Throws, changing
     * nothing, when the scene has no image input `name`.
     */
    clearImage(name: string): void;
    reload(): Promise<void>;
    dispose(): void;
    /** `src` went: the scene (or the load in flight) goes, the element stays and is `idle` and blank. */
    private clearScene;
    private loadScene;
    /** The load in flight is over: its scene goes now, not when its download or engine is done. */
    private dropLoadingScene;
    /**
     * The element ends in `error`: waiting calls settle, the error slot shows, `tride-error` fires.
     * `what` says what happened to the scene in the console line — a load that failed, or a running
     * scene that `stopped`.
     */
    private fail;
    /**
     * A problem is the `tride-problem` event; one no handler cancels is also written to the console
     * once per load, as the headless `TrideScene` does when it has no `onProblem` — a handler that
     * shows it itself calls `preventDefault()`.
     */
    private problem;
    private label;
    /**
     * A call for the scene: made now when there is one (a refusal throws to the caller), else kept
     * for the scene a load is about to bring; with no load coming it is a problem, never silence.
     */
    private hostCall;
    /** The early calls will never reach a scene: forget them, and tell the ones a page awaits. */
    private dropCalls;
    /** The early calls, in order, on the scene that is ready; a refusal is a problem (nobody awaits it). */
    private flushCalls;
    /** A call that cannot reach a scene (none loaded, none coming) is said, not dropped silently. */
    private ignored;
    private makeCanvas;
    /**
     * The canvas goes and a fresh one takes its place: its WebGL context is given back to the browser
     * (a context cannot be released any other way, and a lost one never comes back for the next
     * engine). The pointer listeners follow the new canvas.
     */
    private renewCanvas;
    private readonly onContextLost;
    private readonly onContextRestored;
    /**
     * The context is back: the scene's renderer is built again on the same canvas and the scene goes
     * on where it stood (`tride-context-restored`, `detail.kept`). A runtime build that cannot hand
     * out its whole state starts the scene over (a problem says so); a renderer that fails to start
     * is a `tride-error`. A load, `src` change or dispose meanwhile wins.
     */
    private restoreScene;
    /** A source kept for every scene; the loaded scene hears it now (its refusal throws to the caller). */
    private keepAudio;
    /** A loaded scene hears a kept source; a refusal is a problem (nobody awaits it). */
    private hearOn;
    /**
     * `observe-inputs` on `scene`: while the attribute is set, each change of its inputs is a
     * `tride-input` event; the scene compares its inputs only then. A scene that went (a new `src`)
     * took its watch with it.
     */
    private watchInputs;
    /** A loaded scene shows the kept pictures; the calls that waited for it settle as they do. */
    private showImages;
    /**
     * The kept picture to `scene` — a file through `setImage`, pixels through `setImagePixels`; a
     * scene without image input `name` refuses it and the element lets that picture go (the
     * caller, if any, hears the refusal).
     */
    private giveImage;
    /**
     * A `setImage`, `imageLoading` or `clearImage` of input `name` overtakes the earlier calls that
     * still wait for a scene: their `setImage` promises end `'superseded'`, their pixels are dropped.
     */
    private overtake;
    /** The `setImagePixels` calls of input `name` that wait for a scene are not made: a later call came. */
    private dropEarlyPixels;
    /** Settle the waiting `setImage` calls `which` picks with `outcome`. */
    private settleWaiting;
    /** The loop runs only while playing, on screen, with a WebGL context and not `paused`. */
    private get looping();
    private syncLoop;
    private readonly onPageScroll;
    /**
     * The page's scroll and the element's box on it, to the scene — while its loop runs and a
     * scroll source is bound.
     */
    private reportScroll;
    /** Hear the page's scroll exactly while the loaded scene has a scroll source bound. */
    private syncScroll;
    private hearScroll;
    /** A loaded scene gets the page's bindings: the attribute's, then the method's over them. */
    private bindPageInputs;
    /**
     * The `bind-inputs` attribute onto the loaded scene: what it bound before is unbound, then the
     * inputs it names now are bound (a `bindInput()` of the same input wins). A bad attribute is a
     * problem and changes nothing; a refused entry is a problem and leaves that input unbound.
     */
    private bindAttributeInputs;
    /** Bind one input on `scene`; a refusal is a problem (nobody awaits it). */
    private bindOn;
    private bindProblem;
    /** A scene that drags up and down loses that swipe to the page on a phone — say so, once a load. */
    private warnVerticalDrag;
    /** The batch on a ready scene; pictures go through the element, which keeps them for the next scene. */
    private writeInputs;
    private applyInputs;
    private observe;
    /**
     * The drawing buffer is the box × devicePixelRatio, and the ratio changes with no change of the
     * box (page zoom with a fixed size, the window moved to another screen), where `ResizeObserver`
     * is silent. A `resolution` media query fires once when the ratio leaves its value; the next
     * one is armed from the handler.
     */
    private watchPixelRatio;
    private slotContainer;
    private setStatus;
    private showSlot;
    /** `false` when a handler cancelled a `cancelable` event. */
    private emit;
}

export declare type TrideSceneElementStatus = 'idle' | 'loading' | 'ready' | 'playing' | 'paused' | 'error';

export declare interface TrideSceneOptions {
    /** `/filament/filament.js` by default (its `.wasm` next to it). */
    readonly filamentScriptUrl?: string | undefined;
    /** Where the runtime `.wasm` (the full build) is served; default = next to the JavaScript. */
    readonly runtimeWasm?: ScenePlayerOptions['runtimeWasm'];
    /**
     * Where the lite runtime (no text) is served: a scene without fonts loads it instead of the full
     * one. Default: `tride_runtime_api_lite_bg.wasm` next to `runtimeWasm` when that is a URL, else
     * next to the JavaScript; `false` — every scene on the full runtime.
     */
    readonly runtimeLiteWasm?: ScenePlayerOptions['runtimeLiteWasm'] | false;
    /**
     * The runtime build `create` boots beside Filament: `'full'` by default; a download's `build`
     * (`TrideScene.download(url).build`) boots the one the scene needs as soon as its table of
     * contents is read.
     */
    readonly runtimeBuild?: ScenePlayerOptions['runtimeBuild'];
    /** Base URL of the IBL presets (`${iblBase}/${name}_ibl.ktx`); absent = no presets served. */
    readonly iblBase?: string | undefined;
    /** `'production'` by default — the look a device shows. */
    readonly quality?: ScenePlayerOptions['quality'];
    /**
     * The canvas' WebGL context attributes, read by the browser once, when the canvas gets its
     * context: `preserveDrawingBuffer: true` keeps each painted frame on the canvas until the next
     * is painted, so the page reads it at any time; without it a frame is read in the task that
     * painted it. `create` rejects for an unknown attribute, a value that is no boolean, and a
     * canvas that already had a context made with other attributes.
     */
    readonly contextAttributes?: ScenePlayerOptions['contextAttributes'];
    /** Every problem the frame or the runtime reports; default: `console.warn`, once per pointer. */
    readonly onProblem?: ScenePlayerOptions['onProblem'];
}

export declare type Unsubscribe = () => void;

declare type Unsubscribe_2 = () => void;

declare type View = FilamentNs.View;

declare interface VignetteOptions {
    enabled?: boolean;
    midPoint?: number;
    roundness?: number;
    feather?: number;

    color?: [number, number, number];
}

declare interface VsmShadowOptions {
    anisotropy?: number;
    mipmapping?: boolean;
    msaaSamples?: number;
    highPrecision?: boolean;
    minVarianceScale?: number;
    lightBleedReduction?: number;
}

export { }

declare global {
  interface HTMLElementTagNameMap {
    'tride-scene': TrideSceneElement;
  }
}
