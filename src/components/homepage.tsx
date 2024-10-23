import React, { useState } from "react";
import {
  Box,
  Flex,
  IconButton,
  Image,
  Progress,
  Button,
  Text,
  Stack,
  Spacer,
  VStack,
  HStack,
  Circle,
  Icon,
} from "@chakra-ui/react";
import { FaHome, FaTrophy, FaUserFriends } from "react-icons/fa";
import { FaChartSimple } from "react-icons/fa6";
import { GiFireAxe } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
import { HiOutlineBolt } from "react-icons/hi2";
import { BiWorld } from "react-icons/bi";
import { CiCalendar } from "react-icons/ci";
import { RxRocket } from "react-icons/rx";
import EarnScreen from "./earnScreen";
import RankScreen from "./rankScreen";
import FrenScreen from "./frenScreen";

// Define the types for components
const Home: React.FC = () => <></>;
const Earn: React.FC = () => <EarnScreen />;
const Mine: React.FC = () => <Text></Text>;
const Rank: React.FC = () => <RankScreen />;
const Frens: React.FC = () => <FrenScreen />;

type MenuItem = {
  icon: React.ElementType;
  label: string;
  key: string;
  component: React.FC;
};
const HomePage = () => {
  const [activePage, setActivePage] = useState<string>("home");

  const menuItems: MenuItem[] = [
    { icon: FaHome, label: "HOME", key: "home", component: Home },
    { icon: HiOutlineSparkles, label: "EARN", key: "earn", component: Earn },
    { icon: GiFireAxe, label: "MINE", key: "mine", component: Mine },
    { icon: FaTrophy, label: "RANK", key: "rank", component: Rank },
    {
      icon: FaUserFriends,
      label: "FRENS",
      key: "frens",
      component: Frens,
    },
  ];

  const renderContent = (): JSX.Element => {
    const ActiveComponent =
      menuItems.find((item) => item.key === activePage)?.component || Home;
    return <ActiveComponent />;
  };

  return (
    <>
      <Box
        bgGradient="linear(to-b, gray.900, purple.900)"
        p={4}
        color="white"
        h={"auto"}
        minH="100vh"
        display="flex"
        flexDirection="column"
      >
        <VStack></VStack>
        {activePage === "home" && (
          <>
            <Flex
              justifyContent="center"
              alignItems="center"
              py={2}
              borderColor={"linear(to-r, purple.600, orange.400)"}
              borderRadius="full"
              mb={4}
              gap={1}
            >
              <Circle
                size="40px"
                bg={"#7371FC99"}
                border={"1px solid"}
                as="button"
              >
                <IconButton
                  icon={<FaChartSimple />}
                  aria-label="Home"
                  colorScheme="#CDC1FF"
                  variant="ghost"
                  boxSize={5}
                />
              </Circle>

              <HStack
                mx={5}
                border={"2px solid"}
                borderColor={"linear(to-r, purple.600, orange.400)"}
                px={3}
                py={2}
                borderRadius="full"
              >
                <Text fontSize="xs">Airdrop</Text>
                <Image src="./1067Coin.png" alt="Coin" boxSize="20px" />
                <Text fontSize="xs">540,000,000 $MICRO</Text>
              </HStack>
              <Circle
                size="40px"
                bg={"#7371FC99"}
                border={"1px solid"}
                as="button"
              >
                <IconButton
                  icon={<BiWorld />}
                  aria-label="World"
                  colorScheme="#CDC1FF"
                  variant="ghost"
                  boxSize={5}
                />
              </Circle>
            </Flex>

            <Stack align="center" spacing={6} mb={6}>
              <Flex alignItems="center" justifyContent="center">
                <Image
                  src="./1067Coin.png" // Replace with actual coin icon URL
                  alt="Coin Icon"
                  boxSize="50px"
                />
                <Text fontSize="6xl" fontWeight="bold" mx={4}>
                  1,067
                </Text>
              </Flex>

              <Flex justify="space-around" w="80%" maxW="400px">
                <Image src="./coinStack.png" alt="Coins Stack" />
              </Flex>
            </Stack>

            <HStack w="full" spacing={5} align="center" justify="space-between">
              {/* Progress Bar Section */}
              <Box w="50%">
                <HStack mb={2}>
                  <Icon as={HiOutlineBolt} color="yellow.400" />
                  <Text color="white" fontSize="md" fontWeight={"bold"}>
                    1000/1000
                  </Text>
                </HStack>
                <Progress
                  value={100}
                  h="2.5"
                  borderRadius="full"
                  bgColor="purple.900"
                  sx={{
                    "& > div": {
                      background: "linear-gradient(to right, #ec4899, #a855f7)",
                    },
                  }}
                />
              </Box>

              {/* Action Buttons */}
              <HStack spacing={4}>
                <VStack>
                  <Button
                    flex={1}
                    h="auto"
                    py={2}
                    bgColor="#7371FC99"
                    _hover={{ bg: "#CDC1FF80" }}
                    color="white"
                    flexDir="column"
                  >
                    <Icon as={CiCalendar} boxSize={6} />
                  </Button>
                  <Text fontSize="xs">Daily Login</Text>
                </VStack>
                <VStack>
                  <Button
                    flex={1}
                    h="auto"
                    py={2}
                    bgColor="#7371FC99"
                    _hover={{ bg: "#CDC1FF80" }}
                    color="white"
                    flexDir="column"
                  >
                    <Icon as={RxRocket} boxSize={6} />
                  </Button>
                  <Text fontSize="xs">Boosts</Text>
                </VStack>
              </HStack>
            </HStack>

            <Spacer />
          </>
        )}
        {renderContent()}
        {/* Bottom Navigation */}

        <HStack
          justify="space-around"
          p={2}
          bg="#7371FC99"
          as="nav"
          borderColor="#CDC1FF"
          borderRadius="2xl"
          border={"2px solid"}
        >
          {menuItems.map(({ icon, label, key }) => (
            <VStack key={key} spacing={1}>
              <Circle
                size="40px"
                bg={activePage === key ? "#CDC1FF80" : "#7371FC99"}
                as="button"
                onClick={() => setActivePage(key)}
              >
                <Icon as={icon} boxSize={5} />
              </Circle>
              <Text fontSize="xs">{label}</Text>
            </VStack>
          ))}
        </HStack>
      </Box>
    </>
  );
};

export default HomePage;
