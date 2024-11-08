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
import { useUserAPI } from "../hooks/useUserApi";
import userEventEmitter from "../utils/eventEmitter";

const levelImages: string[] = ["./coinStack.png"];

interface userProps{
  userData: any
  setActivePage: (page: string)=> void
}

const HomeScreen: React.FC<userProps> = ({userData, setActivePage}) => {
   const [points, setPoints] = useState(0);
   const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
     []
   );
   const [userDeets, setUserDeets] = useState<any>();
   const [pointsToAdd, setPointsToAdd] = useState(0);
   const [availableTaps, setAvailableTaps] = useState(0);
   const [coins, setCoins] = useState(0)    

   const { updateUserProfile, refillTaps } = useUserAPI( userData?.user.telegramId,userData?.token);


        useEffect(() => {
          const handleUserUpdate = (updatedUser: any) => {
            // Update the state with the latest user data
            console.log(updatedUser);
            setUserDeets(updatedUser);
            setCoins(updatedUser.coins)
            setPointsToAdd(updatedUser.multitap);
            console.log("User data updated:", updatedUser);
          };

          // Listen for the 'userUpdated' event
          userEventEmitter.on("userUpdated", handleUserUpdate);

          // Clean up the event listener when the component is unmounted
          return () => {
            userEventEmitter.off("userUpdated", handleUserUpdate);
          };
        }, []);


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
         setPoints(userData.user.coins);
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

  console.log(points)

  const handleAnimationEnd = (id: number) => {
    setClicks((prevClicks) => prevClicks.filter((click) => click.id !== id));
  };
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      py={1}
      gap={1}
      display="flex"
      flexDirection="column"
      minH="85vh"
      overflow={"hidden"}
    >
      <HStack>
        {" "}
        <Circle
          size="40px"
          bg="#7371FC99"
          border="1px solid"
          as="button"
          onClick={() => setActivePage("rank")}
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

      <Stack align="center">
        <Flex alignItems="center" justifyContent="center">
          <Image src="./1067Coin.png" alt="Coin Icon" boxSize="50px" />
          <Text fontSize="4xl" fontWeight="bold" mx={4}>
            {userData && Math.max(points, coins)}
          </Text>
        </Flex>

        <Box
          w={"100%"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          alignItems={"center"}
          className="circle-outer h-[30vh] sm:h-[35vh]"
          onClick={handleCardClick}
        >
          <Box
            width={"100%"}
            h={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            // overflow={'hidden'}

            className="circle-inner"
          >
            {clicks.map((click) => (
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
            ))}
            <Image
              alt="floating coin img"
              src={levelImages[0]}
              position={"relative"}
              zIndex={1}
              className="w-[70%] sm:w-[80%]"
            />
          </Box>
        </Box>
      </Stack>

      <HStack
        w="full"
        spacing={5}
        align="center"
        justify="space-between"
        mt={5}
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
        </HStack>
      </HStack>
    </Flex>
  );
};

export default HomeScreen;
