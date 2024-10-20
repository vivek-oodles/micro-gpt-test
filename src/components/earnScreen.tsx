import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Spacer,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const EarnScreen: React.FC = () => {
  return (
    <Box
      minH={"87vh"}
      bgGradient="linear(to-b, gray.900, purple.900)"
      color="white"
      p={4}
    >
      {/* Key Counter */}
      <Stack align="center" mb={6}>
        <HStack>
          <Image
            src="./key.png" // Replace with the actual key icon URL
            alt="Key Icon"
            boxSize="80px"
          />
          <Text fontSize="4xl" fontWeight="bold">
            0
          </Text>
        </HStack>

        <Text fontSize="lg" fontWeight="semibold">
          More Tasks, More Rewards
        </Text>
      </Stack>

      {/* Task List - Official */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Official
        </Text>
        <Stack spacing={3}>
          {/* Task 1 */}
          <TaskItem title="Join Channel" rewardAmount={2500} keys={2} />
          {/* Task 2 */}
          <TaskItem title="Connect Wallet" rewardAmount={2500} keys={2} />
          {/* Task 3 */}
          <TaskItem title="Follow on X" rewardAmount={2500} keys={2} />
        </Stack>
      </Box>

      {/* Extra Tasks */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={1}>
          Extra Tasks
        </Text>
        {/* Add extra tasks here if needed */}
      </Box>

      <Spacer />
    </Box>
  );
};

interface TaskItemProps {
  title: string;
  rewardAmount: number;
  keys: number;
}

const TaskItem: React.FC<TaskItemProps> = ({ title, rewardAmount, keys }) => {
  return (
    <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center">
      <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}></Box>
      <Flex justify="space-between" w="100%">
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Flex mt={1} alignItems="center">
            <Image src="./1067Coin.png" alt="Coin" boxSize="20px" mr={2} />
            <Text fontSize="md" mr={2}>
              {rewardAmount.toLocaleString()}
            </Text>
            <Image src="./key.png" alt="Key" boxSize="20px" ml={2} />
            <Text fontSize="md">{keys}</Text>
          </Flex>
        </Box>
        <Icon as={FaChevronRight} />
      </Flex>
    </Flex>
  );
};

export default EarnScreen;
