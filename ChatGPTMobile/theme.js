const lightTheme = {
  backgroundColor: "white",
  onBackgroundColor: "#EFEFEF",
  button: {
    disabledColor: "#EFEFEF",
    disabledFontColor: "#707070",
    color: "#10a37f",
    fontColor: "white",
  },
  divider: {
    color: "#DBDBDB",
  },
  radioButton: {
    disabledColor: "#A3A3A3",
    color: "#10a37f",
  },
  fontColor: "#000",
  iconColor: "black",
  secondaryIconColor: "#707070",
  error: {
    color: "#FF0000",
  },
  drawerContent: {
    backgroundColor: "white",
    overlayColor: "rgba(0, 0, 0, 0.5)",
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
      backgroundColor: "#EFEFEF",
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
  toast: {
    backgroundColor: "rgba(239, 239, 239,0.6)",
  },
};

const darkTheme = {
  backgroundColor: "#000",
  onBackgroundColor: "#1C1C1D",
  button: {
    disabledColor: "#1C1C1D",
    disabledFontColor: "#A5A5A5",
    color: "#10a37f",
    fontColor: "white",
  },
  radioButton: {
    disabledColor: "#5A5A5E",
    color: "#10a37f",
  },
  divider: {
    color: "#1C1C1D",
  },
  fontColor: "white",
  iconColor: "white",
  secondaryIconColor: "#A5A5A5",
  error: {
    color: "#FF0000",
  },
  drawerContent: {
    backgroundColor: "#1C1C1D",
    overlayColor: "rgba(255, 255, 255, 0.10)",
    drawerDivider: {
      backgroundColor: "#3A3A3C",
    },
    chatItem: {
      selected: {
        backgroundColor: "#2C2C2D",
      },
      backgroundColor: "black",
    },
  },
  message: {
    itemContainer: {
      backgroundColor: "#1C1C1D",
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
        backgroundColor: "#2C2C2D",
      },
    },
  },
  modal: {
    fontColor: "white",
    backgroundColor: "#1C1C1D",
    container: {
      backgroundColor: "#2C2C2D",
    },
    divider: {
      backgroundColor: "#3A3A3C",
    },
  },
  toast: {
    backgroundColor: "rgba(28, 28, 29, 0.6)",
  },
};

export const getTheme = (colorScheme) => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
