import { Draggable } from 'react-beautiful-dnd';
import { FaLock, FaTrashAlt, FaUnlock } from 'react-icons/fa';
import { useTheme } from 'styled-components';
import { Actions, ItemIngredient } from './styles';

interface TIngredientItem {
  ingredient: TIngredient;
  deleteIngredient: (ingredient: TIngredient) => void;
  toggleLockIngredient: (ingredient: TIngredient) => void;
  index: number;
}

const IngredientItem: React.FC<TIngredientItem> = ({
  ingredient,
  index,
  deleteIngredient,
  toggleLockIngredient,
}) => {
  const theme = useTheme();

  return (
    <Draggable key={ingredient.id} draggableId={ingredient.id} index={index}>
      {(provided, snapshot) => (
        <ItemIngredient
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={provided.draggableProps.style}
          isDragging={snapshot.isDragging}
        >
          {ingredient.name}
          <Actions>
            {ingredient.isLocked ? (
              <FaLock
                onClick={() => toggleLockIngredient(ingredient)}
                color={theme.yellow}
              />
            ) : (
              <FaUnlock
                onClick={() => toggleLockIngredient(ingredient)}
                color={theme.yellow}
              />
            )}
            <FaTrashAlt
              color={theme.red}
              onClick={() => deleteIngredient(ingredient)}
            />
          </Actions>
        </ItemIngredient>
      )}
    </Draggable>
  );
};

export default IngredientItem;
