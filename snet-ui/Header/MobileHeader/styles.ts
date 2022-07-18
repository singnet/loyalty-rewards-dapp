import { Theme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

const mobileHeaderStyles = makeStyles((theme: Theme) => ({
    hamburger: {
      position: 'absolute',
      left: 0,
      padding: 10,
      margin: "0 39px 0 0",
      display: "none",
      cursor: "pointer",
      "& span": {
        width: 18,
        height: 1,
        display: "block",
        backgroundColor: theme.palette.text.primary,
        marginBottom: 3,
        '&:last-of-type': { marginBottom: 0 }
      },
      "@media (max-width:1024px)": { 
        paddingLeft: 0,
        display: "block" 
      },
      "@media (max-width:768px)": { margin: "0 25px 0 0" },
    },
    mobileNavContainer: {
      display: "flex",
      alignItems: "center",
      position: "fixed",
      top: 0,
      right: -20,
      bottom: 0,
      left: 0,
      zIndex: 1,
      background: 'linear-gradient(45deg, #2E1C89 0%, #492C92 100%),radial-gradient(circle, rgba(29,91,189,0.5) 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #B03FC3 0%, rgba(0,0,0,0) 100%),radial-gradient(circle, #184FA7 0%, #103884 41.67%, #061753 100%)',
      boxShadow: "0 2px 6px 0 rgb(0 0 0 / 30%)",
      "@media (min-width:1024px)": { display: "none" },
    },
    closeMenuIcon: {
      color: theme.palette.text.secondary,
      position: "absolute",
      top: 30,
      right: 40,
      cursor: "pointer",
      '& svg': { fontSize: 30 }
    },
    mobileNavigation: {
      boxSizing: "border-box",
      width: "100%",
      height: "100%",
      padding: "70px 0 10px 70px",
      overflow: "auto",
      textAlign: "left",
      "& nav": {
        "& > ul": {
          "& > li": {
            "&:nth-child(2)": {
              "& > div": {
                "& > div": {
                  "&:nth-child(4)": {
                    "& ul": { marginLeft: 40 },
                    "& a": {
                      color: "#fff !important",
                      textDecoration: "none",
                      "&:hover": {
                        backgroundColor: "transparent",
                        color: `${theme.palette.text.primary} !important`,
                      },
                    },
                  },
                  "&:nth-child(6)": { paddingBottom: 0 },
                },
              },
            },
          },
        },
      },
      "& ul": {
        padding: 0,
        margin: 0,
        "& li": {
          padding: "10px 0",
          listStyle: "none",
          "& > span": {
            color: theme.palette.text.secondary,
          },
        },
      },
      "@media(min-width: 1024px)": { display: "none" },
    },
    subMenues: {
      "& li": {
        paddingLeft: "0 !important",
        margin: "0 0 0 29% !important",
        "&:first-of-type": { border: "none" },
        "&:last-of-type": {
          paddingBottom: 9,
        },
        "& a": {
          padding: "13px 0 13px 33px",
          fontSize: 22,
        },
        "&:first-of-type a": {
          paddingLeft: 0,
          color: theme.palette.text.primary,
        },
        "&:nth-child(2) a": { paddingTop: 0 },
      },
    },
    mobileUserAction: {
      display: "none",
      "& ul": {
        padding: 0,
        margin: 0,
        display: "flex",
        "& li": {
          listStyle: "none",
          "& a": {
            color: "#fff",
            textDecoration: "none",
          },
        },
      },
      "@media(max-width:575px)": { display: "block" },
    },
    signUpLink: {
      padding: "6px 18px",
      borderRadius: 4,
      marginLeft: 32,
      backgroundColor: "#4086ff",
      fontWeight: 600,
      fontSize: 14,
      lineHeight: "16px",
      letterSpacing: 1.25,
      textTransform: "uppercase",
      "&:hover": {
        backgroundColor: "#005ACB",
        transition: "all .5s linear",
      },
      "& span": {
        "@media(max-width:768px)": { display: "none" },
      },
    },
  }));

export default mobileHeaderStyles;
