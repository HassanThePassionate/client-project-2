import Briefcase from "@/components/svgs/Briefcase";
import Document from "@/components/svgs/Document";
import Setting from "@/components/svgs/Setting";
import Support from "@/components/svgs/Support";
import Users from "@/components/svgs/Users";
import WalletIcon from "@/components/svgs/WalletIcon";

export const links = [
  {
    icon: <WalletIcon />,
    text: "Wallet",
    link: "/wallet",
  },
  {
    icon: <Briefcase />,
    text: "My Portfolio",
    link: "/portfolio",
  },
  {
    icon: <Setting />,
    text: "Profile & Settings",
    link: "/profile-settings",
  },
  {
    icon: <Document />,
    text: "Account statement",
    link: "/account-statement",
  },
  {
    icon: <Users />,
    text: "My referrals",
    link: "/referrals",
  },
  {
    icon: <Support />,
    text: "Support",
    link: "/support",
  },
];
