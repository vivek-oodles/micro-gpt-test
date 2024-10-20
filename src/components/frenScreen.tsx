import React from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Spacer,
  Icon,
  Button,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";

const FrenScreen: React.FC = () => {
  return (
    <Box
      bgGradient="linear(to-b, gray.900, purple.900)"
      color="white"
      minH="100vh"
      p={4}
    >
      {/* Key Counter */}
      <Stack align="center" mb={6}>
        <Text fontSize="lg" fontWeight="semibold">
          Total Rewards
        </Text>
        <Text fontSize="4xl" fontWeight="bold">
          5
        </Text>
        <Image
          src="./prize.png" // Replace with the actual prize icon URL
          alt="Prize Icon"
          boxSize="100px"
        />
      </Stack>

      {/* Task List - Official */}
      <Box mb={4}>
        <Text fontSize="xl" fontWeight="bold" mb={3}>
          Invite to get bonuses
        </Text>
        <Stack spacing={3}>
          {/* Task 1 */}
          <TaskItem
            title="Invite Fren"
            rewardAmount={2500}
            keys={2}
            icon="./1067Coin.png"
          />
          {/* Task 2 */}
          <TaskItem
            title="Fren with Telegram Premium"
            rewardAmount={2500}
            keys={2}
            icon="./1067Coin.png"
          />
        </Stack>
      </Box>

      {/* Extra Tasks */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={1}>
          Extra Tasks
        </Text>
        {/* Task 3 */}
        <TaskItem
          title="Follow on X"
          rewardAmount={2500}
          keys={2}
          icon="./1067Coin.png"
        />
      </Box>

      <Spacer />
      <Flex align="center" justify="center" p={5}>
        <Button rounded={"full"} bg="#4C49FF" color="#fff">
          Send Invite
        </Button>
      </Flex>
    </Box>
  );
};

interface TaskItemProps {
  title: string;
  rewardAmount: number;
  keys: number;
  icon: string;
}

const TaskItem: React.FC<TaskItemProps> = ({
  title,
  rewardAmount,
  keys,
  icon,
}) => {
  return (
    <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center">
      <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4} />
      <Flex justify="space-between" w="100%">
        <Box>
          <Text fontSize="lg" fontWeight="semibold">
            {title}
          </Text>
          <Flex mt={1} alignItems="center">
            <Image src={icon} alt="Coin" boxSize="20px" mr={2} />
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

export default FrenScreen;
