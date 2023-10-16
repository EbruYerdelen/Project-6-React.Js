export default function Die(props) {
  return (
    <div
      className={props.isHeld ? "dies-clicked" : "dies"}
      onClick={() => props.clickDice(props.idName)}
    >
      <h2>{props.value}</h2>
    </div>
  );
}
