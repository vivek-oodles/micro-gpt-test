import React, { useEffect, useState } from "react";
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
import { useUserAPI } from "../hooks/useUserApi";

interface userProps {
  userData: any;
}

type User = {
  id: string;
  telegramId: string;
  username: string;
  photoUrl?: string; // Optional field
  level: number;
  coins: number;
  taps: number;
  maxTaps: number;
  refillRate: number;
  lastRefillTime: Date;
  slots: number;
  referralCount: number;
  referredBy?: string; // Optional field
  freeSpins: number;
  multitap: number;
  tapLimitBoost: number;
  tappingGuruUses: number;
  profitPerHour: number;
  lastEarningsUpdate: Date;
  lastCheckIn?: Date; // Optional field
  checkInStreak: number;
  createdAt: Date;
  updatedAt: Date;
};

const RankScreen: React.FC<userProps> = ({ userData }) => {
  const [activeTab, setActiveTab] = useState<"Miners" | "Squads">("Miners");
  const { fetchAllUsers } = useUserAPI(userData?.telegramId, userData?.token)
  const [users, setUsers] = useState<User[] | null>([])

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const users = await fetchAllUsers()
        const sortedUsers = users.sort((a: User, b: User) => b.coins - a.coins);
        console.log("I am user", users)
        setUsers(sortedUsers)
      } catch (error) {
        console.log(error)
      }
    }

    fetchUsers()
  }, [])

  return (
    <Box color="white" minH="85vh" p={4} overflow={"scroll"}>
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
      <Flex justify="center" mb={4} border={'3px solid #2F2946'} background={'#2F2946'} width={'full'} rounded={'full'}>
        <Button
          onClick={() => setActiveTab("Miners")}
          variant={activeTab === "Miners" ? "solid" : "ghost"}
          colorScheme="purple"
          px={6}
          width="100%"
          height="44px"
          gap="0px"
          borderRadius="23px"
          opacity="0px"
          bgColor={activeTab === "Miners" ? "#9B51E0" :"#2F2946"  }
        
          
        >
          Miners
        </Button>
        <Button
          onClick={() => setActiveTab("Squads")}
          variant={activeTab === "Squads" ? "ghost" : "solid"}
          colorScheme="purple"
          
          width="100%"
          height="44px"
          gap="0px"
          borderRadius="23px"
          opacity="0px"
          bgColor={activeTab === "Squads" ? "#9B51E0" :"#2F2946"  }

        >
          Squads
        </Button>
      </Flex>

      {/* Miners List */}
      {
        activeTab === "Miners" && (
          <Stack spacing={4}>
            {/* Miner 1 */}
            {users && users.length > 0 && users.map((user, index) => {
              return (
                <MinerItem
                  key={index}
                  rankIcon="./3gold.png"
                  name={user.username}
                  coins={user.coins}
                  avatarBg="green.400"
                />
              );
            })}
          </Stack>
        )
      }

      {/* Squads List */}
      {
        activeTab === "Squads" && (
          <Stack spacing={4}>
            {/* Placeholder for squad data */}
            <Text>Squads content goes here</Text>
          </Stack>
        )
      }
    </Box >
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
