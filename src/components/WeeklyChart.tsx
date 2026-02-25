interface Props {
  primary?: boolean;
}

const WeeklyCard = ({ primary }: Props) => {
  return (
    <div className={`card ${primary ? "primary" : ""}`}>
      <div className="balance">$5,756</div>
      <div>Card Holder: Eddy Cusuma</div>
      <div>3778 **** **** 1234</div>
    </div>
  );
};

export default WeeklyCard;