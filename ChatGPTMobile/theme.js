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
  scrollToButton: {
    iconColor: "black",
    backgroundColor: "white",
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
  holdItem: {
    menu: {
      backgroundColor: "rgba(246,246,246,0.6)",
      borderColor: "#DBDBDB",
    },
  },
  blurView: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  bottomModal: {
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  highlight: {
    color: "#DBDBDB",
    onBackgroundColor: "#DBDBDB",
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
    backgroundColor: "black",
    overlayColor: "rgba(	46,	46,	48, 0.4)",
    drawerDivider: {
      backgroundColor: "#1C1C1D",
    },
    chatItem: {
      selected: {
        backgroundColor: "#1C1C1D",
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
    backgroundColor: "#1C1C1D",
    fontColor: "white",
    placeholderFontColor: "#A5A5A5",
    button: {
      backgroundColor: "#10a37f",
      disabled: {
        backgroundColor: "#2C2C2D",
      },
    },
  },
  scrollToButton: {
    iconColor: "white",
    backgroundColor: "#2C2C2D",
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
    backgroundColor: "rgba(28, 28, 29, 0.8)",
  },
  holdItem: {
    menu: {
      backgroundColor: "rgba(75, 75, 76, 0.4)",
      borderColor: "#45474B",
    },
  },
  blurView: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  bottomModal: {
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  highlight: {
    color: "#2C2C2D",
    onBackgroundColor: "#3A3A3C",
  },
};

export const getTheme = (colorScheme) => {
  return colorScheme === "light" ? lightTheme : darkTheme;
};
