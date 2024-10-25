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

const levelImages: string[] = ["./coinStack.png"];

const HomeScreen: React.FC = () => {
  const [balance, setBalance] = useState<number>(1067);
  const [energy, setEnergy] = useState<number>(1000);
  const [level, setLevel] = useState<number>(1);
  const [clicks, setClicks] = useState<number>(0);

  useEffect(() => {
    const newLevel = Math.min(Math.floor(clicks / 1000) + 1, 5);
    if (newLevel !== level) {
      setLevel(newLevel);
      alert();
      // `Congratulations! You've reached ${
      //   levelNames[newLevel - 1]
      // } Mode (Level ${newLevel})!`
    }
  }, [clicks, level]);

  const handleTap = (): void => {
    setBalance((prev) => prev + 1);
    setEnergy((prev) => Math.max(0, prev - 1));
    setClicks((prev) => prev + 1);
  };
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
            {balance.toLocaleString()}
          </Text>
        </Flex>

        <Flex w="100%">
          <Box
            bg="purple.700"
            as="button"
            onClick={handleTap}
            _hover={{ bg: "purple.500" }}
            _active={{ bg: "cyan.300" }}
            overflow="hidden"
            border={"10px solid"}
            borderColor={"purple.900"}
          >
            <Image src={levelImages[level - 1]} alt="Coins Stack" />
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
              {energy}/{1000}
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
    </Flex>
  );
};

export default HomeScreen;
