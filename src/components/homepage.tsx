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
  // Circle,
  // Icon,
  Image,
} from "@chakra-ui/react";
import { FaHome, FaTrophy } from "react-icons/fa";
// import { FaChartSimple } from "react-icons/fa6";
// import { GiFireAxe } from "react-icons/gi";
import { HiOutlineSparkles } from "react-icons/hi";
// import { HiOutlineBolt } from "react-icons/hi2";
// import { BiWorld } from "react-icons/bi";
// import { CiCalendar } from "react-icons/ci";
// import { RxRocket } from "react-icons/rx";
import EarnScreen from "./earnScreen";
import RankScreen from "./rankScreen";
// import FrenScreen from "./frenScreen";
import HomeScreen from "./homeScreen";
import HomeSvg from "../assets/home.svg";
import EarnSvg from "../assets/spark.svg";
import RankSvg from "../assets/trophy.svg";



// Define the types for components


type MenuItem = {
  icon: React.ElementType;
  svgFile:string;
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
  // const Mine: React.FC = () => <Text></Text>;
  const Rank: React.FC = () => <RankScreen userData={userData} />;
  // const Frens: React.FC = () => <FrenScreen userData={userData} />;

  const menuItems: MenuItem[] = [
    { icon: FaHome, svgFile :HomeSvg, label: "HOME", key: "home", component: Home },
    { icon: HiOutlineSparkles, svgFile :EarnSvg, label: "EARN", key: "earn", component: Earn },
    // { icon: GiFireAxe, label: "MINE", key: "mine", component: Mine },
    { icon: FaTrophy, svgFile :RankSvg, label: "RANK", key: "rank", component: Rank },
    // {
    //   icon: FaUserFriends,
    //   label: "FRENS",
    //   key: "frens",
    //   component: Frens,
    // },
  ];

  const renderContent = (): JSX.Element => {
    const ActiveComponent =
      menuItems.find((item) => item.key === activePage)?.component || Home;
    return <ActiveComponent />;
  };

  return (
    <>
      <Box
        bgGradient="linear-gradient(360deg, #18004A 24.72%, #000 100%)"
        // background: ;

        p={4}
        color="white"
        minH="100vh"
      >
        {activePage === "home" && <></>}
        {renderContent()}

        {/* Bottom Navigation */}
        <HStack
          justify="space-between"
          p={2}
          bg="#7371FC99"
          as="nav"
          borderColor="#CDC1FF"
          borderRadius="2xl"
          border={"2px solid"}

        >
          {menuItems.map(({ svgFile, label, key }) => (
             <VStack key={key} spacing={1}>
             <Box
               as="button"
               width="60px" 
               height="60px" 
               bg={activePage === key ? "#CDC1FF80" : ""}
               borderRadius="8px" 
               display="flex"
               flexDirection={'column'}
               justifyContent="center"
               alignItems="center"
               gap="5px"
               onClick={() => setActivePage(key)}
             >

               {/* <Icon as={icon} boxSize={8} /> */}
               <Image
                    src={svgFile}
                    alt="Icon"
                    width={'28px'}
                    height={"28px"}
                  // objectFit="cover" 
                  />

             <Text fontSize="xs">{label}</Text>
             </Box>
           </VStack>
          ))}
        </HStack>
       
      </Box>
    </>
  );
};

export default HomePage;
