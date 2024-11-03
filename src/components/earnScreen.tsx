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
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { TonConnectButton } from "@tonconnect/ui-react";


interface userProps {
  userData: any;
}

const EarnScreen: React.FC<userProps> = ({userData}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(userData)
  return (
    <Box minH={"85vh"} color="white" p={4}>
      {/* Key Counter */}
      <Stack align="center" mb={6}>
        <HStack>
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
          <TaskItem
            title="Join Channel"
            rewardAmount={2500}
            image={"/telegram.svg"}
          />
          {/* Task 2 */}
          <TaskItem
            title="Connect Wallet"
            rewardAmount={2500}
            image="/ton.svg"
            onClick={onOpen}
          />
          {/* Task 3 */}

          <TaskItem
            title="Follow on X"
            rewardAmount={2500}
            image="/twitter.svg"
          />
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

      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
 

          <DrawerBody >

            <Flex minH={"40vh"} direction={"column"} justifyContent={"center"} alignItems={'center'} gap={10}>
              <Text>Please connect your wallet below</Text>


              <TonConnectButton />

            </Flex>
           
           
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

interface TaskItemProps {
  title: string;
  rewardAmount: number;
  image: string
  onClick?: ()=> void
}

const TaskItem: React.FC<TaskItemProps> = ({ title, rewardAmount, image, onClick}) => {
  const isTwitterTask = title === "Follow on X"
  return (
    <>
      {isTwitterTask ? (
        <a href={"https://twitter.com/Micro_GPT"} target="_blank">
          <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center">
            <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
              <Image src={image} />
            </Box>
            <Flex justify="space-between" w="100%">
              <Box>
                <Text fontSize="lg" fontWeight="semibold">
                  {title}
                </Text>
                <Flex mt={1} alignItems="center">
                  <Image
                    src="./1067Coin.png"
                    alt="Coin"
                    boxSize="20px"
                    mr={2}
                  />
                  <Text fontSize="md" mr={2}>
                    {rewardAmount.toLocaleString()}
                  </Text>
                </Flex>
              </Box>
              <Icon as={FaChevronRight} />
            </Flex>
          </Flex>
        </a>
      ) : (
        <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center" onClick={onClick}>
          <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
            <Image src={image} />
          </Box>
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
              </Flex>
            </Box>
            <Icon as={FaChevronRight} />
          </Flex>
        </Flex>
      )}
    </>
  );
};

export default EarnScreen;
