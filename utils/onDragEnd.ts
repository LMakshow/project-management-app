import { DropResult } from 'react-beautiful-dnd';
import { ColumnOrderRequest, ColumnResponse, TaskOrderRequest, TaskResponse } from './interfaces';

const onDragEnd = async (
  result: DropResult,
  columns: ColumnResponse[],
  tasks: TaskResponse[],
  setColumns: (array: ColumnResponse[]) => void,
  changeColumnOrder: (arrayRequest: ColumnOrderRequest[]) => void,
  setTasks: (array: TaskResponse[]) => void,
  changeTaskOrder: (arrayRequest: TaskOrderRequest[]) => void,
) => {
  const { destination, source, type } = result;
  if (!destination || source.index === destination.index && source.droppableId === destination.droppableId) {
    return;
  }

  const spliceArray = (array: ColumnResponse[] | TaskResponse[], element: ColumnResponse | TaskResponse) => {
    array.splice(source.index, 1);
    array.splice(destination.index, 0, element);
  }

  const mapSortArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
    return array
      .map((item, index) => ({ ...item, order: index }))
      .sort((a, b) => a.order - b.order);
  }

  const mapArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
    return array.map((item, index) => ({ ...item, order: index }));
  }

  const sortArray: (array: ColumnResponse[] | TaskResponse[]) => ColumnResponse[] | TaskResponse[] = (array) => {
    return array.sort((a, b) => a.order - b.order);
  }

  const setTasksArrayForRequest: (array: TaskResponse[]) => TaskOrderRequest[] = (array) => {
    return array.map((task) => ({
      _id: task._id,
      order: task.order,
      columnId: task.columnId,
    }));
  }

  if (type === 'columns') {
    const items: ColumnResponse[] = [...columns];
    const element = items.find((item) => item._id === result.draggableId);

    if (!columns || !element || source.index === destination.index) {
      return;
    }

    spliceArray(items, element);
    const array: ColumnResponse[] = mapSortArray(items);
    const arrayRequest: ColumnOrderRequest[] = array
      .map((column) => ({ _id: column._id, order: column.order }));

    setColumns(array);
    await changeColumnOrder(arrayRequest);
  }

  if (type === 'tasks' && tasks?.length) {
    if (source.droppableId === destination.droppableId) {
      const currentColumnTasksArray: TaskResponse[] = [...tasks]
        .filter((task) => task.columnId === destination.droppableId);
      const otherColumnsTasksArray: TaskResponse[] = [...tasks]
        .filter((task) => task.columnId !== destination.droppableId) || [];

      const element = currentColumnTasksArray.find((item) => item._id === result.draggableId);

      if (!element) {
        return;
      }
      spliceArray(currentColumnTasksArray, element);

      const array: TaskResponse[] = sortArray([
        ...(mapArray(currentColumnTasksArray) as TaskResponse[]),
        ...otherColumnsTasksArray,
      ]) as TaskResponse[];

      setTasks(array);
      await changeTaskOrder(setTasksArrayForRequest(array));
    } else {
      const startColumnTasksArray: TaskResponse[] = [...tasks]
        .filter((task) => task.columnId === source.droppableId);
      const finishColumnTasksArray: TaskResponse[] = [...tasks]
        .filter((task) => task.columnId === destination.droppableId);
      const otherColumnTasksArray: TaskResponse[] = [...tasks]
        .filter((task) => (task.columnId !== destination.droppableId) && (task.columnId !== source.droppableId)) || [];

      const element = startColumnTasksArray.find((item) => item._id === result.draggableId);

      if (!element) {
        return;
      }

      startColumnTasksArray.splice(source.index, 1);

      finishColumnTasksArray.splice(destination.index, 0, {
        ...element,
        columnId: destination.droppableId,
      });

      const array: TaskResponse[] = sortArray([
        ...mapArray(startColumnTasksArray) || [],
        ...mapArray(finishColumnTasksArray),
        ...otherColumnTasksArray,
      ]) as TaskResponse[];

      setTasks(array);
      await changeTaskOrder(setTasksArrayForRequest(array));
    }
  }
}

export default onDragEnd;