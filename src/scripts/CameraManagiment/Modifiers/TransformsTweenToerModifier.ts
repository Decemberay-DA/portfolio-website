import { Coroutine, GE } from "@/scripts/GameEngine";
import SmoothLerper from "../Lerper";
import type ITransforms from "../ParamsControllers/Transforms/ITransforms";
import ITransformsEX from "../ParamsControllers/Transforms/ITransformsEX";
import Transforms from "../ParamsControllers/Transforms/Transforms";
import { TWEEN } from "@/scripts/FrameworksExport";
import type { IModifier } from "@/scripts/utils/IModifierStack";

export class TransformsTweenToerModifier implements IModifier<Transforms> {
	private _tweenedTransforms: Transforms = new Transforms(ITransformsEX.newIdentity());
	// private _transformsCoroutine!: Coroutine;

	public apply(object: Transforms): Transforms {
		return this._tweenedTransforms;
	}

	public tweenTo(translateTo: ITransforms, tweenTime: number = 1) {
		const startT = new Transforms(this._tweenedTransforms);
		const endT = new Transforms(translateTo);

		// kill other coroutine of there are one
		// if (this._transformsCoroutine && this._transformsCoroutine.isRunning)
		// 	this._transformsCoroutine.kill();

		// const startTime = GE.GameTime.realTimeSinceStartup;
		// let factor = 0;
		// const tween = new TWEEN.Tween()
		// this._transformsCoroutine = GE.Coroutine.newFromTween({
		// 	// stopOn: () => factor >= 1,
		// 	// onUpdate: () => {
		// 	// 	factor = Coroutine.calculateRemainingFactor(startTime, tweenTime);
		// 	// 	this._tweenedTransforms = SmoothLerper.instance.Transforms(startT, endT, factor);
		// 	// },
		// 	// onDelete: () => {
		// 	// 	this._tweenedTransforms = endT;
		// 	// },
		// });
		// this._transformsCoroutine.start();
	}
}
