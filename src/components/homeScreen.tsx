import React, { useState, useEffect } from "react";
import {
  Flex,
  Circle,
  IconButton,
  HStack,
  Text,
  Image,
  Stack,
  Box,
  Progress,
  Button,
  VStack,
  Icon,
  Spacer,
} from "@chakra-ui/react";
import { FaChartSimple } from "react-icons/fa6";
import { BiWorld } from "react-icons/bi";
import { HiOutlineBolt } from "react-icons/hi2";
import { CiCalendar } from "react-icons/ci";
import { RxRocket } from "react-icons/rx";
import { useUserAPI } from "../hooks/useUserApi";
// import userEventEmitter from "../utils/eventEmitter";

const levelImages: string[] = ["./coinStack.png"];

interface userProps{
  userData: any
}

const HomeScreen: React.FC<userProps> = ({userData}) => {
   const [points, setPoints] = useState(0);
   const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
     []
   );
   const [userDeets, setUserDeets] = useState<any>();
   const [pointsToAdd, setPointsToAdd] = useState(0);
   const [availableTaps, setAvailableTaps] = useState(0);

   const { updateUserProfile, refillTaps } = useUserAPI( userData?.user.telegramId,userData?.token);


   useEffect(() => {
     const handleRefill = async () => {
       try {
         await refillTaps();
       } catch (err) {
         console.error("Error refilling taps:", err);
       }
     };

     handleRefill();
   }, []);

     useEffect(() => {
       if (userData) {
         setUserDeets(userData.user);
         setPointsToAdd(userData.user.multitap);
         setAvailableTaps(userData.user.taps);
         setPoints(userData.coins)
       }
     }, [userData]);

  const handleCardClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);
    const newTaps = availableTaps - 1;
    setAvailableTaps(newTaps);
    const newPoints = points + pointsToAdd
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
    setPoints(newPoints);
    await updateUserProfile({coins: newPoints})
    
  };

  // const handleAnimationEnd = (id: number) => {
  //   setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  // };
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      py={5}
      gap={5}
      display="flex"
      flexDirection="column"
      minH="85vh"
    >
      <HStack>
        {" "}
        <Circle size="40px" bg="#7371FC99" border="1px solid" as="button">
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
          border="2px solid"
          borderColor="linear(to-r, purple.600, orange.400)"
          px={3}
          py={2}
          borderRadius="full"
        >
          <Text fontSize="xs">Airdrop</Text>
          <Image src="./1067Coin.png" alt="Coin" boxSize="20px" />
          <Text fontSize="xs">540,000,000 $MICRO</Text>
        </HStack>
        <Circle size="40px" bg="#7371FC99" border="1px solid" as="button">
          <IconButton
            icon={<BiWorld />}
            aria-label="World"
            colorScheme="#CDC1FF"
            variant="ghost"
            boxSize={5}
          />
        </Circle>
      </HStack>

      <Stack align="center" spacing={7}>
        <Flex alignItems="center" justifyContent="center">
          <Image src="./1067Coin.png" alt="Coin Icon" boxSize="50px" />
          <Text fontSize="6xl" fontWeight="bold" mx={4}>
            {points}
          </Text>
        </Flex>

        <Flex w="100%" >
          <Box
            bg="purple.700"
            as="button"
            onClick={handleCardClick}
            _hover={{ bg: "purple.500" }}
            _active={{ bg: "cyan.300" }}
            overflow="hidden"
            border={"10px solid"}
            borderColor={"purple.900"}
          >
            <Image src={levelImages[0]} alt="Coins Stack" />
          </Box>
        </Flex>
      </Stack>

      <HStack
        w="full"
        spacing={5}
        align="center"
        justify="space-between"
        mt={20}
      >
        {/* Progress Bar Section */}
        <Box w="50%">
          <HStack mb={2}>
            <Icon as={HiOutlineBolt} color="yellow.400" />
            <Text color="white" fontSize="md" fontWeight="bold">
              {userDeets &&
                `${availableTaps && availableTaps} / ${userDeets.maxTaps}`}
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
        <Spacer />
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

      {/* {clicks.map((click) => (
        <div
          key={click.id}
          className=" text-5xl font-bold opacity-0 text-white pointer-events-none"
          style={{
            top: `${click.y - 42}px`,
            left: `${click.x - 28}px`,
            animation: `float 1s ease-out`,
          }}
          onAnimationEnd={() => handleAnimationEnd(click.id)}
        >
          {pointsToAdd}
        </div>
      ))} */}
    </Flex>
  );
};

export default HomeScreen;
