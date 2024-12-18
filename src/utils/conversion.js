const conversions = {
  weight: {
    lb: { kg: (value) => value * 0.453592 },
    kg: { lb: (value) => value / 0.453592 },
  },
  length: {
    cm: {
      ft: (value) => value / 30.48, // 1 foot = 30.48 cm
      m: (value) => value / 100, // Convert cm to meters
    },
    ft: {
      cm: (value) => value * 30.48, // Convert feet to cm
      m: (value) => value * 0.3048, // Convert feet to meters
    },
    m: {
      cm: (value) => value * 100, // Convert meters to cm
      ft: (value) => value / 0.3048, // Convert meters to feet
    },
  },
  temperature: {
    C: { F: (value) => value * 1.8 + 32 },
    F: { C: (value) => (value - 32) / 1.8 },
  },
};

export const unitOptions = {
  weight: ["lb", "kg"],
  length: ["ft", "cm", "in"],
  temperature: ["C", "F"],
};

export const convert = (category, from, to, value) => {
  if (
    conversions[category] &&
    conversions[category][from] &&
    conversions[category][from][to]
  ) {
    return conversions[category][from][to](value);
  }
  return NaN; // Return NaN if conversion is not available
};
