import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  // Filtrage initial des événements en fonction du type************
  const filteredEventsByType = (
    (!type
      ? data?.events
      : data?.events.filter((event) => event.type === type)) || []
  );
   // Filtrage des événements en fonction de la page actuelle (pagination)*************
   const filteredEvents = filteredEventsByType.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );
  // Fonction pour changer le type d'événement sélectionné
  const changeType = (evtType) => {
    // Réinitialiser la page actuelle à 1 lorsque le type change
    setCurrentPage(1);
    // Mettre à jour le type d'événement sélectionné
    setType(evtType);
  };
  // Calcul du nombre de pages en fonction du nombre total d'événements
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  // Obtention de la liste des types d'événements uniques
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
