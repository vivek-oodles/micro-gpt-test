import React, { useState } from "react";
import {
  Box,
  // Flex,
  // IconButton,
  // Image,
  // Progress,
  // Button,
  Text,
  // Stack,
  // Spacer,
  VStack,
  HStack,
  Circle,
  Icon,
} from "@chakra-ui/react";
import { FaHome, FaTrophy, FaUserFriends } from "react-icons/fa";
// import { FaChartSimple } from "react-icons/fa6";
import { GiFireAxe } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
// import { HiOutlineBolt } from "react-icons/hi2";
// import { BiWorld } from "react-icons/bi";
// import { CiCalendar } from "react-icons/ci";
// import { RxRocket } from "react-icons/rx";
import EarnScreen from "./earnScreen";
import RankScreen from "./rankScreen";
import FrenScreen from "./frenScreen";
import HomeScreen from "./homeScreen";
import { TonConnectButton } from "@tonconnect/ui-react";

// Define the types for components


type MenuItem = {
  icon: React.ElementType;
  label: string;
  key: string;
  component: React.FC;
};
const HomePage = ({userData}: {userData: any}) => {
  const [activePage, setActivePage] = useState<string>("home");
  const Home: React.FC = () => (
    <HomeScreen userData={userData} setActivePage={setActivePage} />
  );
  const Earn: React.FC = () => <EarnScreen userData={userData} />;
  const Mine: React.FC = () => <Text></Text>;
  const Rank: React.FC = () => <RankScreen userData={userData} />;
  const Frens: React.FC = () => <FrenScreen userData={userData} />;

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
        minH="100vh"
      >
        {activePage === "home" && <></>}
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
