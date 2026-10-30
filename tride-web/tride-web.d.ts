import type * as FilamentNs from './filament-types.js';

export declare type AdvanceOutcome = ReturnType<ScenePlayer['advance']>;

declare type AntiAliasingMethod = 'NONE' | 'FXAA';

declare type AssetLoader = FilamentNs.gltfio$AssetLoader;



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

/** One binding the page made: the input, its source and the range it maps. */
export declare type BoundInput = ReturnType<ScenePlayer['boundInputs']>[number];

/** One host binding of an input. */
declare interface BoundInput_2 {
    input: string;
    source: InputSource_2;
    from: [number, number];
    to: [number, number];
}

declare type Camera = FilamentNs.Camera;

/**
 * `CameraLike` — the slice of a Filament camera the player writes: look-at and projection.
 *
 * @module @tride/player/engine/camera-like
 * @owner editor
 *
 * Public API:
 *   - `CameraLike` — implemented by Filament's `Camera` and by tiny test stubs.
 *
 * Non-obvious constraints:
 *   - `setProjection` takes `Camera$Projection` as a raw number (`PERSPECTIVE=0`, `ORTHO=1`) so
 *     callers need not import the Filament runtime namespace.
 *
 * Cross-refs:
 *   - Companion: `filament-engine.ts`; the editor's `OrbitControls.applyTo` writes through it.
 */
/**
 * Optional writable Filament-compatible camera surface used by
 * {@link OrbitControls.applyTo}. Only the subset of methods we actually
 * call is required so the unit test can pass in a tiny stub.
 */
declare interface CameraLike {
    lookAt(eye: readonly [number, number, number], center: readonly [number, number, number], up: readonly [number, number, number]): void;
    setProjectionFov(fovDegrees: number, aspect: number, near: number, far: number, fov: number): void;
    /**
     * Explicit-frustum projection (Filament `Camera.setProjection`). `projection`
     * is `Camera$Projection` (`PERSPECTIVE=0`, `ORTHO=1`) passed as a raw number to
     * avoid importing the whole runtime namespace (mirrors {@link setProjectionFov}).
     */
    setProjection(projection: number, left: number, right: number, bottom: number, top: number, near: number, far: number): void;

    setFocusDistance?(distance: number): void;

    setExposure?(aperture: number, shutterSpeed: number, sensitivity: number): void;
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

declare type Entity_4 = FilamentNs.Entity;


declare interface EntityNameMap {
    /** Look up the (single) entity by glTF node name. Mandate 3. */
    readonly byName: ReadonlyMap<string, Entity>;

    readonly allByName: ReadonlyMap<string, readonly Entity[]>;
    /**
     * Sparse `Entity` array indexed by glTF node integer index. Holes
     * (`null`) for indices that the joint loop did not cover and that
     * also lack a unique `nodes[i].name` byName-backfill match. Length
     * matches the glTF document's `nodes[]` count (or `0` when no glTF
     * JSON could be parsed from the load buffer).
     */
    readonly entityByGltfIndex: ReadonlyArray<Entity | null>;
    /** All entities from the loaded main asset (DFS pre-order + std::partition; renderables first — NOT glTF nodes[] order). */
    readonly allEntities: readonly Entity[];
    /** Root entity of the loaded main asset. */
    readonly root: Entity | null;
}


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
    /** gltfio asset loader — shared by AssetRegistry for createInstance. */
    readonly loader: AssetLoader;
    /** The most-recently-loaded main asset (null before first loadAsset). */
    readonly mainAsset: FilamentAsset | null;

    paletteInstancesFor?(slug: string): PaletteInstances | null;

    holdPaletteWrites?(slug: string, held: HeldPaletteWrites): void;

    setSize(widthPx: number, heightPx: number, pixelsPerPoint?: number): void;
    /**
     * Load a glTF / GLB and add its renderables to the scene. Returns
     * the Filament asset so the caller can transform / remove / inspect
     * it. Resources (textures, buffers) load **incrementally** — work
     * is spread across frames with a 16 ms budget per frame so the
     * main thread stays responsive. The returned promise resolves once
     * all resources are ready (after potentially many frames).
     *
     * **Prerequisite:** the render loop must call {@link render} every
     * frame, which in turn calls `engine.execute()` to pump the
     * incremental loader.
     *
     * @param opts.asMain  When `true` (default), this asset becomes the
     *   one returned by name lookups (`buildEntityMap`). Set `false` for
     *   editor helpers (axes, grid, gizmos) so they don't shadow the
     *   user's scene asset. The latest asset loaded with `asMain: true`
     *   wins — this lets the viewport reload scenes safely.
     */
    loadAsset(buffer: Uint8Array, basePath?: string | null, opts?: {
        asMain?: boolean;
        overlay?: boolean;
        decoration?: DecorationKind;
    }): Promise<FilamentAsset>;

