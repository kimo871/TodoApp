/** Import  */
import { useMemo, useRef, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import EMPTY_STATE_IMAGE from '../../assets/empty_tasks_placeholder.png';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import TaskCard from './TaskCard';
import TaskModal from 'components/modals/TaskModal';
/** End of Import  */

/** TaskList Component */
export default function TaskList() {
  const createSheetRef = useRef(null);
  const [tasks, setTasks] = useState([{ title: 'task12', description: 'ddd', completed: false }]);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [editingTaskIndex, setEditingTaskIndex] = useState<number | null>(null);
  /** Memorized-Computed tasks based on filtering and search */
  const filteredTasks = useMemo(() => {
    return tasks;
  }, [tasks]);

  const openCreateTaskBottomSheet = () => {
    console.log('Opening bottom sheet...');
    createSheetRef?.current?.present(); // Open the bottom sheet
  };

  const closeCreateTaskBottomSheet = () => {
    createSheetRef?.current?.dismiss(); // Close the bottom sheet
  };

  // handle create task
  const handleCreateTask = (task: { title: string; description: string }) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  // handle open task in modal for edit
  const handleOpenTaskInModal = (task: { title: string; description: string }, index: number) => {
    setModalMode('edit');
    setEditingTaskIndex(index);
    createSheetRef?.current?.present(); // Open the bottom sheet
  };

  // handle task for edit
  const handleEditTask = (task: { title: string; description: string }) => {
    if (editingTaskIndex === null) return;

    setTasks((prevTasks) => {
      const updatedTasks = [...prevTasks];
      updatedTasks[editingTaskIndex] = task;
      return updatedTasks;
    });
  };

  return (
    <View className="relative" style={{ flex: 1 }}>
      {tasks?.length > 0 ? (
        <ScrollView contentContainerClassName="pb-20" className="flex-1 rounded-3xl py-6">
          {tasks.map((task, index) => (
            <TaskCard
              onEdit={handleOpenTaskInModal}
              setTasks={setTasks}
              index={index}
              key={index}
              task={task}
            />
          ))}
        </ScrollView>
      ) : (
        <View className="relative flex-1 items-center justify-center">
          <View className="mb-20 gap-2">
            <Image source={EMPTY_STATE_IMAGE} className="m-auto h-40 w-60" />
            <Text className="m-auto max-w-[160px] font-poppins-regular text-gray-500">
              Your to-do list is empty. Create a task to begin.
            </Text>
          </View>
          <View className="absolute bottom-3 w-full px-4">
            <TouchableOpacity
              onPress={() => {
                setModalMode('create');
                openCreateTaskBottomSheet();
              }}
              className="flex w-full items-center rounded-xl bg-[#0155B6] p-3">
              <Text className="my-auto text-center font-poppins-semibold text-white">
                Create your first task
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {tasks?.length > 0 && (
        <View className="absolute bottom-2 right-2">
          <TouchableOpacity
            onPress={() => {
              setModalMode('create');
              openCreateTaskBottomSheet();
            }}
            className="rounded-full bg-[#0155B6] p-4 shadow-lg shadow-gray-300">
            <FontAwesomeIcon icon={faPlus} color={'white'} size={20} />
          </TouchableOpacity>
        </View>
      )}

      <TaskModal
        sheetRef={createSheetRef}
        onClose={closeCreateTaskBottomSheet}
        onSubmit={modalMode === 'create' ? handleCreateTask : handleEditTask}
        mode={modalMode}
        initialData={
          modalMode === 'edit' && editingTaskIndex !== null ? tasks[editingTaskIndex] : undefined
        }
      />
    </View>
  );
}

