
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
    <div className="card bg-light border-dark mb-0" >
      <div className="card-header">{card.title}</div>
      <div className="card-body">

      <div className="card__info">
        <div className="card__number">{`#${card.number}`}</div>
        <div className="card__status">{card.state}</div>
        <div className="card_update">
          {`${calculateDateDifferent(card.created_at)} days ago`}
        </div>
      </div>

      <div className="card__info">
        <div className="card__type">{card.user.type}</div>
        <span>|</span>
        <div className="card__comments">{`Comments: ${card.comments}`}</div>
      </div>

      </div>
     


    </div>
  );
};