    readonly overlayActive: boolean;

    buildEntityMap(_gltfNodeNames?: readonly string[]): EntityNameMap;
    /**
     * Re-build the entity map without re-loading the asset. Used as a
     * fallback when the initial map ended up empty (e.g. StrictMode race).
     */
    refreshEntityMap(_gltfNodeNames?: readonly string[]): EntityNameMap;

    removeMainAsset(): void;

    prepareScene(buffer: Uint8Array | null, basePath?: string | null): Promise<PreparedScene>;
    /**
     * From now on every scene call (`buildEntityMap`, generated meshes, clone batches, palette and
     * material writes, a parent-less attach) lands on `prepared`; the shown scene draws as it was.
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
    hideEntity(entities: readonly Entity_2[]): void;
    /** Add previously-removed entity/entities back to the scene (show a node). */
    showEntity(entities: readonly Entity_2[]): void;

    setNodeMeshReplaced(entity: Entity_2, replaced: boolean): void;

    setEntityTransform(entity: Entity_2, position: readonly [number, number, number], rotation: readonly [number, number, number, number], scale: readonly [number, number, number]): void;
    /**
     * Re-parent `entity` under `newParent` in Filament's TransformManager
     * hierarchy. Pass `null` for `newParent` to make `entity` a root
     * (parent = root transform component). Synchronises the Filament
     * entity hierarchy with the editor manifest `node.parent` field
     * after reparent / unparent operations.
     *
     * Filament warning: re-parenting to a descendant = undefined behavior.
     * Caller must ensure no cycles.
     */
    reparentEntity(entity: Entity_2, newParent: Entity_2 | null): void;

    attachEntityToParent(entity: Entity_2, parent: Entity_2 | null, position: readonly [number, number, number], rotation: readonly [number, number, number, number], scale: readonly [number, number, number]): void;

    render(): boolean;

    bumpCameraVersion(): void;
    /**
     * Manually bump the scene-version counter. Useful for callers who
     * mutate the scene through Filament APIs not wrapped by this
     * handle (e.g. plugin extensions). Auto-bumped by all built-in
     * mutators ({@link loadAsset}, {@link removeMainAsset},
     * {@link hideEntity}, {@link showEntity},
     * {@link setEntityTransform}, {@link setSize}).
     */
    bumpSceneVersion(): void;

    bumpSkinMatrices(): void;
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

    setMorphWeights(entity: Entity_2, weights: ReadonlyMap<number, number>): void;
    /**
     * GPU picking: query which renderable entity is at the given viewport
     * pixel coordinates. Returns the node name (from the entity map) or
     * null if nothing was hit. 1-2 frame latency (Filament constraint).
     */
    pickAtCoords(x: number, y: number): Promise<string | null>;

    pickNodeIdAtCoords(x: number, y: number, projection: SceneProjection): Promise<string | null>;

    applyRenderSettings(settings: RenderSettings, options?: {
        readonly keepLive?: boolean;
    }): void;
    /**
     * Remove a `FilamentAsset` from the engine's internal tracking array
     * WITHOUT destroying it. Used by `AssetRegistry.dispose()` after it
     * has already called `loader.destroyAsset(asset)` — prevents the
     * engine's own `dispose()` from double-freeing the same native handle.
     */
    removeAssetRef(asset: FilamentAsset): void;

    setDecorationsVisible(visible: boolean): void;

    setDecorationKindsVisible(kinds: Readonly<Partial<Record<DecorationKind, boolean>>>): void;

    setMaterialsVisible(visible: boolean): void;

    assignMaterialSlot(entity: unknown, slot: number, materialInstance: unknown): void;

    heldMaterialAt(entity: unknown, slot: number): unknown;

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

    removeOverlayEntities(entities: readonly Entity_2[]): void;

    applyManifestLights(lights: readonly ManifestLightView[]): void;

    applyLightMutations(mutations: readonly FilamentLightMutation[]): void;

    getLightView(lightId: string): ManifestLightView | undefined;

    getLightEntity(lightId: string): Entity_2 | undefined;

