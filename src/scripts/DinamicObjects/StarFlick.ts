import { pipe } from "fp-ts/lib/function";
import { Coroutine, GE } from "../GameEngine";
import type { THREE } from "../ThreeJS/ThreeEngine/THREE";
import { array } from "fp-ts";
import { ThreeObjectFinderH } from "../ThreeJS/ThreeEngine/Helpers/ThreeObjectFinderH";
import { Tween } from "@tweenjs/tween.js";
import { TWEEN } from "../FrameworksExport";
import SmoothLerper from "../CameraManagiment/Lerper";
import { math } from "../utils";
import randomH from "../utils/randomH";

/**
 * sometimes launches coruotines to animate stars
 * todo convert to coroutine flick that will randomly launch coroutinesfor some set of objects
 * @deprecated use CoroutineFlick
 */
export class StarFlick extends GE.ADynamicObject {
	private _lastIndexFlicked = 0;
	private _stars: Array<THREE.Object3D> = new Array<THREE.Object3D>();

	public constructor(stars: THREE.Object3D[]) {
		super();
		this._stars = stars;
	}

	/**
	 * x per 1 second
	 */
	private _flickFrequency = 6;
	private _lastTimeFlicked = -1010101;
	private _isIttimeToFlick() {
		const flicEveryxms = 1 / this._flickFrequency;
		const timePassed = GE.GameTime.realTimeSinceStartup - this._lastTimeFlicked;
		const isNeededToFlick = timePassed > flicEveryxms;
		return isNeededToFlick;
	}

	public override onFrameUpdate(): void {
		if (!this._isIttimeToFlick()) return;
		this._lastTimeFlicked = GE.GameTime.realTimeSinceStartup;

		const nextToBeFlicked = this._stars[this._lastIndexFlicked];
		this._lastIndexFlicked =
			this._lastIndexFlicked++ >= this._stars.length ? 0 : this._lastIndexFlicked++;

		StarFlick._runFlickFor(nextToBeFlicked);
	}

	private static _runFlickFor(star: THREE.Object3D): void {
		const initialScale = star.scale.clone();
		const peakScale = star.scale.clone().multiplyScalar(math.lerp(1.33333, 1.99999, randomH.float0to1()));

		const tween = new Tween({ progress: 0 })
			.to({ progress: 1 }, 1024)
			.easing(TWEEN.Easing.Exponential.Out)
			.onUpdate((params) =>
				star.scale.copy(SmoothLerper.instance.Vector3(peakScale, initialScale, params.progress))
			);
		const coroutine = GE.Coroutine.newFromTween(tween);
	}
}

export class StarFlickH {
	public static async getAllStars(scene: THREE.Scene): Promise<THREE.Object3D[]> {
		return pipe(scene, (sc) => ThreeObjectFinderH.byUserData(sc, "ROLE", "CLUSTERED_STAR"));
	}
}