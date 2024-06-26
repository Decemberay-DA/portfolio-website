import type { Tween } from "@tweenjs/tween.js";
import { pipe } from "fp-ts/lib/function";
import { IDinamicUpdateB } from "../ADTs/IDinamicUpdate/IDinamicUpdateB";
import type { IDinamicUpdates } from "../ADTs/IDinamicUpdates/IDinamicUpdates";
import { IDinamicObjectB } from "../ADTs/IDinamicObject/builders";
import { IDinamicUpdatesH } from "../ADTs/IDinamicUpdates/IDinamicUpdatesH";
import { IURIB } from "../ADTs/_IURI___/IURIB";
import { IDB } from "../ADTs/ID___/builders";
import { MixinB } from "../ADTs/Utils/MixinB";
import { IDinamicObjectH } from "../ADTs/IDinamicObject/IDinamicObjectH";
import { ITimeMomentB } from "../ADTs/ITimeMoment/ITimeMomentB";
import { IDinamicUpdatesB } from "../ADTs/IDinamicUpdates/IDinamicUpdatesB";

/**
 *
 */
export interface ICoroutine<T extends Record<string, any>> {
	/**
	 * managed tween of this coroutine
	 */
	readonly _tween: Tween<T>;
}

/**
 *
 */
export class ICoroutineH {
	static URI = "ICoroutine";
}

/**
 *
 */
export class ICoroutineB {
	/**
	 * creates tween wrapped in executable env and launches it on coroutineGame
	 */
	static newFromTween =
		<G extends IDinamicUpdates>(executor: G) =>
		<T extends Record<string, any>>(tween: Tween<T>, onComplete: (object: T) => void = () => {}) => {
			// omg this hack is just crazy
			let currentTimeHack = () => ITimeMomentB.new(0);

			tween.start();
			tween.onComplete((params) => {
				onComplete(params);
				IDB.cloneSelfFrom(coroutiner)(
					IDinamicObjectH.newDeleteParented(currentTimeHack())(coroutiner.self)
				);
			});

			const coroutiner = pipe(
				{
					onStart(time) {
						currentTimeHack = () => time;
						tween.start(time.sinceStart);
					},
					onFrameUpdate(time) {
						currentTimeHack = () => time;
						tween.update(time.sinceStart);
					},
					onDelete(time) {
						currentTimeHack = () => time;
						console.error("Coroutine was deleted");
					},
				},
				IDinamicUpdateB.new,
				IDinamicObjectB.new,
				IDinamicUpdatesH.newInsertedAndParented(executor),
				MixinB.newWith<ICoroutine<T>>({
					_tween: tween,
				}),
				IURIB.newImprinted(ICoroutineH.URI),
				IURIB.newImprinted("RootGame"),
				IDB.new
			);

			return coroutiner;
		};

	/**
	 *
	 */
	static newFromTweenAsGameRoot = <T extends Record<string, any>>(
		tween: Tween<T>,
		onComplete: (object: T) => void = () => {}
	) => {
		// omg this hack is just crazy
		let currentTimeHack = () => ITimeMomentB.newPerformanceNow();

		tween.start(performance.now());
		tween.onComplete((params) => {
			onComplete(params);
			console.error("Coroutine was COMPLETED ==========");
			IDB.cloneSelfFrom(coroutiner)(IDinamicObjectH.newDelete(currentTimeHack())(coroutiner.self));
		});

		const coroutiner = pipe(
			{
				onStart(time) {
					currentTimeHack = () => time;
					tween.start(performance.now());
					console.warn("Coroutine was started");
				},
				onFrameUpdate(time) {
					currentTimeHack = () => time;
					tween.update(performance.now());
					console.warn("Coroutine was updated");
				},
				onDelete(time) {
					currentTimeHack = () => time;
					console.error("Coroutine was deleted");
				},
			},
			IDinamicUpdateB.new,
			IDinamicObjectB.newRootSelfUpdating,
			MixinB.newWith<ICoroutine<T>>({
				_tween: tween,
			}),
			IURIB.newImprinted(ICoroutineH.URI),
			IURIB.newImprinted("RootGame"),
			IDB.new
		);

		return coroutiner;
	};
}
