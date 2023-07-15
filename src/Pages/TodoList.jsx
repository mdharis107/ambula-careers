import { CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Input,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const toast = useToast();

  // Load tasks from local storage
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTask === "") {
      toast({
        title: "Field cannot be empty",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }

    if (newTask.trim() !== "") {
      const task = { task: newTask, completed: false };
      setTasks([...tasks, task]);
      setNewTask("");

      // Animate new task
      task.animation = {
        scale: [0.5, 1],
        opacity: [0, 1],
      };
    }
  };

  const toggleTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const removeTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      addTask();
    }
  };

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <>
      <Box
        maxWidth="500px"
        mx="auto"
        my={8}
        p={4}
        borderRadius="md"
        boxShadow="lg"
      >
        <Heading mb={4} textAlign="center">
          To-Do List
        </Heading>
        <Stack spacing={4}>
          <Flex>
            <Input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add a new task"
              size="md"
              autoFocus
            />
            <IconButton
              ml={2}
              colorScheme="teal"
              aria-label="Add Task"
              icon={<CheckIcon />}
              onClick={addTask}
            />
          </Flex>

          <Flex justifyContent={"space-evenly"} alignItems={"center"}>
            <Badge colorScheme="purple"> Total Tasks: {tasks.length} </Badge>
            {completedTasks.length != 0 && (
              <Badge colorScheme="green">
                Completed : {completedTasks.length}
              </Badge>
            )}

            {tasks.length - completedTasks.length != 0 && (
              <Badge colorScheme="red">
                Pending : {tasks.length - completedTasks.length}
              </Badge>
            )}
          </Flex>

          <Divider />

          {tasks.map((task, index) => (
            <motion.div
              key={index}
              //   initial={task.animation ? "hidden" : ""}
              //   animate={task.animation ? "visible" : ""}
              initial={{ opacity: 0, x: "-100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              //   exit={{ opacity: 0, x: "100%" }}
              variants={{
                hidden: { opacity: 0, y: -20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.3 }}
              onAnimationComplete={() => {
                const updatedTasks = [...tasks];
                delete updatedTasks[index].animation;
                setTasks(updatedTasks);
              }}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                boxShadow={
                  "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px"
                }
                p={1}
                borderRadius={"lg"}
                bgColor={task.completed ? "green.400" : "none"}
              >
                <Text
                  textDecoration={task.completed ? "line-through" : "none"}
                  color={task.completed ? "white" : "black"}
                  flex={1}
                >
                  {task.task}
                </Text>
                <IconButton
                  ml={2}
                  colorScheme="red"
                  aria-label="Remove Task"
                  icon={<DeleteIcon />}
                  onClick={() => removeTask(index)}
                />
                <IconButton
                  ml={2}
                  colorScheme="green"
                  aria-label="Toggle Task"
                  icon={<CheckIcon />}
                  onClick={() => toggleTask(index)}
                />
              </Flex>
            </motion.div>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default TodoList;
