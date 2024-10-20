import React, { useState } from "react";
import {
  Box,
  Flex,
  Image,
  Text,
  Button,
  Stack,
  Avatar,
} from "@chakra-ui/react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RankScreen: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"Miners" | "Squads">("Miners");

  return (
    <Box
      bgGradient="linear(to-b, gray.900, purple.900)"
      color="white"
      minH="87vh"
      p={4}
      overflow={"scroll"}
    >
      {/* Top Rank Badge */}
      <Stack align="center" mb={6}>
        <Flex align="center" justify="space-between" w="80%">
          <Button variant="ghost" colorScheme="purple">
            <FaChevronLeft size={24} />
          </Button>
          <Stack align="center">
            <Image
              src="./3gold.png" // Replace with actual badge URL
              alt="Rank Badge"
              boxSize="80px"
            />
            <Text fontSize="3xl" fontWeight="bold">
              Gold
            </Text>
            <Text fontSize="lg">0/100k</Text>
          </Stack>
          <Button variant="ghost" colorScheme="purple">
            <FaChevronRight size={24} />
          </Button>
        </Flex>
      </Stack>

      {/* Tabs: Miners and Squads */}
      <Flex justify="center" mb={4}>
        <Button
          onClick={() => setActiveTab("Miners")}
          variant={activeTab === "Miners" ? "solid" : "ghost"}
          colorScheme="purple"
          mr={4}
          px={6}
        >
          Miners
        </Button>
        <Button
          onClick={() => setActiveTab("Squads")}
          variant={activeTab === "Squads" ? "solid" : "ghost"}
          colorScheme="purple"
          px={6}
        >
          Squads
        </Button>
      </Flex>

      {/* Miners List */}
      {activeTab === "Miners" && (
        <Stack spacing={4}>
          {/* Miner 1 */}
          <MinerItem
            rankIcon="./3gold.png"
            name="Apexfrez"
            coins={4999}
            avatarBg="green.400"
          />
          {/* Miner 2 */}
          <MinerItem
            rankIcon="./2silver.png"
            name="BrianGrady.120"
            coins={4999}
            avatarBg="blue.400"
          />
          {/* Miner 3 */}
          <MinerItem
            rankIcon="./3bronze.png"
            name="Martinberkx02"
            coins={4999}
            avatarBg="pink.400"
          />
        </Stack>
      )}

      {/* Squads List */}
      {activeTab === "Squads" && (
        <Stack spacing={4}>
          {/* Placeholder for squad data */}
          <Text>Squads content goes here</Text>
        </Stack>
      )}
    </Box>
  );
};

interface MinerItemProps {
  rankIcon: string;
  name: string;
  coins: number;
  avatarBg: string;
}

const MinerItem: React.FC<MinerItemProps> = ({
  rankIcon,
  name,
  coins,
  avatarBg,
}) => {
  return (
    <Flex bg="purple.700" p={4} borderRadius="md" alignItems="center">
      <Image src={rankIcon} alt="Rank Icon" boxSize="50px" />
      <Avatar size="md" name={name} bg={avatarBg} mr={4} />
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
        <Flex align="center">
          <Image
            src="./1067Coin.png" // Replace with actual coin icon
            alt="Coin Icon"
            boxSize="20px"
            mr={2}
          />
          <Text fontSize="md" mr={2}>
            {coins.toLocaleString()}
          </Text>
        </Flex>
      </Box>
    </Flex>
  );
};

export default RankScreen;
