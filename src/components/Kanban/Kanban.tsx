import "./Kanban.scss";
import { Section } from "../../type/section";
import { CardItem } from "../Card/Card";
import { DragDropContext, Draggable, DropResult, Droppable } from 'react-beautiful-dnd';

type Props = {
  data: Section[];
  setData: (data: Section[]) => void;
}

export const Kanban: React.FC<Props> = ({ data, setData }) => {

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const { source, destination } = result;
    
    if (source.droppableId !== destination.droppableId) {
      const sourceColIndex = data.findIndex((e) => e.id === source.droppableId);
      const destinationColIndex = data.findIndex((e) => e.id === destination.droppableId);
  
      const sourceCol = data[sourceColIndex];
      const destinationCol = data[destinationColIndex];
  
      const sourceTask = [...sourceCol.cards];
      const destinationTask = [...destinationCol.cards];
  
      const [removed] = sourceTask.splice(source.index, 1);
      destinationTask.splice(destination.index, 0, removed);
  
      data[sourceColIndex].cards = sourceTask;
      data[destinationColIndex].cards = destinationTask;
      
      console.log(data, 'KANBAN Column');

      setData(data);
    } else {
      const columnId = source.droppableId;
      const column = data.find((col) => col.id === columnId);
      
      if (column) {
        const newCards = Array.from(column.cards);
        const [removed] = newCards.splice(source.index, 1);
        newCards.splice(destination.index, 0, removed);

        const updatedColumn = { ...column, cards: newCards };
        const updatedData = data.map((col) =>
          col.id === columnId ? updatedColumn : col
        );
        setData(updatedData);
        console.log(columnId, column, newCards);
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="kanban">
        {data.map((section) => (
          <Droppable key={section.id} droppableId={section.id} isCombineEnabled={false}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                className="kanban__section"
                ref={provided.innerRef}
              >
                <div className="kanban__section--title">{section.title}</div>

                <div className="kanban__section--content">
                  {section.cards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={String(card.id)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            opacity: snapshot.isDragging ? "0,5" : "1",
                          }}
                        >
                          <CardItem card={card} key={card.id} />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};
