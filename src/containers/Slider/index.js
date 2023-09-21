import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
  // Modification du sens de tri des événements par date*************
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );
  const nextCard = () => {
    // Ajout d'une vérification pour s'assurer que byDateDesc n'est pas undefined********
        if (byDateDesc !== undefined) {
    setTimeout(
      // Ajout d'un -1 pour éviter de dépasser la limite de la longueur du tableau********
      () => setIndex(index < byDateDesc.length - 1 ? index + 1 : 0),
      5000
    );
    }
  };
  // Utilisation de useEffect pour lancer la fonction nextCard lorsque le composant est monté
  useEffect(() => {
    nextCard();
  });
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // maitre le key dans le div globale 
        <div key={event.title }>
          <div
            
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
            }`}
          >

            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {/* Boucle à travers chaque élément pour la pagination */}
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${_.id}`} // Utilisez _.id 
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  readOnly
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
