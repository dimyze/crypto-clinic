export const createKeyFromPassword = (password: string) => {
  const keyArray: string[] = [];
  if (password.length < 16) {
    for (let i = 0; i < Math.trunc(16 / password.length); i++) {
      keyArray.push(password);
    }
    for (let i = 0; i < Math.trunc(16 % password.length); i++) {
      keyArray.push(password[i]);
    }
    return keyArray.join("");
  } else {
    return password.slice(0, 16);
  }
};

export const createIvFromUsername = (username: string) => {
  const keyArray: string[] = [];
  if (username.length < 16) {
    for (let i = 0; i < Math.trunc(16 / username.length); i++) {
      keyArray.push(username);
    }
    for (let i = 0; i < Math.trunc(16 % username.length); i++) {
      keyArray.push(username[i]);
    }
    return keyArray.join("");
  } else {
    return username.slice(0, 16);
  }
};

export const getTimeOfTheDay = (timestamp: number): string => {
  const date = new Date(timestamp);
  const hours = date.getHours();
  if (hours >= 6 && hours < 12) {
    return "morning";
  } else if (hours >= 12 && hours < 16) {
    return "afternoon";
  } else if (hours >= 16 && hours < 22) {
    return "evening";
  } else {
    return "late evening";
  }
};
