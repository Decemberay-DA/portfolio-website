import type { IGame } from "../IDinamicUpdate/IDinamicUpdates/IGame/IGame";
import type { IGameBounded } from "./IGameBounded";

export class IGameBoundedB {
	static readonly new = (game: IGame): IGameBounded => ({
		parentGame: game,
	});
}
