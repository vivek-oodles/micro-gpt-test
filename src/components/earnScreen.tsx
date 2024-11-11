import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Stack,
  Spacer,
  Icon,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FaChevronRight } from "react-icons/fa";
import { TonConnectButton } from "@tonconnect/ui-react";
import { initUtils } from "@telegram-apps/sdk";
import { useUserAPI } from "../hooks/useUserApi";


interface userProps {
  userData: any;
}

const EarnScreen: React.FC<userProps> = ({userData}) => {
  const [referredUser, setReferredUsers] = useState<any[]>([]);
  const { fetchRefferals } = useUserAPI(userData?.user.telegramId, userData?.user.token);

  const handleInviteFriend = () => {
    const utils = initUtils();
    const inviteLink = `https://t.me/micro_drop_bot?start=${userData?.user.telegramId}`;
    const shareText = `Participate in $MICRO Drop on telegram Now by playing our game here: ${inviteLink}`;
    const fullUrl = `https://t.me/share/url?text=${encodeURIComponent(shareText)}`;
    utils.openTelegramLink(fullUrl);
  };


  useEffect(() => {
    const fetchRef = async () => {
      const refUsers = await fetchRefferals();
      console.log("ref users from ref page", refUsers);
      setReferredUsers(refUsers.referredUsers || []);
    };

    if (userData) {
      fetchRef();
    }
  }, [userData]);

  console.log(referredUser);

 
  console.log(userData)
  return (
    <>
    <Box minH={"85vh"} color="white" p={4}>
      {/* Key Counter */}
      <Stack align="center" mb={6}>
        <HStack>
        <Box position="relative" display="flex">
        <Image 
        width="92px"
        height="92px"
        top="120px"
        marginRight="-7"
        left="170px"
        gap="0px"
        opacity="0px"
         transform="rotate(240.69deg)"
        src="key.png" />

          <Text fontSize="4xl" fontWeight="bold" 
          right="20px"
          height="px"
          marginTop="7"
          top="px"
          width="50px"
          left="99px"
          gap="0px"
          opacity="0px"
          >
            0
          </Text>
          </Box>
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
      <Box  color="white" minH="85vh" marginTop={5} >
        {/* <Text fontSize="xl" fontWeight="bold" mb={1}>
          Extra Tasks
        </Text> */}
        {/* Add extra tasks here if needed */}
        <Stack align="center" mb={6}>
        <Text fontSize="lg" fontWeight="semibold">
          Total Rewards
        </Text>
        <Text fontSize="4xl" fontWeight="bold">
          {userData && userData.user.coins}
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
          <Flex
            bg="purple.700"
            p={4}
            borderRadius="md"
            alignItems="center"
            onClick={handleInviteFriend}
          >
            <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
              <Image src={"/telegram.svg"} />
            </Box>
            <Flex justify="space-between" w="100%">
              <Box>
                <Text fontSize="lg" fontWeight="semibold">
                  Invite Fren 
                </Text>
                <Flex mt={1} alignItems="center">
                  <Image src="/1067Coin.png" alt="Coin" boxSize="20px" mr={2} />
                  <Text fontSize="md" mr={2}>
                    2500
                  </Text>
                  <Image src="/key.png" alt="Key" boxSize="20px" ml={2} />
                  <Text fontSize="md">2</Text>
                </Flex>
              </Box>
              <Icon as={FaChevronRight} />
            </Flex>
          </Flex>

          <Flex
            bg="linear-gradient(0deg, #4C49FF 0%, #8281E9 100%);
"
            p={4}
            borderRadius="md"
            alignItems="center"
            onClick={handleInviteFriend}
          >
            <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
              <Image src={"/telegram.svg"} />
            </Box>
            <Flex justify="space-between" w="100%">
              <Box>
                <Text fontSize="lg" fontWeight="semibold">
                 Intivte Fren with Telegram Premium
                </Text>
                <Flex mt={1} alignItems="center">
                  <Image src="/1067Coin.png" alt="Coin" boxSize="20px" mr={2} />
                  <Text fontSize="md" mr={2}>
                    2500
                  </Text>
                  <Image src="/key.png" alt="Key" boxSize="20px" ml={2} />
                  <Text fontSize="md">2</Text>
                </Flex>
              </Box>
              <Icon as={FaChevronRight} />
            </Flex>
          </Flex>
        </Stack>
      </Box>

      {/* Extra Tasks */}
      <Box>
        <Text fontSize="xl" fontWeight="bold" mb={1}>
        Intive for Extra Rewards
        </Text>
        {/* Task 3 */}
        {/* <TaskItem rewardAmount={100} title="Follow on X" icon="/twitter.svg" /> */}
        <Flex
            bg="purple.700"
            p={4}
            borderRadius="md"
            alignItems="center"
            onClick={handleInviteFriend}
          >
            <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
              <Image src={"/twitter.svg"} />
            </Box>
            <Flex justify="space-between" w="100%">
              <Box>
                <Text fontSize="lg" fontWeight="semibold">
                 Follow on X
                </Text>
                <Flex mt={1} alignItems="center">
                  <Image src="/1067Coin.png" alt="Coin" boxSize="20px" mr={2} />
                  <Text fontSize="md" mr={2}>
                    2500
                  </Text>
                  <Image src="/key.png" alt="Key" boxSize="20px" ml={2} />
                  <Text fontSize="md">2</Text>
                </Flex>
              </Box>
              <Icon as={FaChevronRight} />
            </Flex>
          </Flex>
      </Box>

      <Spacer />
      <Flex align="center" justify="center" p={5} onClick={handleInviteFriend}>
        <Button rounded={"full"} bg="#4C49FF" color="#fff">
          Send Invite
        </Button> 
      </Flex>
      </Box>

      {/* <Spacer /> */}


    </Box>

    </>
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
  const isWalletTask = title === "Connect Wallet"
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
      ) : isWalletTask ? (
        <Flex
          bg="purple.700"
          p={4}
          borderRadius="md"
          alignItems="center"
          onClick={onClick}
        >
          <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4}>
            <Image src={image} />
          </Box>
          <Flex justify="space-between" w="100%">
            <Box>
              <TonConnectButton />
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
      ) : (
        <a href="https://t.me/micro_gpt" target="_blank">
          <Flex
            bg="purple.700"
            p={4}
            borderRadius="md"
            alignItems="center"
            onClick={onClick}
          >
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
      )}
    </>
  );
};

export default EarnScreen;
