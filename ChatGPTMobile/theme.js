const lightTheme = {
  backgroundColor: "white",
  header: {
    borderBottomColor: "#F6F6F6",
  },
  fontColor: "#000",
  iconColor: "black",
  error: {
    color: "#FF0000",
  },
  drawerContent: {
    backgroundColor: "white",
    drawerDivider: {
      backgroundColor: "#DBDBDB",
    },
    chatItem: {
      selected: {
        backgroundColor: "#EFEFEF",
      },
    },
  },
  modal: {
    fontColor: "black",
    backgroundColor: "white",
    container: {
      backgroundColor: "#EFEFEF",
    },
    divider: {
      backgroundColor: "#DBDBDB",
    },
  },
  message: {
    itemContainer: {
      backgroundColor: "#F7F7F7",
    },
    fontColor: "black",
  },
  input: {
    backgroundColor: "rgba(235, 235, 235,0.4)",
    fontColor: "black",
    placeholderFontColor: "#707070",
    button: {
      backgroundColor: "#10a37f",
      disabled: {
        backgroundColor: "#A3A3A3",
      },
    },
  },
};

const darkTheme = {
  backgroundColor: "#000",
  header: {
    borderBottomColor: "#262626",
  },
  fontColor: "white",
  iconColor: "white",
  error: {
    color: "#FF0000",
  },
  drawerContent: {
    backgroundColor: "#262626",
    drawerDivider: {
      backgroundColor: "#555555",
    },
    chatItem: {
      selected: {
        backgroundColor: "#363636",
      },
      backgroundColor: "black",
    },
  },
  message: {
    itemContainer: {
      backgroundColor: "#262626",
    },
    fontColor: "white",
  },
  input: {
    backgroundColor: "rgba(15, 15, 15, 0.4)",
    fontColor: "white",
    placeholderFontColor: "#A5A5A5",
    button: {
      backgroundColor: "#10a37f",
      disabled: {
        backgroundColor: "#363636",
      },
    },
  },
  modal: {
    fontColor: "white",
    backgroundColor: "#262626",
    container: {
      backgroundColor: "#363636",
    },
    divider: {
      backgroundColor: "#555555",
    },
  },
};

export const getTheme = (colorScheme) => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
