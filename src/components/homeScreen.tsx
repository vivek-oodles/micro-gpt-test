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
import RocketSvg from "../assets/rocket.svg";

const levelImages: string[] = ["./coinStack.png"];

interface userProps {
  userData: any
  setActivePage: (page: string) => void
}

const HomeScreen: React.FC<userProps> = ({ userData, setActivePage }) => {
  const [points, setPoints] = useState(0);
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  );

  const [userDeets, setUserDeets] = useState<any>();
  const [pointsToAdd, setPointsToAdd] = useState(0);
  const [availableTaps, setAvailableTaps] = useState(0);
  const [coins, setCoins] = useState(0)

  const { updateUserProfile, refillTaps } = useUserAPI(userData?.user.telegramId, userData?.token);


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
    card.style.transform = `perspective(1000px) rotateX(${-y / 10
      }deg) rotateY(${x / 10}deg)`;
    setTimeout(() => {
      card.style.transform = "";
    }, 100);
    const newTaps = availableTaps - 1;
    setAvailableTaps(newTaps);
    const newPoints = points + pointsToAdd
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }]);
    setPoints(newPoints);
    await updateUserProfile({ coins: newPoints })

  };

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
          border="1px solid #CDC1FF"
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
        <Box
          mx={5}
          px={3}
          py={2}
          borderRadius="full"
          background="linear-gradient(92.28deg, #B643E6 0.64%, #7371FC 37.4%, #CDC1FF 68.61%, #FFB26A 101.34%)"
          display="inline-block"
          padding="2px"
        >
          <HStack
            backgroundColor="#000"
            borderRadius="full"
            px={3}
            py={2}
          >
            <Text fontSize="xs">Airdrop</Text>
            <Image src="./1067Coin.png" alt="Coin" boxSize="20px" />
            <Text fontSize="xs">540,000,000 $MICRO</Text>
          </HStack>
        </Box>
        <Circle size="40px" bg="#7371FC99" border="1px solid #CDC1FF" as="button">
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

        >
          <Box
            width={"100%"}
            h={"100%"}
            display={"flex"}
            flexDirection={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            position={'relative'}
            // overflow={'hidden'}

            className="circle-inner"
          >
            {clicks.length >0 && clicks.map((click) => (
              <div
                key={click.id}
                className=" font-bold opacity-0 text-white pointer-events-none"
                style={{
                  top: `${click.y - 180}px`,
                  left: `${click.x - 30}px`,
                  animation: `float 1s ease-out, fadeOut 1s forwards`,
                  position: 'absolute',
                  zIndex: 2,
                  fontSize: "2rem"
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
              onClick={handleCardClick}
            />
          </Box>
        </Box>
      </Stack>

      <HStack
        w="full"
        spacing={5}
        align="center"
        alignItems={'end'}
        justify="space-between"
        mb={5}
      >
        {/* Progress Bar Section */}
        <Box w="50%">
          <HStack mb={2} display="flex" justifyItems="center" alignItems="center">
            <Icon as={HiOutlineBolt} color="white" />
            <Text color="white" fontSize="lg" fontWeight="bold">
              {userDeets && availableTaps && `${availableTaps}  `}
              <Text as="span" color="#CDC1FF" fontWeight="bold">
                {`/ ${userDeets?.maxTaps}`}
              </Text>
            </Text>
          </HStack>
          <Progress
            value={(availableTaps / userDeets?.maxTaps) * 100}
            h="5"
            border="3px solid #CDC1FF"
            borderRadius="full"
            bgColor="purple.900"
            colorScheme="purple" 
            sx={{
              "& > div": {
                background: "linear-gradient(92.28deg, #B643E6 0.64%, #7371FC 37.4%, #CDC1FF 68.61%, #FFB26A 101.34%)",
              },
            }}
          />
        </Box>
        <Spacer />
        {/* Action Buttons */}
        <HStack spacing={4}>
          <VStack>
            <Flex>
              <Box>

                <Button
                  border="2px"
                  borderColor="#CDC1FF"
                  flex={1}
                  h="auto"
                  py={2}
                  bgColor="#7371FC99"
                  _hover={{ bg: "#CDC1FF80" }}
                  color="white"
                  flexDir="column"
                  m={2}
                >
                  <Icon as={CiCalendar} color={"#CDC1FF"} boxSize={6} />
                </Button>
                <Text fontSize="xs" textAlign={'center'} fontWeight="bold">Daily Login</Text>
              </Box>
              <Box   >
                <Button
                  border="2px"
                  borderColor="#CDC1FF"
                  flex={1}
                  h="auto"
                  py={1}
                  bgColor="#7371FC99"
                  _hover={{ bg: "#CDC1FF80" }}
                  color="white"
                  flexDir="column"
                  m={2}
                >
                  <Image
                    src={RocketSvg}
                    alt="Rocket Icon"
                    width={'32px'}
                    height={"32px"}
                  // objectFit="cover" 
                  />
                  {/* <Icon as={RocketSvg} boxSize={6} /> */}
                </Button>
                <Text fontSize="xs" textAlign={'center'} fontWeight="bold" letterSpacing="0.5px">Boosts</Text>
              </Box>
            </Flex>
          </VStack>
        </HStack>
      </HStack>
    </Flex>
  );
};

export default HomeScreen;