    upsertGeneratedMesh(id: string, geometry: GeneratedMeshGeometry, opts?: {
        readonly parent?: Entity_2 | null;
        readonly materialSlug?: string | null;
        /** Palette entry for `materialSlug` when the baked asset has no instance for it. */
        readonly materialParams?: GeneratedMeshMaterialParams | null;

        readonly objectUid?: string | null;

        readonly flow?: {
            readonly pulseParams: GeneratedMeshMaterialParams | null;
        } | null;

        readonly groups?: readonly {
            readonly materialSlug: string | null;
            readonly materialParams: GeneratedMeshMaterialParams | null;
        }[] | null;
    }): Entity_2 | null;
    /**
     * Upload the pulse table of generator `id` (the core's `PulseTable`; `null` clears it).
     * No-op for a mesh drawn without `flow`. Bumps scene version.
     */
    setGeneratedMeshFlow(id: string, table: FlowPulseTable | null): void;
    /** Remove the procedural mesh of generator `id` (no-op when unknown). */
    removeGeneratedMesh(id: string): void;
    /** Entity of the procedural mesh of generator `id`, or `undefined`. */
    getGeneratedMeshEntity(id: string): Entity_2 | undefined;

    syncModuleInstances(generatorId: string, symbol: string, batch: ModuleInstanceBatch, opts?: {
        readonly parent?: Entity_2 | null;
    }): void;
    /** Drop every module instance of generator `generatorId` (no-op when unknown). */
    removeModuleInstances(generatorId: string): void;

    refreshModuleMesh(uid: string, mesh: ModuleMeshView): void;
    /** Visible module instances of generator `generatorId` (test / debug introspection). */
    getModuleInstanceCount(generatorId: string): number;

    setMaterialGraphSource(source: MaterialGraphSource | null, opts?: {
        readonly objectOf?: (entity: Entity_2) => string | null;

        readonly keep?: boolean;
    }): void;
    /**
     * Pull the uniforms of node materials `slugs` touched this tick (`/materialOverrides/{slug}/…`)
     * onto their instances. Bumps scene version when one applied.
     */
    refreshMaterialGraphs(slugs: Iterable<string>): void;

    getGeneratedTextureCount(): number;

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
    readonly property: 'intensity' | 'color' | 'range' | 'innerConeAngle' | 'outerConeAngle' | 'position' | 'rotation';
    readonly component?: 0 | 1 | 2;
    readonly value: number | readonly number[];
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

    readonly diffuseTransmission?: number | null | undefined;
    readonly diffuseTransmissionColor?: readonly [number, number, number] | null | undefined;

    readonly diffuseTransmissionColorTexture?: GeneratedMeshTextureRef | null | undefined;

    readonly rim?: {
        readonly color: readonly [number, number, number];
        readonly power: number;
    } | null | undefined;
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

/** Writes a palette look keeps for instances filled later, and whom to tell what came of them. */
declare interface HeldPaletteWrites {
    readonly writes: ReadonlyMap<string, number | readonly number[]>;
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

/** What a host hands in: the file's bytes, a `Blob` / `File`, or a URL. */
declare type HostPictureSource = Blob | ArrayBuffer | Uint8Array | string;

/** How `setImage` ended: the scene shows the picture, its placeholder stays, or a later call came first. */
export declare type ImageOutcome = HostImageOutcome;

/** A picture for an image input: a `Blob` / `File`, the file's bytes, or a URL (fetched with CORS). */
export declare type ImageSource = HostPictureSource;

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

/** Minimal per-light shape consumed by the engine (resolved from `manifest.lights[]`). */
declare interface ManifestLightView {
    readonly id: string;
    readonly lightType: 'directional' | 'point' | 'spot';
    /** RGB linear [0..1]. */
    readonly color: readonly [number, number, number];
    /** Lux (directional) or candela (point/spot). */
    readonly intensity: number;

    readonly range?: number | null | undefined;
    /** Spot inner cone half-angle (radians). */
    readonly innerConeAngle?: number | null | undefined;
    /** Spot outer cone half-angle (radians). */
    readonly outerConeAngle?: number | null | undefined;
    /** Shadow caster; `null`/absent = platform default (directional/spot cast, point not). */
    readonly castShadows?: boolean | null | undefined;

    readonly position?: readonly [number, number, number] | null | undefined;

    readonly rotation?: readonly [number, number, number] | null | undefined;
    /**
     * Pre-resolved world direction (directional/spot). Legacy/node-Euler fallback
     * used only when `rotation` is absent; defaults applied if both absent.
     */
    readonly direction?: readonly [number, number, number] | null | undefined;

    readonly parentEntity?: Entity_4 | null | undefined;

