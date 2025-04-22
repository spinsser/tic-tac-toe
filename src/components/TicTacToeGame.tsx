import { TicTacToe, TTicTacToe, TTile } from '../model/game';

export default function TicTacToeGame({
  game,
  setGame,
}: {
  game: TTicTacToe;
  setGame: React.Dispatch<React.SetStateAction<TicTacToe>>;
}) {
  return (
    <>
      <span>
        {game.isLive()
          ? `${game.turn}'s Turn`
          : game.gameState === 'tie'
          ? 'Tie'
          : `${game.gameState} Won!`}
      </span>
      <div className="game">
        {game.gameMap.map((_: TTile[], idx: number) => {
          return (
            <TicTacToeRow
              key={idx}
              rowIdx={idx}
              game={game}
              setGame={setGame}
            />
          );
        })}
      </div>
      <button
        onClick={() => {
          setGame(new TicTacToe({} as TTicTacToe));
        }}
      >
        Start a new Game
      </button>{' '}
    </>
  );
}

function TicTacToeRow({
  rowIdx,
  game,
  setGame,
}: {
  rowIdx: number;
  game: TicTacToe;
  setGame: React.Dispatch<React.SetStateAction<TicTacToe>>;
}) {
  return (
    <>
      <div className="row">
        {game.gameMap[rowIdx].map((cell: TTile, idx: number) => {
          return (
            <button
              className="cell"
              key={idx}
              onClick={() => {
                setGame(game.play(rowIdx, idx));
              }}
              disabled={!game.isLive() || game.gameMap[rowIdx][idx] !== ''}
            >
              {cell}
            </button>
          );
        })}
      </div>
    </>
  );
}
