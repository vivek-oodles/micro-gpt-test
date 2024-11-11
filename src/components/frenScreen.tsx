import React, { useState, useEffect } from "react";
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
import { useUserAPI } from "../hooks/useUserApi";
import { initUtils } from "@telegram-apps/sdk";


interface userProps {
  userData: any;
}

const FrenScreen: React.FC<userProps> = ({userData}) => {
  const [referredUser, setReferredUsers] = useState<any[]>([]);
    const { fetchRefferals } = useUserAPI(userData?.user.telegramId, userData?.user.token);

      const handleInviteFriend = () => {
        const utils = initUtils();
        const inviteLink = `https://t.me/micro_drop_bot?start=${userData?.user.telegramId}`;
        const shareText = `Participate in $MICRO Drop on telegram Now by playing our game here ${inviteLink}`;
        const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(
          inviteLink
        )}&text=${encodeURIComponent(shareText)}`;
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

  return (
    <Box color="white" minH="85vh" p={4}>
      {/* Key Counter */}
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
  );
};

// interface TaskItemProps {
//   title: string;
//   rewardAmount: number;
//   icon: string;
// }

// const TaskItem: React.FC<TaskItemProps> = ({
//   title,
//   rewardAmount,
//   icon,
// }) => {
//   return (
//     <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center">
//       <Box bg="purple.800" p={2} borderRadius="md" boxSize="50px" mr={4} />
//       <Flex justify="space-between" w="100%">
//         <Box>
//           <Text fontSize="lg" fontWeight="semibold">
//             {title}
//           </Text>
//           <Flex mt={1} alignItems="center">
//             <Image src={icon} alt="Coin" boxSize="20px" mr={2} />
//             <Text fontSize="md" mr={2}>
//               {rewardAmount.toLocaleString()}
//             </Text>
          
//           </Flex>
//         </Box>
//         <Icon as={FaChevronRight} />
//       </Flex>
//     </Flex>
//   );
// };

export default FrenScreen;
