import { Dispatch, SetStateAction } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';

import IngredientItem from './IngredientItem';
import { ListIngredients } from './styles';

// const reorder = (list: any, startIndex: number, endIndex: number) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);

//   return result;
// };

const DragIngredients: React.FC<{
  ingredients: TIngredient[];
  setIngredients: Dispatch<SetStateAction<TIngredient[]>>;
}> = ({ ingredients, setIngredients }) => {
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    // const newItems = reorder(
    //   items,
    //   result.source.index,
    //   result.destination.index,
    // );

    // setItems(newItems);
  };

  const onDeleteIngredient = (ingredient: TIngredient) => {
    setIngredients((state) =>
      state.filter((value) => value.id !== ingredient.id),
    );
  };

  const toggleLockIngredient = (ingredient: TIngredient) => {
    setIngredients((state) =>
      state.map((value) => ({
        ...value,
        isLocked: value.id === ingredient.id ? !value.isLocked : value.isLocked,
      })),
    );
  };

  return (
    <DragDropContext
      onDragStart={() => console.log(`start`)}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <ListIngredients
            className="droppable"
            ref={provided.innerRef}
            isDraggingOver={snapshot.isDraggingOver}
            {...provided.droppableProps}
          >
            {ingredients.map((ingredient, index) => (
              <IngredientItem
                key={ingredient.id}
                ingredient={ingredient}
                index={index}
                deleteIngredient={onDeleteIngredient}
                toggleLockIngredient={toggleLockIngredient}
              />
            ))}
            {provided.placeholder}
          </ListIngredients>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragIngredients;