    readonly carrierAnchored?: boolean | undefined;
}


declare type MaterialGraphFamily = 'mesh' | 'generated' | 'instanced';

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
    graph(slug: string, family: MaterialGraphFamily): MaterialGraphView | undefined;
    /** Its uniforms at the scene's current values (`objectSeed` excluded, `maskThreshold` included). */
    values(slug: string, family: MaterialGraphFamily): Readonly<Record<string, readonly number[]>> | undefined;
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


declare type MaterialPackageProblemCode = 'material.package-missing' | 'material.package-stale' | 'material.package-version';

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

/** One datablock decoded by the core (`BakeHandle.decodeDatablockMesh` / `datablock_mesh`). */
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
    readonly emissiveStrength: number;
    /** The palette entry the instances were filled from — what a lone live write folds with. */
    readonly authored?: MaterialPaletteEntry | undefined;
    remember(name: string, value: number | readonly number[]): void;
}


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

declare type QualityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA';

declare type QualityPreset = 'LOW' | 'MEDIUM' | 'HIGH' | 'ULTRA' | 'CUSTOM';

declare type Renderer = FilamentNs.Renderer;

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

declare interface SceneEvent_2 {
    /** The event's public name (`events[].name`). */
    name: string;
    /** The reporting action's constant payload (B1 scalar kinds). */
    payload: Record<string, number | boolean | string>;
}

declare class ScenePlayer {
    /** Replaced by `restoreRenderer` once the canvas' WebGL context is back. */
    private engine;
    private readonly filament;
    private readonly canvas;
    private readonly options;

    private core;
    private runtime;
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
    /** The density last handed to the engine with the frame size; `NaN` before the first. */
    private sizedScale;
    private readonly eventHandlers;
    private readonly stateHandlers;
    private readonly warned;
    /** `code:pointer` of the problems already reported to `onProblem` since the last load. */
    private readonly reported;
    private disposed;

    private readonly audio;

    private readonly images;
    private constructor();
    static create(options: ScenePlayerOptions): Promise<ScenePlayer>;
    /** The archive's bytes → the scene on the canvas, its first frame applied. */
    load(archive: Uint8Array): Promise<void>;
    /**
     * The canvas' WebGL context is gone (`webglcontextlost`; the host calls `preventDefault()` so the
     * browser may give it back): the loop stops and the engine goes with every GPU object. The
     * runtime — the scene's state machine, inputs, time and the host's bindings — and the CPU copies
     * the scene was built from stay for `restoreRenderer`. Until then `tick`, `advance` and
     * `renderNow` do nothing (the scene stands still) and `load` throws; inputs, triggers, pictures
     * and sound reach the runtime as before.
     */
    loseRenderer(): void;
    /** `loseRenderer` ran and `restoreRenderer` has not finished yet. */
    get isRendererLost(): boolean;

    get keepsStateOnRestore(): boolean;
    /**
     * The canvas' WebGL context is back (`webglcontextrestored`): a new engine on the same canvas,
     * the scene built on it again from the CPU copies, and — the runtime handing out its whole state
     * — its first frame shows the scene where it stood; the loop is the host's to resume (`play`).
     * Resolves `true` once drawn, `false` when the context was lost again meanwhile. Throws when the
     * player is disposed, when the runtime cannot hand out its whole state (`keepsStateOnRestore`),
     * and what building the engine throws.
     */
    restoreRenderer(): Promise<boolean>;
    /**
     * The engine half of a scene: the prepared GLB addressed and filled from the manifest, the
     * runtime's node materials, parametric nodes and module instances wired, then committed. `load`
     * runs it for a new runtime, `restoreRenderer` for the kept one on a new engine.
     */
    private mountScene;
    /** Advance the scene by `dtSec` (clamped to 100 ms), apply the frame and draw it. */
    tick(dtSec: number): void;

    advance(scriptJson: string): {
        readonly stopped: {
            step: number;
            reason: string;
        } | null;
    } | null;
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
    /** What the scene is drawn with: the core's laying of the knobs over the scene's settings. */
    private drawnRenderSettings;
    /**
     * Draw the current state again (a resize, a probe) without advancing the clock; `true` when a
     * frame was painted (Filament skips a `beginFrame` that comes too soon after the last).
     */
    renderNow(): boolean;
    setBinding(name: string, value: BindingValue_2): void;
    trigger(name: string): void;

    getInputs(): InputsSnapshot_2;

    setInputs(values: Record<string, BindingValue_2>, options?: {
        strict?: boolean;
    }): InputsReport_2;

    availableBindings(): BindingDescriptor[];

    setViewport(width: number, height: number): void;

