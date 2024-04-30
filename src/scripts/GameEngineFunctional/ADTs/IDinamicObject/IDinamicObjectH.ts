import type { ITimeMoment } from "../ITimeMoment/ITimeMoment";
import { array, option } from "fp-ts";
import { pipe } from "fp-ts/lib/function";
import type { IDinamicUpdate } from "../IDinamicUpdate/IDinamicUpdate";
import type { IParented } from "../IParented/IParented";
import { type IEnableable } from "../IEnableable/IEnableable";
import { IEnableableH } from "../IEnableable/IEnableableH";
import { Bro } from "../../FunctionalBroH";
import type { IDinamicUpdates } from "../IDinamicUpdates/IDinamicUpdates";
import type { IDinamicObject } from "./IDinamicObject";
import { IDinamicUpdatesH } from "../IDinamicUpdates/IDinamicUpdatesH";
import { IURIB } from "../_IURI/IURIB";
import { IParentedH } from "../IParented/IParentedH";

/**
 *
 */
export class IDinamicObjectH {
	static readonly URI = "DinamicObject";

	static readonly start =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicObject>(obj: A): A => {
			return pipe(
				obj,
				IEnableableH.executeIfEnabled(() => {
					obj.onStart(time);
					obj._isStarted = true;
				}),
				Bro.meanwhile((bro) => console.log("started: " + bro))
			);
		};
	static readonly tryStart =
		<T extends ITimeMoment>(time: T) =>
		<A extends object>(obj: A): A => {
			// the worst typescript i have ever wrote
			// i am expecting bug here
			if ("onStart" in obj === false) return obj;
			return pipe(
				obj as any as IDinamicObject,
				option.fromNullable,
				option.match(
					() => obj,
					(casted) => IDinamicObjectH.start(time)(casted) as A
				)
			);
		};

	static readonly frameUpdate =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicObject>(obj: A): A => {
			return pipe(
				obj,
				// BroH.logThisOnePLZ,
				IEnableableH.executeIfEnabled(() => obj.onFrameUpdate(time))
				// BroH.meanwhile((bro) => console.log("meanwhiled " + bro))
				// SedeffectsH.doIf((obj) => console.log(obj))((obj) => true)
				// SedeffectsH.doIf((obj)=>obj.)
			);
		};

	static readonly newDelete =
		<T extends ITimeMoment>(time: T) =>
		<A extends IDinamicObject>(obj: A): A => {
			return pipe(
				obj,
				(x) => {
					x.onDelete(time);
					x._isDeleted = true;
					return x;
				},
				IEnableableH.disable,
				IURIB.newErrazed(IParentedH.URI)
			);
		};
	static readonly newDeleteParented =
		<T extends ITimeMoment>(time: T) =>
		<C, A extends IDinamicObject & IParented<C>>(obj: A): A => {
			return pipe(
				obj,
				IDinamicObjectH.newDelete(time),
				IDinamicUpdatesH.tryRemoveAndUnParent(obj.parent),
				IURIB.newErrazed(IParentedH.URI)
			);
		};
}
