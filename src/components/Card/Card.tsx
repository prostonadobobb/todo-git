
import { Card } from "../../type/card";
import "./Card.scss";



interface Props {
  card: Card,
}

export const CardItem: React.FC<Props> = ({ card }) => {
 
  function calculateDateDifferent(dateCreated: string) {
    const createdAt = new Date(dateCreated);
    const currentDate = new Date();

    const differenceInMilliseconds =
      currentDate.getTime() - createdAt.getTime();
    const differenceInDays = Math.floor(
      differenceInMilliseconds / (1000 * 3600 * 24)
    );

    return differenceInDays;
  }

  return (
    <div className="card" >
      <div className="card__row">
        <div className="card__number">{`#${card.number}`}</div>
        <div className="card__status">{card.state}</div>
        <div className="card_update">
          {`${calculateDateDifferent(card.created_at)} days ago`}
        </div>
      </div>

      <div className="card__row">
        <div className="card__type">{card.user.type}</div>
        <span>|</span>
        <div className="card__comments">{`Comments: ${card.comments}`}</div>
      </div>
    </div>
  );
};