    resize(dpr?: number): void;
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
    private render;
    /** Width / height of the drawing buffer — the aspect the camera is applied with. */
    private canvasAspect;
    /** The default camera's pose at `aspect`; the runtime is asked again only when it changed. */
    private defaultPose;
    private applyCamera;
    /** The runtime picks in the canvas' CSS space; a host camera only while no scene camera is active. */
    private pushScroll;
    private pushViewport;
    private deliver;

    private textProblem;
    private problem;

    private imageProblem;
    private warnOnce;
    private assertLive;
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
    /** The SDK IBL presets, when the host serves them. */
    readonly presetEnvironment?: EnvironmentSources['preset'] | undefined;
    /** Every problem the frame or the runtime reports; default: `console.warn`, once per pointer. */
    readonly onProblem?: ((problem: ScenePlayerProblem) => void) | undefined;
}

declare interface ScenePlayerProblem {
    /** What the problem is about: a pointer, `<tick>`, `audio.<input>` / `image.<input>` / `text.<input>`. */
    readonly pointer: string;
    /** `host`: something the page itself did — an attribute, a call the element could not take. */
    readonly code: RouteProblem['code'] | 'diagnostic' | 'runtime' | 'audio' | 'image' | 'host' | 'text.missing-glyphs' | MaterialPackageProblemCode;
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
    get(nodeId: string): Entity_3 | null;
    /** Get all entities for a manifest node (multi-primitive hide/show). */
    getAll(nodeId: string): readonly Entity_3[] | null;
    /** Whether a manifest node has a mapped entity. */
    has(nodeId: string): boolean;
    /** Reverse lookup: Filament entity → manifest nodeId (for GPU picking). */
    resolveEntity(entity: Entity_3): string | null;
    /** Register entity for a manifest node. Called by buildProjection + reconciler. */
    set(nodeId: string, primary: Entity_3, all?: readonly Entity_3[]): void;

    setCarrier(id: string, carrier: Entity_3): void;
    /** Whether `id`'s primary is a baked carrier node (see {@link setCarrier}). */
    isCarrier(id: string): boolean;
    /**
     * Add pick/hide entities to an existing entry's `all` (idempotent by entity id;
     * the primary is untouched). Returns `true` when membership grew. No entry →
     * `false` (a glyph manager must never mint a carrier primary).
     */
    augment(id: string, entities: readonly Entity_3[]): boolean;
    /**
     * Remove pick/hide entities from an entry's `all` (the primary is never
     * removed). Returns `true` when membership shrank; no entry → `false`.
     */
    detach(id: string, entities: readonly Entity_3[]): boolean;
    /** Remove entry for a deleted/hidden node. */
    delete(nodeId: string): void;
    /** Number of mapped nodes. */
    get size(): number;
    /** Clear all entries (used on scene reload). */
    clear(): void;
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
    /** Layer index in execution order — `currentState()` reads the last layer. */
    layerIndex: number;
    /** Layer slug (`layers[].id`; the SM's own id for a legacy single graph). */
    layerId: string;
    from: string;
    to: string;

    transition: string;
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
     * with an `AbortError`).
     */
    load(source: SceneSource): Promise<void>;
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
    /** One step of `dtSec` seconds outside the loop (a host that drives its own clock). */
    tick(dtSec: number): void;
    /** A host script to its end as one frame; `stopped` names an early stop. */
    advance(scriptJson: string): AdvanceOutcome;
    /** Paint the current state again; `true` when a frame was painted. */
    renderNow(): boolean;
    setInput(name: string, value: BindingValue): void;
    trigger(name: string): void;

    getInputs(): InputsSnapshot;

    setInputs(values: Record<string, BindingValue>, options?: SetInputsOptions): InputsReport;
    /** The scene's contract: what `setInput` / `trigger` accept (empty before `load`). */
    availableBindings(): BindingInfo[];
    onEvent(handler: (event: SceneEvent) => void): Unsubscribe;
    onStateChange(handler: (change: StateChange) => void): Unsubscribe;
    currentState(): string;
    layerStates(): LayerState[];
    /** The canvas' size in CSS pixels — the space the pointer speaks. */
    setViewport(width: number, height: number): void;
    /** Size the drawing buffer to the canvas' CSS box × `dpr` and tell the scene. */
    resize(dpr?: number): void;
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
    attributeChangedCallback(name: string, _oldValue: string | null, newValue: string | null): void;

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
     * `tride-problem` says so. Start it from a user gesture (the tap's `play()`).
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
    /** A loaded scene shows the kept pictures; the calls that waited for it settle as they do. */
    private showImages;
    /**
     * `scene.setImage`; a scene without image input `name` refuses it and the element lets that
     * picture go (the caller, if any, hears the refusal).
     */
    private giveImage;
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
