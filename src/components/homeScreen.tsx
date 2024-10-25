import React from "react";
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

const HomeScreen: React.FC = () => {
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
            1,067
          </Text>
        </Flex>

        <Flex w="100%">
          <Image src="./coinStack.png" alt="Coins Stack" />
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
