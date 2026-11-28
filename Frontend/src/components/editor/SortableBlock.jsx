import { GripVertical } from 'lucide-react';
import { useSortable } from '@dnd-kit/react/sortable';
import { supportedBlockTypes } from './portfolioBlockState.js';

const isSortableBlock = (block) => block
  && typeof block === 'object'
  && typeof block.id === 'string'
  && block.id.trim().length > 0
  && supportedBlockTypes.includes(block.type);

export default function SortableBlock({ block, index = 0, selected = false, disabled = false, onSelect, children }) {
  const sortable = isSortableBlock(block);
  const sortableId = sortable ? block.id : `non-sortable-${index}`;
  const sortingDisabled = disabled || !sortable;
  const { ref, handleRef, isDragging, isDropTarget } = useSortable({
    id: sortableId,
    index,
    disabled: sortingDisabled,
    data: sortable ? { id: block.id, type: block.type } : undefined,
  });

  const selectBlock = () => {
    if (sortable) onSelect?.(block.id);
  };
  const label = sortable ? `Reorder ${block.type} block` : 'Reordering unavailable for this block';

  return <div
    ref={ref}
    className={`sortable-block${selected ? ' is-selected' : ''}${isDragging ? ' is-dragging' : ''}${isDropTarget ? ' is-drop-target' : ''}${sortingDisabled ? ' is-disabled' : ''}`}
    data-sortable-id={sortable ? block.id : undefined}
    aria-disabled={sortingDisabled || undefined}
    onClick={selectBlock}
  >
    <button
      ref={handleRef}
      type="button"
      className="sortable-block-handle"
      data-sortable-handle
      aria-label={label}
      title={label}
      disabled={sortingDisabled}
      onClick={(event) => {
        event.stopPropagation();
        selectBlock();
      }}
      onPointerDown={(event) => {
        if (!sortingDisabled) event.stopPropagation();
      }}
    >
      <GripVertical size={15} aria-hidden="true" />
    </button>
    <div className="sortable-block-content">{children}</div>
  </div>;
}
