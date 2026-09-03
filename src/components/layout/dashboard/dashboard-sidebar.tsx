import LogoutIcon from "@mui/icons-material/Logout";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import InsertPhotoOutlinedIcon from "@mui/icons-material/InsertPhotoOutlined";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import {
  Avatar,
  Divider,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { alpha } from "@mui/system";
import { type FC, type ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { SIDEBAR_WIDTH } from "@/data/globals";
import { paths } from "@/routes/paths";
import { useGetAwardsQuery } from "@/store/apis/awards-api";
import { useGetCollectionsQuery } from "@/store/apis/collections-api";
import { useGetPhotosQuery } from "@/store/apis/photos-api";
import { TOKEN_STORAGE_KEY } from "@/utils/auth";

export const DashboardSidebar: FC = () => {
  const { data: photos } = useGetPhotosQuery();
  const { data: collections } = useGetCollectionsQuery();
  const { data: awards } = useGetAwardsQuery();

  const theme = useTheme();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const navItems = [
    {
      path: paths.dashboardPhotos,
      label: "Photos",
      icon: <InsertPhotoOutlinedIcon fontSize="small" />,
      count: photos?.length,
    },
    {
      path: paths.dashboardCollections,
      label: "Collections",
      icon: <CollectionsOutlinedIcon fontSize="small" />,
      count: collections?.length,
    },
    {
      path: paths.dashboardAwards,
      label: "Awards",
      icon: <WorkspacePremiumOutlinedIcon fontSize="small" />,
      count: awards?.length,
    },
  ];

  const onLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY);

    navigate(paths.login, { replace: true });
  };

  const renderSiderbarOption = (
    path: string,
    label: string,
    icon: ReactNode,
    selected: boolean,
    count?: number,
  ) => (
    <ListItemButton
      key={path}
      selected={selected}
      onClick={() => navigate(path)}
      sx={{
        borderRadius: 1.5,
        mb: 0.5,
        color: selected
          ? theme.palette.background.paper
          : alpha(theme.palette.background.paper, 0.7),

        "&.Mui-selected, &.Mui-selected:hover": {
          bgcolor: alpha(theme.palette.background.paper, 0.08),
        },
        "&:hover": { bgcolor: alpha(theme.palette.background.paper, 0.04) },
      }}
    >
      <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
        {icon}
      </ListItemIcon>
      <ListItemText primary={label} />
      {count !== undefined && (
        <Typography
          variant="caption"
          sx={{ color: alpha(theme.palette.background.paper, 0.5) }}
        >
          {count}
        </Typography>
      )}
    </ListItemButton>
  );

  return (
    <Stack
      direction="column"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: SIDEBAR_WIDTH,
        height: "100dvh",
        color: theme.palette.background.paper,
        bgcolor: theme.palette.primary.main,
        px: 2.5,
        py: 3,
        gap: 2,
      }}
    >
      <Stack sx={{ gap: 0.5 }}>
        <Typography variant="caption" sx={{ fontWeight: 600 }}>
          Konstantinos Sahlos
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: alpha(theme.palette.background.paper, 0.5),
            fontSize: 10,
          }}
        >
          Studio Dashboard
        </Typography>
      </Stack>

      <Typography
        variant="caption"
        sx={{
          mt: 4,
          mb: 1,
          color: alpha(theme.palette.background.paper, 0.4),
          textTransform: "uppercase",
          letterSpacing: 1.5,
        }}
      >
        Manage
      </Typography>

      <List sx={{ flexGrow: 1, p: 0 }}>
        {navItems.map(({ path, label, icon, count }) => {
          const selected = pathname === path;

          return renderSiderbarOption(path, label, icon, selected, count);
        })}
      </List>

      <Stack sx={{ gap: 2 }}>
        <ListItemButton
          onClick={() => window.open(paths.home, "_blank")}
          sx={{
            borderRadius: 1.5,
            color: theme.palette.background.paper,
            "&:hover": { bgcolor: alpha(theme.palette.background.paper, 0.04) },
          }}
        >
          <ListItemIcon sx={{ minWidth: 36, color: "inherit" }}>
            <OpenInNewIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="View live site" />
        </ListItemButton>

        <Divider
          sx={{ borderColor: alpha(theme.palette.background.paper, 0.1) }}
        />

        <Stack direction="row" sx={{ alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              width: 36,
              height: 36,
              bgcolor: alpha(theme.palette.background.paper, 0.12),
            }}
          >
            KS
          </Avatar>

          <Stack sx={{ flexGrow: 1, minWidth: 0 }}>
            <Typography
              variant="caption"
              sx={{ fontWeight: 500, fontSize: 12 }}
            >
              Konstantinos
            </Typography>
            <Typography
              variant="caption"
              sx={{
                color: alpha(theme.palette.background.paper, 0.5),
                fontSize: 10,
              }}
            >
              Administrator
            </Typography>
          </Stack>
          <IconButton
            size="small"
            onClick={onLogout}
            sx={{ color: alpha(theme.palette.background.paper, 0.6) }}
          >
            <LogoutIcon fontSize="small" />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
